import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get user from JWT
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
          // List user's workstations
          const { data: workstations, error } = await supabaseClient
            .from('workstations')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

          if (error) throw error

          return new Response(
            JSON.stringify({ workstations }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          )
        }
        break

      case 'POST':
        if (path === 'create') {
          const body = await req.json()
          const { name, description, function: workstationFunction, nature, resources } = body

          // Validate required fields
          if (!name || !workstationFunction) {
            return new Response(
              JSON.stringify({ error: 'Name and function are required' }),
              {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              }
            )
          }

          // Create workstation
          const { data: workstation, error } = await supabaseClient
            .from('workstations')
            .insert({
              name,
              description,
              function: workstationFunction,
              nature: nature || [],
              resources: resources || {},
              user_id: user.id,
              status: 'CREATING'
            })
            .select()
            .single()

          if (error) throw error

          // Simulate workstation creation process
          setTimeout(async () => {
            await supabaseClient
              .from('workstations')
              .update({ status: 'RUNNING' })
              .eq('id', workstation.id)
          }, 5000)

          return new Response(
            JSON.stringify({ workstation }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          )
        }

        if (path === 'start') {
          const body = await req.json()
          const { workstation_id } = body

          const { data: workstation, error } = await supabaseClient
            .from('workstations')
            .update({ status: 'RUNNING' })
            .eq('id', workstation_id)
            .eq('user_id', user.id)
            .select()
            .single()

          if (error) throw error

          return new Response(
            JSON.stringify({ workstation }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          )
        }

        if (path === 'stop') {
          const body = await req.json()
          const { workstation_id } = body

          const { data: workstation, error } = await supabaseClient
            .from('workstations')
            .update({ status: 'STOPPED' })
            .eq('id', workstation_id)
            .eq('user_id', user.id)
            .select()
            .single()

          if (error) throw error

          return new Response(
            JSON.stringify({ workstation }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          )
        }
        break

      case 'DELETE':
        const workstation_id = url.searchParams.get('id')
        
        if (!workstation_id) {
          return new Response(
            JSON.stringify({ error: 'Workstation ID is required' }),
            {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          )
        }

        const { error } = await supabaseClient
          .from('workstations')
          .delete()
          .eq('id', workstation_id)
          .eq('user_id', user.id)

        if (error) throw error

        return new Response(
          JSON.stringify({ message: 'Workstation deleted successfully' }),
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