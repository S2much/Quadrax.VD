import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const { method } = req
    const url = new URL(req.url)
    const path = url.pathname.split('/').pop()

    switch (method) {
      case 'GET':
        if (path === 'list') {
          // List user's export nodes
          const { data: nodes, error } = await supabaseClient
            .from('export_nodes')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

          if (error) throw error

          return new Response(
            JSON.stringify({ nodes }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          )
        }

        if (path === 'public') {
          // List public export nodes
          const { data: nodes, error } = await supabaseClient
            .from('export_nodes')
            .select('*')
            .eq('is_public', true)
            .order('download_count', { ascending: false })
            .limit(50)

          if (error) throw error

          return new Response(
            JSON.stringify({ nodes }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          )
        }
        break

      case 'POST':
        if (path === 'export-datakit') {
          const body = await req.json()
          const { datakit_id, node_name, node_description } = body

          // Call the export function
          const { data: nodeId, error } = await supabaseClient
            .rpc('export_datakit_as_node', {
              datakit_id,
              node_name,
              node_description
            })

          if (error) throw error

          // Get the created node
          const { data: node, error: fetchError } = await supabaseClient
            .from('export_nodes')
            .select('*')
            .eq('id', nodeId)
            .single()

          if (fetchError) throw fetchError

          return new Response(
            JSON.stringify({ node }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          )
        }

        if (path === 'export-codesheet') {
          const body = await req.json()
          const { codesheet_id, node_name, node_description } = body

          // Call the export function
          const { data: nodeId, error } = await supabaseClient
            .rpc('export_codesheet_as_node', {
              codesheet_id,
              node_name,
              node_description
            })

          if (error) throw error

          // Get the created node
          const { data: node, error: fetchError } = await supabaseClient
            .from('export_nodes')
            .select('*')
            .eq('id', nodeId)
            .single()

          if (fetchError) throw fetchError

          return new Response(
            JSON.stringify({ node }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          )
        }

        if (path === 'create-workflow') {
          const body = await req.json()
          const { name, description, workflow_data, node_references, connections } = body

          const { data: workflow, error } = await supabaseClient
            .from('manufacturing_workflows')
            .insert({
              name,
              description,
              workflow_data,
              node_references: node_references || [],
              connections: connections || [],
              user_id: user.id
            })
            .select()
            .single()

          if (error) throw error

          return new Response(
            JSON.stringify({ workflow }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          )
        }

        if (path === 'download') {
          const body = await req.json()
          const { platform, package_type } = body

          // Generate platform download
          const { data: download, error } = await supabaseClient
            .rpc('generate_platform_download', {
              platform_name: platform,
              package_type: package_type || 'core'
            })

          if (error) throw error

          return new Response(
            JSON.stringify({ download }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          )
        }
        break

      case 'PUT':
        if (path === 'update-node') {
          const body = await req.json()
          const { node_id, updates } = body

          const { data: node, error } = await supabaseClient
            .from('export_nodes')
            .update(updates)
            .eq('id', node_id)
            .eq('user_id', user.id)
            .select()
            .single()

          if (error) throw error

          return new Response(
            JSON.stringify({ node }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          )
        }
        break

      case 'DELETE':
        const node_id = url.searchParams.get('id')
        
        if (!node_id) {
          return new Response(
            JSON.stringify({ error: 'Node ID is required' }),
            {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          )
        }

        const { error } = await supabaseClient
          .from('export_nodes')
          .delete()
          .eq('id', node_id)
          .eq('user_id', user.id)

        if (error) throw error

        return new Response(
          JSON.stringify({ message: 'Node deleted successfully' }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        )

      default:
        return new Response(
          JSON.stringify({ error: 'Method not allowed' }),
          {
            status: 405,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        )
    }

    return new Response(
      JSON.stringify({ error: 'Not found' }),
      {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})