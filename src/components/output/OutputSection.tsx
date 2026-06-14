import type { GeneratedImage } from '@/hooks/useImageGenerator';
import { OutputImageCard } from './OutputImageCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface OutputSectionProps {
  images: GeneratedImage[];
  onDelete: (id: string) => void;
}

export function OutputSection({
  images,
  onDelete,
}: OutputSectionProps) {
  if (images.length === 0) return null;

  return (
    <div className="w-full relative px-12">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {images.map((image, index) => (
            <CarouselItem key={image.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <OutputImageCard
                image={image}
                index={index}
                onDelete={onDelete}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="-left-12" />
            <CarouselNext className="-right-12" />
          </>
        )}
      </Carousel>
    </div>
  );
}
