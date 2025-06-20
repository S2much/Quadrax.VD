import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: 'sk-b35f72184b45489683f238411f5c3cd3'
});

export async function generateAIResponse(prompt: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "You are QUADRAX AI, an intelligent assistant for machine learning and data science. You help users with ML workflows, data analysis, model training, and automation. Provide helpful, technical guidance while being concise and actionable." 
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      model: "deepseek-chat",
      max_tokens: 1000,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return "I'm experiencing technical difficulties. Please check your connection and try again.";
  }
}

export async function generateWorkstationAnalysis(description: string, functionType: string, nature: string[]): Promise<string> {
  try {
    const prompt = `Analyze this workstation configuration and provide recommendations:

Description: ${description}
Function: ${functionType}
Nature: ${nature.join(', ')}

Provide specific recommendations for:
1. Optimal resource allocation (CPU, RAM, storage)
2. Recommended software packages and frameworks
3. Security considerations
4. Performance optimization tips

Keep the response concise but informative.`;

    const completion = await openai.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "You are QUADRAX AI, an expert in ML infrastructure and workstation optimization. Provide technical recommendations based on the workstation requirements." 
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      model: "deepseek-chat",
      max_tokens: 800,
      temperature: 0.6,
    });

    return completion.choices[0]?.message?.content || "Unable to analyze workstation configuration at this time.";
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return "Analysis temporarily unavailable. Please try again later.";
  }
}

// Legacy function for backward compatibility
async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "deepseek-chat",
  });

  console.log(completion.choices[0].message.content);
}

export default { generateAIResponse, generateWorkstationAnalysis, main };