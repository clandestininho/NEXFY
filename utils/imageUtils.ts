/**
 * Resizes an image file to a maximum dimension while maintaining aspect ratio.
 * Converts non-PNG images to JPEG with 0.8 quality for better compression.
 * Preserves PNG format to maintain transparency.
 *
 * @param file - The input image file.
 * @param maxWidth - The maximum width of the output image (default: 1536).
 * @param maxHeight - The maximum height of the output image (default: 1536).
 * @param quality - The quality of the output image (0 to 1) for lossy formats (default: 0.8).
 * @returns A promise that resolves to a Blob of the resized image.
 */
export const compressImage = async (
  file: File,
  maxWidth: number = 1536,
  maxHeight: number = 1536,
  quality: number = 0.8
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    // If the file is not an image, return original
    if (!file.type.startsWith('image/')) {
        resolve(file);
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        // Calculate new dimensions
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round(height * (maxWidth / width));
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round(width * (maxHeight / height));
            height = maxHeight;
          }
        }

        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          // Fallback if context is not available
          resolve(file);
          return;
        }

        // Draw image on canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Determine output type
        // Use original type if it's PNG (to preserve transparency)
        // Otherwise use JPEG for better compression
        const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';

        // Convert canvas to Blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              resolve(file); // Fallback to original file on failure
            }
          },
          outputType,
          quality
        );
      };

      img.onerror = (error) => {
        // If image loading fails, resolve with original file
        console.warn('Image compression failed (load error), using original file', error);
        resolve(file);
      };
    };

    reader.onerror = (error) => {
        // If file reading fails, resolve with original file
        console.warn('Image compression failed (read error), using original file', error);
        resolve(file);
    };
  });
};
