
import { GoogleGenAI, Type } from "@google/genai";

// Analyze and suggest improvements for a resume based on a job description
export async function tailorResume(resumeContent: string, jobDescription: string) {
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
    const jsonStr = response.text?.trim();
    return JSON.parse(jsonStr || "{}");
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return null;
  }
}

// Perform a general ATS compatibility check
export async function performATSCheck(resumeContent: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    You are a professional Applicant Tracking System (ATS) analyzer.
    Examine the following resume content for:
    1. Structural readability (headers, sections).
    2. Formatting issues (complex tables, graphics, etc - though only text is provided here, assume standard text analysis).
    3. Keyword density and diversity.
    4. Action verb usage.
    
    Resume Content:
    ${resumeContent}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          atsScore: { type: Type.NUMBER, description: "Score out of 100 for overall ATS friendliness." },
          readabilityRating: { type: Type.STRING, description: "Brief rating (e.g., Excellent, Good, Poor)." },
          criticalIssues: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Critical issues that might cause rejection by an ATS."
          },
          formattingTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Tips for better structural formatting."
          },
          strongPoints: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Things the resume does well."
          }
        },
        required: ["atsScore", "readabilityRating", "criticalIssues", "formattingTips", "strongPoints"]
      }
    }
  });

  try {
    const jsonStr = response.text?.trim();
    return JSON.parse(jsonStr || "{}");
  } catch (e) {
    console.error("Failed to parse ATS check response", e);
    return null;
  }
}

// Extract job details from a URL using search grounding
export async function extractJobDetailsFromUrl(url: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Find and extract the following job details from this job posting URL: ${url}
    
    Required fields:
    - Company Name
    - Job Role/Title
    - Location (e.g., "Remote", "San Francisco, CA")
    - Salary Range (if mentioned, otherwise leave blank)
    - Full Job Description
    
    If any information is not explicitly available on the page, return an empty string for that field.
    Respond strictly in JSON format.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          company: { type: Type.STRING },
          role: { type: Type.STRING },
          location: { type: Type.STRING },
          salaryRange: { type: Type.STRING },
          description: { type: Type.STRING }
        },
        required: ["company", "role", "location", "salaryRange", "description"]
      }
    }
  });

  try {
    const jsonStr = response.text?.trim();
    return JSON.parse(jsonStr || "{}");
  } catch (e) {
    console.error("Failed to parse job extraction response", e);
    return null;
  }
}
