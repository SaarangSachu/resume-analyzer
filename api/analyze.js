import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req, res) {
    // 1. CORS Headers (Allows your frontend to talk to this backend)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight "handshake" request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 2. Initialize Gemini (Vercel automatically pulls the API Key from environment variables)
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // 3. Define the Schema (Exact copy from your original frontend code)
    const ANALYSIS_SCHEMA = {
        type: Type.OBJECT,
        properties: {
            matchScore: { type: Type.NUMBER, description: 'Overall match percentage (0-100)' },
            skillsMatch: {
                type: Type.OBJECT,
                properties: {
                    matched: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING },
                                category: { type: Type.STRING, description: 'Technical, Soft, Tool, or Certification' }
                            },
                            propertyOrdering: ['name', 'category']
                        }
                    },
                    missing: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING },
                                category: { type: Type.STRING }
                            },
                            propertyOrdering: ['name', 'category']
                        }
                    }
                },
                propertyOrdering: ['matched', 'missing']
            },
            experienceAlignment: {
                type: Type.OBJECT,
                properties: {
                    score: { type: Type.NUMBER },
                    feedback: { type: Type.STRING }
                },
                propertyOrdering: ['score', 'feedback']
            },
            keywordRelevance: {
                type: Type.OBJECT,
                properties: {
                    score: { type: Type.NUMBER },
                    topKeywords: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                propertyOrdering: ['score', 'topKeywords']
            },
            suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            atsOptimization: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ['matchScore', 'skillsMatch', 'experienceAlignment', 'keywordRelevance', 'suggestions', 'atsOptimization'],
        propertyOrdering: ['matchScore', 'skillsMatch', 'experienceAlignment', 'keywordRelevance', 'suggestions', 'atsOptimization']
    };

    // 4. Validate Request Method
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { resumeText, jobDescription } = req.body;

        if (!resumeText || !jobDescription) {
            return res.status(400).json({ error: "Missing content for analysis." });
        }

        const prompt = `
      System Context: You are a world-class Recruitment AI specializing in ATS (Applicant Tracking Systems) and professional career coaching.
      
      Task: Compare the provided Resume against the Job Description. Be extremely precise, objective, and constructive.
      
      Job Description Content:
      ${jobDescription}

      Resume Content:
      ${resumeText}

      Rules:
      1. Focus on semantic relevance, not just exact keyword matches.
      2. Identify specific skill gaps that would prevent a candidate from passing an initial screening.
      3. Suggest specific action-oriented phrasing for ATS optimization.
    `;

        // 5. Call Gemini API
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-lite', // Using a stable model
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: ANALYSIS_SCHEMA,
                temperature: 0.2,
            },
        });

        // Remove the parentheses
        const resultStr = response.text;
        if (!resultStr) throw new Error("Empty response from AI.");

        res.status(200).json(JSON.parse(resultStr));

    } catch (error) {
        console.error("Vercel API Error:", error);
        res.status(500).json({ error: "Analysis failed. Please try again." });
    }
}