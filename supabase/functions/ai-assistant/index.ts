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

    const { message, context } = await req.json()

    // Simple AI response generation based on context
    let response = ''

    if (message.toLowerCase().includes('workstation')) {
      response = `I can help you create and manage workstations. Here are your options:
      
1. **Create New Workstation**: Set up a development environment
2. **List Workstations**: View all your current workstations
3. **Start/Stop**: Control workstation lifecycle
4. **Configure Resources**: Adjust CPU, memory, and storage

Would you like me to help you create a new workstation?`
    } else if (message.toLowerCase().includes('model')) {
      response = `I can assist with ML model management:

1. **Model Training**: Set up training pipelines
2. **Model Deployment**: Deploy models to production
3. **Performance Monitoring**: Track model metrics
4. **Model Versioning**: Manage different model versions

What specific model task would you like help with?`
    } else if (message.toLowerCase().includes('data')) {
      response = `I can help with data management:

1. **DataKit Upload**: Upload and validate datasets
2. **Data Processing**: Transform and clean data
3. **Data Quality**: Check data quality metrics
4. **Data Export**: Export processed datasets

What data operation would you like to perform?`
    } else {
      response = `Hello! I'm your QUADRAX•ML AI assistant. I can help you with:

🛠️ **Workstations**: Create and manage development environments
📊 **DataKits**: Upload, process, and manage datasets  
🧠 **Models**: Train, deploy, and monitor ML models
⚡ **Manufacturing**: Fine-tune models with feedback
🔧 **Pipelines**: Automate ML workflows

What would you like to work on today?`
    }

    return new Response(
      JSON.stringify({ 
        response,
        timestamp: new Date().toISOString(),
        context: context || 'general'
      }),
      {
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