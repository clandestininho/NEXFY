import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";
import { MOCKUP_PROMPT_TEMPLATE } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const NUM_MOCKUPS = 5;

const extractFirstImage = (response: GenerateContentResponse): string | null => {
  if (response.candidates && response.candidates.length > 0) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
      }
    }
  }
  return null;
};

export const generateMockup = async (
  base64ImageData: string,
  context: string,
  onProgress: (progress: number) => void
): Promise<string[]> => {
  const prompt = MOCKUP_PROMPT_TEMPLATE(context);

  const match = base64ImageData.match(/^data:(image\/[a-z]+);base64,(.+)$/);
  if (!match) {
    throw new Error('Invalid image data URL');
  }
  const mimeType = match[1];
  const data = match[2];

  const imagePart = {
    inlineData: {
      mimeType,
      data,
    },
  };

  const textPart = {
    text: prompt,
  };

  let completedCount = 0;

  const generationPromises = Array.from({ length: NUM_MOCKUPS }, () =>
    ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [imagePart, textPart],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    }).then(response => {
      completedCount++;
      onProgress(completedCount);
      return response;
    })
  );

  const responses = await Promise.all(generationPromises);

  const generatedImages = responses
    .map(extractFirstImage)
    .filter((img): img is string => img !== null);

  return generatedImages;
};