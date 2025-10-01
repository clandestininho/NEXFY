import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { generateMockups } from './services/geminiService';
import { BACKGROUND_STYLES } from './constants';
import ImageGrid from './components/ImageGrid';
import BackgroundAnimation from './components/BackgroundAnimation';
import { UploadIcon, SparklesIcon, GridIcon } from './components/Icons';

function App() {
  const [productImage, setProductImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedBackground, setSelectedBackground] = useState(BACKGROUND_STYLES[0].id);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setProductImage(file);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
      setGeneratedImages([]);
    }
  }, [previewUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.webp'] },
    multiple: false,
  });
  
  const handleGenerate = async () => {
    if (!productImage) {
      setError('Please upload a product image first.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);
    setGenerationProgress(0);

    const background = BACKGROUND_STYLES.find(b => b.id === selectedBackground)?.name || 'Default';

    try {
      const images = await generateMockups(productImage, background, 5, (completed) => {
        setGenerationProgress(completed);
      });
      setGeneratedImages(images);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
      setGenerationProgress(0);
    }
  };

  const handleDownload = (imageSrc: string, index: number) => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `mockup-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="relative min-h-screen w-full font-sans text-white">
      <BackgroundAnimation />
      <main className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
            Nexfy AI Mockup
          </h1>
          <p className="mt-4 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
            Transform your product photos into stunning, professional mockups in seconds.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Controls Panel */}
          <div className="lg:col-span-1 p-6 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl space-y-6 h-fit">
            <div>
              <label className="block text-lg font-semibold text-neutral-200 mb-3">
                <span className="text-orange-500">1.</span> Upload Image
              </label>
              <div {...getRootProps()} className={`relative mt-1 flex justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${isDragActive ? 'border-orange-500 bg-orange-500/10' : 'border-white/20 hover:border-orange-500/50 hover:bg-white/5'}`}>
                <input {...getInputProps()} />
                <div className="space-y-2 text-center">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Product preview" className="mx-auto h-28 w-28 object-cover rounded-xl shadow-lg" />
                  ) : (
                    <UploadIcon className="mx-auto h-12 w-12 text-neutral-500" />
                  )}
                  <p className="text-sm text-neutral-400">
                    {isDragActive ? 'Drop the file here...' : 'Drag & drop or click to upload'}
                  </p>
                  <p className="text-xs text-neutral-500">PNG, JPG, WEBP up to 10MB</p>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="background-style" className="block text-lg font-semibold text-neutral-200 mb-3">
                <span className="text-orange-500">2.</span> Select Style
              </label>
              <select
                id="background-style"
                value={selectedBackground}
                onChange={(e) => setSelectedBackground(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              >
                {BACKGROUND_STYLES.map((style) => (
                  <option key={style.id} value={style.id} className="bg-neutral-900">{style.name}</option>
                ))}
              </select>
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={!productImage || isLoading}
              className="w-full flex items-center justify-center bg-orange-600 hover:bg-orange-700 disabled:bg-neutral-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/50 disabled:shadow-none"
            >
              {isLoading ? (
                <div className="w-full text-center">
                  <span>Generating ({generationProgress}/5)...</span>
                </div>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  Generate 5 Mockups
                </>
              )}
            </button>
          </div>

          {/* Image Display */}
          <div className="lg:col-span-2 p-4 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl min-h-[400px]">
            {error && <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-4" role="alert">{error}</div>}
            
            {isLoading && !generatedImages.length && (
              <div className="flex flex-col items-center justify-center h-full w-full">
                <div className="w-full max-w-md p-8">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-neutral-300">Creating Your Mockups...</span>
                    <span className="text-neutral-400">{generationProgress} / 5</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2.5">
                    <div 
                      className="bg-orange-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${(generationProgress / 5) * 100}%` }}
                    ></div>
                  </div>
                  <p className="mt-4 text-center text-sm text-neutral-500">Please wait, AI is crafting your images...</p>
                </div>
              </div>
            )}
            
            {!isLoading && !generatedImages.length && !error && (
               <div className="flex flex-col items-center justify-center h-full w-full text-center text-neutral-600">
                <GridIcon className="w-20 h-20 mb-4" />
                <h3 className="text-xl font-semibold text-neutral-400">Your Mockups Await</h3>
                <p className="mt-1 text-neutral-500">Generated images will appear here.</p>
              </div>
            )}

            {generatedImages.length > 0 && (
              <ImageGrid images={generatedImages} onDownload={handleDownload} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;