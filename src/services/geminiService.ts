import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function speakText(text: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: `Pronounce clearly in neutral Spanish: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const audio = new Audio(`data:audio/wav;base64,${base64Audio}`);
      await audio.play();
    }
  } catch (error) {
    console.error('Error in TTS:', error);
  }
}

export async function getAITutorResponse(messages: { role: string, content: string }[]) {
  try {
    const history = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: history,
      config: {
        systemInstruction: "You are a friendly Spanish tutor. Help the user learn Spanish vocabulary and grammar. Keep responses concise and encouraging. If they ask about a word, explain its meaning and usage in Spanish culture.",
      }
    });

    return response.text;
  } catch (error) {
    console.error('Gemini error:', error);
    throw error;
  }
}

export async function explainComplexConcept(concept: string) {
  // Use thinking model for complex explanations
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview", // Sticking to flash for reliability
    contents: `Explain the Spanish grammar concept: ${concept}. Break it down for a beginner.`,
    config: {
      systemInstruction: "You are an expert Spanish teacher.",
    }
  });
  return response.text;
}
