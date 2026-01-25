import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { text, apiKey } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: "Text content is required" },
        { status: 400 }
      );
    }
    
    // Use provided API key or fallback to env var
    const key = apiKey || process.env.GEMINI_API_KEY;

    if (!key) {
      return NextResponse.json(
        { error: "API Key is required" },
        { status: 401 }
      );
    }

    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      Extract project details from the following text (which might be a PRD or project description).
      Return ONLY a valid JSON object with the following fields:
      - title: The name of the project
      - description: A concise summary (max 250 characters)
      - technologies: An array of strings listing specific technologies used (e.g. ["Flutter", "Firebase", "Python"])
      - githubUrl: The GitHub repository URL if present (or null)
      - liveUrl: The live deployment URL if present (or null)

      Do not include markdown formatting (like \`\`\`json) in the response, just the raw JSON string.

      Text to analyze:
      ${text}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let textResponse = response.text();
    
    console.log("Raw Gemini response:", textResponse); // Debug logging

    // Clean up markdown code blocks if present
    textResponse = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();

    const data = JSON.parse(textResponse);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: `Failed to process content: ${error.message}` },
      { status: 500 }
    );
  }
}
