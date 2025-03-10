import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("API key is missing! Check your .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function createAskAi() {
  const chatSession = model.startChat({ generationConfig, history: [] });

  async function AskAi(prompt) {
    try {
      const result = await chatSession.sendMessage(prompt);
      console.log("AI Response:", result.response);

      return result.response.text ? result.response.text() : result.response;
    } catch (error) {
      console.error("Error in AskAi:", error);
      return "An error occurred while fetching AI response.";
    }
  }

  return AskAi;
}

const AskAi = createAskAi();
export default AskAi;
