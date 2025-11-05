// Reference: javascript_openai blueprint
// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing required OpenAI key: OPENAI_API_KEY');
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateChatResponse(
  messages: { role: string; content: string }[]
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: `You are a helpful AI assistant for Walks & Lawns, a property maintenance subscription service in Edmonton, Alberta. 
          
          Our service:
          - $188/month subscription covering year-round maintenance
          - Winter: Unlimited snow removal and walkway clearing
          - Summer: Weekly lawn mowing and edging
          - Spring & Fall: Complete yard cleanups
          - Optional add-ons: Premium snow removal ($49/mo), Aeration ($89 one-time), Fertilization program ($39/mo), Additional lawn/walk coverage ($69/mo)
          
          You help customers with:
          - Questions about services and pricing
          - Subscription management
          - Scheduling concerns
          - General property maintenance advice
          
          Be friendly, professional, and conversational. Keep responses concise but helpful. If you don't know something specific about a customer's account, suggest they check their dashboard or contact support directly.`,
        },
        ...messages.map(m => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
      max_completion_tokens: 500,
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
  } catch (error: any) {
    console.error("OpenAI error:", error);
    throw new Error("Failed to generate AI response: " + error.message);
  }
}
