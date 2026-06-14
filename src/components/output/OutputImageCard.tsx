import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GeneratedImage } from '@/hooks/useImageGenerator';

interface OutputImageCardProps {
  image: GeneratedImage;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onDelete: (id: string) => void;
  onMoveLeft: (index: number) => void;
  onMoveRight: (index: number) => void;
}

export function OutputImageCard({
  image,
  index,
  isFirst,
  isLast,
  onDelete,
  onMoveLeft,
  onMoveRight,
}: OutputImageCardProps) {
  return (
    <Card className="relative group overflow-hidden border-border bg-card w-[280px] shrink-0 shadow-md">
      <Button
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2 z-20 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onDelete(image.id)}
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="aspect-[1/1.41] overflow-hidden bg-white">
        <img
          src={image.dataUrl}
          alt={`Output ${index + 1}`}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="p-3 bg-background border-t border-border flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
          <span>Page {index + 1}</span>
        </div>
        
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={isFirst}
            onClick={() => onMoveLeft(index)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={isLast}
            onClick={() => onMoveRight(index)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <a
            href={image.dataUrl}
            download={`handwriting-page-${index + 1}.jpg`}
            className="flex-grow"
          >
            <Button variant="secondary" size="sm" className="w-full h-8">
              <Download className="h-3.5 w-3.5 mr-2" />
              Download
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
}
