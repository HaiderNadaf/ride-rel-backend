import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateCarText({ brand, model, price, category }) {
  const prompt = `
You are an automobile expert.

Generate REAL, USER-READY content (not placeholders).

Brand: ${brand}
Model: ${model}
Category: ${category}
Price: ₹${price}

Return ONLY valid JSON in this exact structure:

{
  "description": "<one realistic marketing description>",
  "topFeatures": ["<real feature 1>", "<real feature 2>", "<real feature 3>"],
  "standOutFeatures": ["<real highlight 1>", "<real highlight 2>"]
}

Rules:
- Do NOT use the word "string"
- Do NOT use placeholders
- Be specific to category
- Be realistic
- No explanations
- JSON only
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.6,
  });

  const content = response.choices[0].message.content;

  try {
    return JSON.parse(content);
  } catch (err) {
    console.error("❌ AI JSON PARSE FAILED:", content);
    throw new Error("Invalid AI JSON");
  }
}
