import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Design: Artesanal Mágico
 * Componente de galeria com navegação suave e transições elegantes
 */

interface ProductGalleryProps {
  images: Array<{
    url: string;
    alt: string;
    angle: string;
  }>;
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center">
        <p className="text-muted-foreground">Sem imagens disponíveis</p>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative w-full aspect-square bg-white rounded-2xl overflow-hidden shadow-lg border border-border group">
        <img
          src={currentImage.url}
          alt={currentImage.alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary rounded-full p-2 shadow-md transition-all duration-300 hover:shadow-lg"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary rounded-full p-2 shadow-md transition-all duration-300 hover:shadow-lg"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Angle Label */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
          {currentImage.angle}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                currentIndex === index
                  ? "border-orange-500 shadow-lg ring-2 ring-orange-300"
                  : "border-border hover:border-orange-300"
              }`}
              aria-label={`Ver ${image.angle}`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Description */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">{productName}</span> -{" "}
          {currentImage.angle}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{currentImage.alt}</p>
      </div>
    </div>
  );
}
