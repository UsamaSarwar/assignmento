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
  onMoveLeft: (index: number) => void;
  onMoveRight: (index: number) => void;
}

export function OutputSection({
  images,
  onDelete,
  onMoveLeft,
  onMoveRight,
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
            <CarouselItem key={image.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-full xl:basis-1/2">
              <OutputImageCard
                image={image}
                index={index}
                isFirst={index === 0}
                isLast={index === images.length - 1}
                onDelete={onDelete}
                onMoveLeft={onMoveLeft}
                onMoveRight={onMoveRight}
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
