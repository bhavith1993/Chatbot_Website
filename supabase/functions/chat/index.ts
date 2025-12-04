import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BASE_SYSTEM_PROMPT = `You are a helpful assistant for Rivanoe Analytics. Answer questions about our company, services, and website content accurately and professionally.

=== COMPANY OVERVIEW ===
Company Name: Rivanoe Analytics
Tagline: "Finance Transformation without the headcount"
Mission: We transform finance processes to be efficient using light automation tools to help accounting and finance teams gain efficiencies and save time.

Experience:
- 12+ years of Accounting and Finance experience
- 20+ years of Business Applications experience

Deployment Timeline: Average 2-6 weeks (most projects go live in 2-4 weeks)

=== OUR SERVICES ===

1. POWER BI ANALYTIC AUTOMATION
Description: Custom dashboards, data modeling, and report automation tailored for financial analysis and reporting.
Features:
- Interactive Executive Dashboards
- Budget and Forecast vs. Actuals Analytics
- Operational Performance tracking
- KPI Dashboards

2. ALTERYX CONSULTING
Description: Streamline your data preparation and analytics workflows with powerful automation solutions.
Features:
- Workflow Automation
- Data Blending & Prep
- Predictive Analytics
- Process Optimization

3. FINANCE AUTOMATION READINESS CHECK
Description: Examine your existing process to determine potential gaps and recommend sustainable solutions to support your organization's growth.
Deliverables:
- Roadmap Development
- Surveying your finance teams
- Process Map Development (Current vs. Future state)
- Recommend Sustainable Solution

=== WHY CLIENTS CHOOSE US ===

1. Expertise, Not Headcount
You don't need to hire analysts, BI developers, or automation engineers. Our team brings senior-level accounting, FP&A, Power BI, and Alteryx expertise—without the long-term cost.

2. Rapid Deployment
Most projects go live in 2–4 weeks, not months.

3. Built for Finance, Not IT
We speak the language of CFOs, Controllers, and FP&A. Our solutions reflect real financial logic—not tech jargon.

4. Sustainable, Scalable, Reliable
Every workflow and report is designed to run automatically every period, with minimal maintenance.

=== TARGET AUDIENCE ===
- CFOs and Finance Directors
- Controllers
- FP&A Teams
- Accounting and Finance Departments
- Organizations looking to automate financial reporting and analytics

=== CONTACT INFORMATION ===
To get started or schedule a consultation, users should use the contact form on the website or click "Schedule Consultation".

=== RESPONSE GUIDELINES ===
- Be helpful, professional, and concise
- If users ask about pricing or specific project details, encourage them to schedule a consultation for personalized discussion
- Focus on how Rivanoe Analytics can solve their specific finance and analytics challenges
- Highlight our rapid deployment timeline and finance-specific expertise when relevant`;

// Generate embedding using OpenAI
async function generateEmbedding(text: string, apiKey: string): Promise<number[]> {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text,
    }),
  });

  if (!response.ok) {
    console.error("OpenAI embedding error:", response.status);
    return [];
  }

  const data = await response.json();
  return data.data[0].embedding;
}

// Search for relevant content
async function searchRelevantContent(query: string, openaiKey: string, supabaseUrl: string, supabaseKey: string): Promise<string> {
  try {
    const embedding = await generateEmbedding(query, openaiKey);
    if (embedding.length === 0) {
      return "";
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.rpc("match_website_content", {
      query_embedding: embedding,
      match_threshold: 0.5,
      match_count: 3,
    });

    if (error || !data || data.length === 0) {
      return "";
    }

    console.log("Found", data.length, "relevant documents for RAG");
    
    const context = data.map((doc: { content: string; similarity: number }) => 
      `[Relevance: ${(doc.similarity * 100).toFixed(0)}%]\n${doc.content}`
    ).join("\n\n---\n\n");

    return `\n\n=== ADDITIONAL CONTEXT FROM KNOWLEDGE BASE ===\nThe following information may be relevant to the user's question:\n\n${context}`;
  } catch (error) {
    console.error("RAG search error:", error);
    return "";
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!ANTHROPIC_API_KEY) {
      console.error("ANTHROPIC_API_KEY is not configured");
      throw new Error("ANTHROPIC_API_KEY is not configured");
    }

    // Get the last user message for RAG search
    const lastUserMessage = messages.filter((m: { role: string }) => m.role === "user").pop();
    let systemPrompt = BASE_SYSTEM_PROMPT;

    // If we have OpenAI key and Supabase config, try RAG
    if (OPENAI_API_KEY && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY && lastUserMessage) {
      console.log("Searching knowledge base for relevant content...");
      const additionalContext = await searchRelevantContent(
        lastUserMessage.content,
        OPENAI_API_KEY,
        SUPABASE_URL,
        SUPABASE_SERVICE_ROLE_KEY
      );
      systemPrompt += additionalContext;
    }

    console.log("Sending request to Claude API with", messages.length, "messages");

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages.map((msg: { role: string; content: string }) => ({
          role: msg.role,
          content: msg.content,
        })),
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Claude API error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Streaming response from Claude API");
    
    // Transform Claude's SSE format to OpenAI-compatible format
    const transformStream = new TransformStream({
      transform(chunk, controller) {
        const text = new TextDecoder().decode(chunk);
        const lines = text.split("\n");
        
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") {
              controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
              continue;
            }
            try {
              const parsed = JSON.parse(data);
              if (parsed.type === "content_block_delta" && parsed.delta?.text) {
                const openAIFormat = {
                  choices: [{ delta: { content: parsed.delta.text } }]
                };
                controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(openAIFormat)}\n\n`));
              } else if (parsed.type === "message_stop") {
                controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
              }
            } catch {
              // Skip malformed JSON
            }
          }
        }
      }
    });

    return new Response(response.body?.pipeThrough(transformStream), {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
