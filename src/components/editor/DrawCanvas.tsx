import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { drawPoint, clearCanvas, downloadCanvas } from '@/lib/draw-utils';
import { Trash2, Download, Plus, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface DrawCanvasProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dataUrl: string) => void;
  inkColor: string;
}

export function DrawCanvas({ isOpen, onClose, onSave, inkColor }: DrawCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [lastPos, setLastPos] = React.useState<{ x: number; y: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      const pos = drawPoint({
        ctx,
        canvas,
        x: e.clientX,
        y: e.clientY,
        lastX: null,
        lastY: null,
        inkColor,
        pointSize: 1,
      });
      setLastPos(pos);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx && lastPos) {
      const pos = drawPoint({
        ctx,
        canvas,
        x: e.clientX,
        y: e.clientY,
        lastX: lastPos.x,
        lastY: lastPos.y,
        inkColor,
        pointSize: 1,
      });
      setLastPos(pos);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setLastPos(null);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      clearCanvas(ctx, canvas);
    }
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      downloadCanvas(canvasRef.current);
    }
  };

  const handleSave = () => {
    if (canvasRef.current) {
      onSave(canvasRef.current.toDataURL('image/png'));
      onClose();
    }
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && canvasRef.current) {
      const reader = new FileReader();
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
          const newWidth = img.width * ratio;
          const newHeight = img.height * ratio;
          const x = (canvas.width - newWidth) / 2;
          const y = (canvas.height - newHeight) / 2;
          ctx.drawImage(img, x, y, newWidth, newHeight);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl sm:rounded-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Draw or Add Image (Beta)</span>
          </DialogTitle>
        </DialogHeader>

        <div className="relative bg-white border border-border rounded-xl overflow-hidden cursor-crosshair h-[400px]">
          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            className="w-full h-full"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between items-center">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleClear}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download PNG
            </Button>
            <div className="relative">
              <Input
                type="file"
                className="hidden"
                id="add-image"
                accept="image/*"
                onChange={handleAddImage}
              />
              <Button variant="outline" size="sm" asChild>
                <label htmlFor="add-image" className="cursor-pointer">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Image
                </label>
              </Button>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="ghost" onClick={onClose} className="flex-grow sm:flex-grow-0">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-grow sm:flex-grow-0">
              <Save className="h-4 w-4 mr-2" />
              Add to Paper
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
