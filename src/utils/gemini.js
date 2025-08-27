// src/utils/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateTradingSignal() {
  // Implement logic to send image and prompt to Gemini API for analysis
  // and return Buy/Sell/Neutral signal
  // This will likely involve converting the image to a suitable format
  // and using the Gemini Vision model.
  console.log("Analyzing image for trading signal...");
  return "Neutral"; // Placeholder
}

async function getGeminiResponse(query) {
  // Implement logic to send text query to Gemini API and get response
  // Ensure to handle off-topic queries as per requirements.
  console.log("Getting Gemini response for query: " + query);
  const result = await model.generateContent(query);
  const response = await result.response;
  const text = response.text();
  return text;
}

export { generateTradingSignal, getGeminiResponse };