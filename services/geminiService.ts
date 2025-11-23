import { GoogleGenAI } from "@google/genai";
import { Business, Event } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize specific model
let ai: GoogleGenAI | null = null;
try {
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
} catch (e) {
  console.error("Failed to initialize Gemini Client", e);
}

export const getGeminiRecommendations = async (
  query: string,
  businesses: Business[],
  events: Event[]
): Promise<string> => {
  if (!ai) return "Lo siento, el asistente inteligente no está disponible en este momento (Falta API Key).";

  // Prepare context data
  const businessContext = businesses.map(b => 
    `${b.name} (${b.category}): ${b.description}. Ubicación: ${b.address}. Tags: ${b.tags.join(', ')}. Horario: ${b.hours}.`
  ).join('\n');

  const eventContext = events.map(e => 
    `Evento: ${e.title} (${e.type}) el ${new Date(e.date).toLocaleDateString()} en ${e.location}. ${e.description}`
  ).join('\n');

  const prompt = `
    Eres un experto guía turístico y asistente municipal virtual para Pradera, Valle del Cauca.
    Tu objetivo es ayudar a un usuario con la siguiente consulta: "${query}".
    
    Usa EXCLUSIVAMENTE la siguiente información local disponible:
    
    COMERCIOS Y SITIOS:
    ${businessContext}
    
    EVENTOS Y NOTICIAS:
    ${eventContext}
    
    Responde de manera amable, corta y precisa (máximo 100 palabras).
    Si recomiendas un lugar, menciona su nombre exacto.
    Si la consulta no tiene relación con la información provista, sugiere visitar la categoría más cercana.
    No inventes información que no esté en la lista.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No pude encontrar información precisa.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Hubo un error al procesar tu consulta inteligente. Por favor intenta de nuevo.";
  }
};
