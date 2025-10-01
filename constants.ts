export const MOCKUP_PROMPT_TEMPLATE = (context: string) => {
    if (context && context.trim() !== '') {
      return `Generate a realistic mockup of the provided image placed on a ${context}. The mockup should be high-resolution and look professional. Create one unique variation.`;
    }
    return `Generate a realistic mockup of the provided image on a clean, neutral, and professional background. The mockup should be high-resolution and look professional, suitable for a product showcase. Create one unique variation.`;
};