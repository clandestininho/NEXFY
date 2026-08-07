export const compressImage = async (
  file: File | Blob,
  maxWidth: number = 1536,
  quality: number = 0.8
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;

    img.onload = () => {
      URL.revokeObjectURL(url); // Clean up memory

      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions
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

    img.onerror = (error) => {
      URL.revokeObjectURL(url); // Clean up memory even on error
      reject(error);
    };
  });
};
