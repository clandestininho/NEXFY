/**
 * Compresses and resizes an image file.
 * Resizes the image to fit within the specified maxWidth while maintaining aspect ratio.
 * Preserves PNG format for transparency, but converts other formats to JPEG for better compression.
 *
 * @param file The image file to compress.
 * @param maxWidth The maximum width or height of the output image (default: 1536px).
 * @param quality The quality of the output JPEG image (0 to 1, default: 0.8).
 * @returns A promise that resolves to a Blob representing the compressed image.
 */
export const compressImage = async (
  file: File | Blob,
  maxWidth = 1536,
  quality = 0.8
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions if resizing is needed
        if (width > maxWidth || height > maxWidth) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Draw image to canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Determine output format
        // If original is PNG, keep it PNG to preserve transparency
        // Otherwise use JPEG for better compression
        const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Canvas to Blob failed'));
            }
          },
          outputType,
          quality
        );
      };
      img.onerror = (error) => reject(new Error('Failed to load image for compression'));
    };
    reader.onerror = (error) => reject(new Error('Failed to read file'));
  });
};
