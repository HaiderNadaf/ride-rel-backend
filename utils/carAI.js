import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export async function analyzeCarImage(base64Image) {
  try {
    const imagePart = {
      inlineData: {
        data: base64Image.replace(/^data:image\/\w+;base64,/, ""),
        mimeType: "image/jpeg",
      },
    };

    const prompt = `
You are an automobile expert.
Analyze the car image and return details in JSON only.

Fields:
- vehicleType (car/bike/scooter)
- brand
- model
- color
- bodyType
- fuelType (petrol/diesel/electric/unknown)
- condition (new/used)
- visibleDamages
- estimatedCategory (budget/mid-range/premium)
`;

    const result = await model.generateContent([prompt, imagePart]);
    const text = result.response.text();

    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini image error:", err);
    throw err;
  }
}
