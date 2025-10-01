import { GoogleGenAI, Modality, Part } from '@google/genai';

// FIX: Initialize the Gemini AI client.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Converts a File object to a Gemini API Part object.
 * @param file The file to convert.
 * @returns A promise that resolves to a Part object.
 */
const fileToGenerativePart = async (file: File): Promise<Part> => {
  const base64EncodedData = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });

  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type,
    },
  };
};

/**
 * Generates a single mockup image using the Gemini API.
 * @param imagePart The product image as a Part object.
 * @param backgroundDescription A text description of the desired background.
 * @param variation A specific photographic instruction to ensure diversity.
 * @returns A promise that resolves to a base64-encoded image string, or null if generation fails.
 */
const generateSingleMockup = async (
  imagePart: Part,
  backgroundDescription: string,
  variation: string
): Promise<string | null> => {
  const textPart = {
    text: `Generate a hyper-realistic, professional product mockup. The provided image is the product.
    **Scene:** Place the product in the following environment: "${backgroundDescription}".
    **Creative Direction:** Apply this specific instruction: "${variation}".
    **Realism is critical:** The final image must be indistinguishable from a high-quality, professional photograph.
    - **Lighting:** Employ dynamic and high-contrast lighting. Match the product's lighting perfectly with the environment's ambient light. Create accurate soft shadows, subtle realistic reflections, and subtle volumetric lighting effects.
    - **Textures & Materials:** Render all material properties with extreme detail, emphasizing natural textures and imperfections for a truly authentic look.
    - **Camera Effects:** Where appropriate for the lighting, add a subtle and realistic lens flare effect to enhance the photographic quality.
    - **Integration:** Seamlessly blend the product into the background, ensuring correct perspective, scale, and focus.
    The product must be the primary focus of the image.
    Output ONLY the final image. Do not add any text, logos, or extra graphics.`,
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [imagePart, textPart],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
      }
    }
    return null;
  } catch (error) {
    console.error('Single mockup generation failed:', error);
    return null;
  }
};

/**
 * Generates a specified number of mockup images by calling the Gemini API in parallel.
 * @param productImageFile The user-uploaded product image file.
 * @param backgroundDescription A text description of the desired background.
 * @param numberOfImages The number of mockups to generate.
 * @param onProgress A callback function to report the number of completed mockups.
 * @returns A promise that resolves to an array of base64-encoded image strings.
 */
export const generateMockups = async (
  productImageFile: File,
  backgroundDescription: string,
  numberOfImages: number = 5,
  onProgress: (completed: number) => void
): Promise<string[]> => {
  try {
    const imagePart = await fileToGenerativePart(productImageFile);

    // Variations to ensure each mockup is unique and photorealistic
    const variations = [
      'Use a slightly different camera angle than the original product shot.',
      'Create a shallow depth of field effect, with the product in sharp focus and the background softly blurred.',
      'Use a low-angle shot to make the product look more prominent and heroic.',
      'Compose the shot as a "flat lay" from directly above, arranged neatly.',
      'Adjust the lighting to be more dramatic, with higher contrast between light and shadow.',
    ];

    // Ensure we have a variation for each image to be generated
    const selectedVariations = Array(numberOfImages)
      .fill(0)
      .map((_, i) => variations[i % variations.length]);

    let completedCount = 0;
    
    const promises = selectedVariations.map((variation) =>
      generateSingleMockup(imagePart, backgroundDescription, variation)
        .then(result => {
          completedCount++;
          onProgress(completedCount);
          return result;
        })
    );

    const results = await Promise.all(promises);
    const successfulResults = results.filter((r): r is string => r !== null);

    if (successfulResults.length === 0) {
      throw new Error('Image generation failed for all requests. The model did not return any images.');
    }

    return successfulResults;
  } catch (error) {
    console.error('Error generating mockups:', error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate mockups: ${error.message}`);
    }
    throw new Error('An unknown error occurred while generating mockups.');
  }
};