
import { GoogleGenAI, Type } from "@google/genai";

// Analyze and suggest improvements for a resume based on a job description
export async function tailorResume(resumeContent: string, jobDescription: string) {
  // Fix: Obtained API key exclusively from process.env.API_KEY and initialized directly as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    You are an expert career coach and resume writer. 
    Analyze the following resume and job description. 
    Suggest specific keywords to add, bullet points to rephrase, and structural changes to improve the match percentage.
    
    Resume:
    ${resumeContent}
    
    Job Description:
    ${jobDescription}
  `;

  // Fix: Always use ai.models.generateContent with model name and prompt at once.
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          suggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of actionable suggestions for the resume."
          },
          keywords: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of missing keywords found in the job description."
          },
          rephrasedBullets: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                original: { type: Type.STRING },
                improved: { type: Type.STRING }
              }
            },
            description: "Suggested rephrasing for existing bullet points."
          },
          matchScore: {
            type: Type.NUMBER,
            description: "A score from 0-100 indicating how well the current resume matches the job."
          }
        },
        required: ["suggestions", "keywords", "rephrasedBullets", "matchScore"]
      }
    }
  });

  try {
    // Fix: Accessing response.text as a property, not a method.
    const jsonStr = response.text?.trim();
    return JSON.parse(jsonStr || "{}");
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return null;
  }
}
