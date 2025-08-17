import { GoogleGenAI } from "@google/genai";
import { JobPosting } from '../types';

// Assume process.env.API_KEY is configured in the environment.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is not defined in environment variables");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// This function cleans the raw text response from Gemini
const cleanJsonString = (text: string): string => {
  // Remove markdown formatting like ```json ... ```
  const cleaned = text.replace(/^```json\s*|```$/g, '');
  return cleaned.trim();
};

export const fetchJobs = async (keyword: string): Promise<JobPosting[]> => {
  console.log(`Searching for real jobs with keyword: ${keyword}`);
  
  const prompt = `Find up to 12 public, unauthenticated job postings from the web in the United States for the keyword "${keyword}". Broaden the search to include related roles in Health AI, such as clinical data science, medical imaging AI, bioinformatics, clinical NLP, and healthcare machine learning. For each job, extract the following information and format the entire output as a single, valid JSON array of objects: 'title', 'company', 'location', 'link' (the direct, full URL to the job posting), 'description' (a one-paragraph summary), and 'details' (a list of 2-3 key responsibilities or skills mentioned in the post). Do not invent or hallucinate any information. Only use data from the public job postings you find.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
        temperature: 0.2,
      },
    });

    const jsonText = cleanJsonString(response.text);
    
    if (!jsonText) {
        console.warn('Gemini API returned an empty response.');
        return [];
    }
    
    let parsedData;
    try {
      parsedData = JSON.parse(jsonText);
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      console.error("Raw response text:", jsonText);
      throw new Error("The AI returned an invalid data format.");
    }
    
    // It's good practice to validate the shape of the data
    if (Array.isArray(parsedData)) {
      return parsedData.filter(item => 
        item.title && item.company && item.location && item.link && item.description && item.details && item.link.startsWith('http')
      );
    }
    
    console.error("Parsed data is not an array:", parsedData);
    return [];

  } catch (error) {
    console.error("Error fetching jobs from Gemini API:", error);
    throw new Error("Failed to communicate with the AI service.");
  }
};