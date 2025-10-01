import React, { useState } from 'react';
import { generateMockup } from './services/geminiService';
import ImageGrid from './components/ImageGrid';
import Loader from './components/Loader';
import { UploadIcon, SparklesIcon } from './components/Icons';

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [context, setContext] = useState<string>('');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleGenerateClick = async () => {
    if (!selectedImage) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setGeneratedImages([]);
    setError(null);
    setProgress(0);

    try {
      const images = await generateMockup(selectedImage, context, (completed) => {
        setProgress(completed);
      });
      setGeneratedImages(images);
      if (images.length === 0) {
        setError("The model didn't return any images. Try adjusting your prompt or using a different image.");
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating mockups. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDownload = (imageSrc: string, index: number) => {
    const link = document.createElement('a');
    link.href = imageSrc;
    const contextPart = context.trim() ? `${context.replace(/\s+/g, '-')}-` : '';
    link.download = `mockup-${contextPart}${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
              Nexfy AI Mockup
            </span>
          </h1>
          <p className="mt-3 text-lg text-neutral-400 max-w-2xl mx-auto">
            Upload your design, describe the scene, and let Gemini create stunning product mockups for you.
          </p>
        </header>

        <main>
          <div className="max-w-3xl mx-auto bg-neutral-900 rounded-2xl shadow-2xl shadow-orange-900/20 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Image Upload */}
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-700 rounded-lg p-6 h-64 transition-colors duration-300 hover:border-orange-500">
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-neutral-400"
                >
                  {selectedImage ? (
                    <img src={selectedImage} alt="Preview" className="max-h-full max-w-full rounded-md object-contain" />
                  ) : (
                    <>
                      <UploadIcon className="w-10 h-10 mb-2" />
                      <span className="font-semibold">Click to upload your design</span>
                      <span className="text-sm">PNG, JPG, WEBP</span>
                    </>
                  )}
                </label>
              </div>

              {/* Controls */}
              <div className="flex flex-col space-y-4">
                <div>
                  <label htmlFor="context" className="block text-sm font-medium text-neutral-300 mb-1">
                    Describe the scene (optional)
                  </label>
                  <input
                    type="text"
                    id="context"
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="e.g., a coffee mug, a billboard"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <button
                  onClick={handleGenerateClick}
                  disabled={isLoading || !selectedImage}
                  className="w-full flex items-center justify-center bg-orange-600 hover:bg-orange-700 disabled:bg-neutral-600 disabled:cursor-not-allowed text-white font-bold py-2.5 px-4 rounded-md transition-colors duration-300 shadow-lg shadow-orange-600/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-orange-500"
                >
                  {isLoading ? (
                    <>
                      <Loader />
                      <span className="ml-2">Generating... ({progress}/5)</span>
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="w-5 h-5 mr-2" />
                      Generate 5 Mockups
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-8 max-w-3xl mx-auto text-center bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md" role="alert">
              <p>{error}</p>
            </div>
          )}

          {generatedImages.length > 0 && !isLoading && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-center mb-6">Your Mockups</h2>
              <ImageGrid images={generatedImages} onDownload={handleDownload} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;