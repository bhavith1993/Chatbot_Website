import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are a helpful assistant for Rivanoe Analytics. Answer questions about our company, services, and website content accurately and professionally.

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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    
    if (!ANTHROPIC_API_KEY) {
      console.error("ANTHROPIC_API_KEY is not configured");
      throw new Error("ANTHROPIC_API_KEY is not configured");
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
        system: SYSTEM_PROMPT,
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
