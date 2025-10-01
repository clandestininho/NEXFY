import React from 'react';
import { DownloadIcon } from './Icons';

interface ImageGridProps {
  images: string[];
  onDownload: (imageSrc: string, index: number) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, onDownload }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
      {images.map((image, index) => (
        <div key={index} className="group relative aspect-square bg-neutral-900 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-orange-500/30">
          <img
            src={image}
            alt={`Mockup ${index + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
           <button
            onClick={() => onDownload(image, index)}
            className="absolute bottom-2 right-2 bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-orange-500"
            aria-label={`Download mockup ${index + 1}`}
          >
            <DownloadIcon className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;