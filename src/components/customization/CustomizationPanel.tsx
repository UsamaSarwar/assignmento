import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import type { Config } from '@/types';
import { Download, Trash2, SlidersHorizontal, Type, Move, Layers, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface CustomizationPanelProps {
  config: Config;
  onConfigChange: (config: Config) => void;
  onGenerate: () => void;
  onDownloadAll: () => void;
  onClearAll: () => void;
  isGenerating?: boolean;
}

export function CustomizationPanel({ 
  config, 
  onConfigChange, 
  onGenerate, 
  onDownloadAll, 
  onClearAll,
  isGenerating = false
}: CustomizationPanelProps) {
  const handleChange = <T extends keyof Config>(key: T, value: Config[T]) => {
    onConfigChange({ ...config, [key]: value });
  };

  return (
    <div className="sticky top-20 z-40 w-full mb-8">
      <div className="bg-background/80 backdrop-blur-md border border-border rounded-2xl p-2 shadow-xl flex flex-wrap items-center justify-center gap-2 max-w-6xl mx-auto">
        
        {/* Handwriting Selection */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 rounded-xl">
              <Type className="h-4 w-4" />
              <span className="hidden sm:inline">{config.handwritingFont}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 rounded-xl">
            <DropdownMenuLabel>Handwriting Style</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleChange('handwritingFont', 'Caveat')}>Caveat</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleChange('handwritingFont', 'Indie Flower')}>Indie Flower</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleChange('handwritingFont', 'Shadows Into Light')}>Shadows Into Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleChange('handwritingFont', 'Hindi_Font')}>Hindi Font</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleChange('handwritingFont', 'CustomFont')}>Custom Font</DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Label className="text-[10px] uppercase text-muted-foreground mb-2 block px-2">Upload .ttf/.otf</Label>
              <Input 
                type="file" 
                accept=".ttf,.otf" 
                className="h-8 text-[10px] py-1 cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const fontData = event.target?.result as ArrayBuffer;
                      const fontFace = new FontFace('CustomFont', fontData);
                      fontFace.load().then((loadedFace) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (document.fonts as any).add(loadedFace);
                        handleChange('handwritingFont', 'CustomFont');
                      });
                    };
                    reader.readAsArrayBuffer(file);
                  }
                }} 
              />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Text Options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 rounded-xl">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Text</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64 p-4 rounded-2xl space-y-4">
            <div className="space-y-2">
              <Label className="text-xs">Font Size (pt)</Label>
              <Input 
                type="number" 
                value={config.fontSize} 
                className="h-8 rounded-lg"
                onChange={(e) => handleChange('fontSize', e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Ink Color</Label>
              <div className="flex gap-2">
                <Input 
                  type="color" 
                  value={config.inkColor} 
                  className="w-10 p-1 h-8 rounded-md"
                  onChange={(e) => handleChange('inkColor', e.target.value)}
                />
                <Input 
                  type="text" 
                  value={config.inkColor} 
                  className="h-8 text-xs rounded-lg"
                  onChange={(e) => handleChange('inkColor', e.target.value)}
                />
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Spacing Options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 rounded-xl">
              <Move className="h-4 w-4" />
              <span className="hidden sm:inline">Spacing</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64 p-4 rounded-2xl space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs">Letter (px)</Label>
                <Input 
                  type="number" 
                  value={config.letterSpacing} 
                  className="h-8 rounded-lg"
                  onChange={(e) => handleChange('letterSpacing', e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Word (px)</Label>
                <Input 
                  type="number" 
                  value={config.wordSpacing} 
                  className="h-8 rounded-lg"
                  onChange={(e) => handleChange('wordSpacing', e.target.value)} 
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs">Line (px)</Label>
                <Input 
                  type="number" 
                  value={config.lineSpacing} 
                  className="h-8 rounded-lg"
                  onChange={(e) => handleChange('lineSpacing', e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Top Padding (px)</Label>
                <Input 
                  type="number" 
                  value={config.topPadding} 
                  className="h-8 rounded-lg"
                  onChange={(e) => handleChange('topPadding', e.target.value)} 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Line Offset (px) (shifts lines vertically)</Label>
              <Input 
                type="number" 
                value={config.lineOffset} 
                className="h-8 rounded-lg"
                onChange={(e) => handleChange('lineOffset', e.target.value)} 
              />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Paper & Effects */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 rounded-xl">
              <Layers className="h-4 w-4" />
              <span className="hidden sm:inline">Style</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64 p-4 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Show Lines</Label>
              <Switch 
                checked={config.paperLines} 
                onCheckedChange={(checked) => handleChange('paperLines', checked)} 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Page Effect</Label>
              <Select value={config.pageEffect} onValueChange={(v) => handleChange('pageEffect', v as Config['pageEffect'])}>
                <SelectTrigger className="h-8 rounded-lg text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="shadows">Shadows</SelectItem>
                  <SelectItem value="scanner">Scanner</SelectItem>
                  <SelectItem value="vintage">Vintage (Aged)</SelectItem>
                  <SelectItem value="warm-glow">Warm Glow</SelectItem>
                  <SelectItem value="crumpled">Crumpled Paper</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Resolution</Label>
              <Select value={config.resolution.toString()} onValueChange={(v) => handleChange('resolution', parseInt(v))}>
                <SelectTrigger className="h-8 rounded-lg text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="1">1x (Standard)</SelectItem>
                  <SelectItem value="2">2x (High)</SelectItem>
                  <SelectItem value="3">3x (Ultra)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 border-t border-border pt-4">
              <Label className="text-xs block mb-2">Custom Paper</Label>
              <Input 
                type="file" 
                accept="image/*" 
                className="h-8 text-[10px] py-1 cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    handleChange('paperImage', url);
                  }
                }} 
              />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-6 w-px bg-border mx-2 hidden sm:block" />

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <Button 
            size="sm" 
            onClick={onGenerate} 
            disabled={isGenerating}
            className="rounded-xl px-4 bg-primary hover:bg-primary/90 text-white font-medium min-w-[100px]"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Wait...
              </>
            ) : (
              'Generate'
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={onDownloadAll} title="Download PDF" className="rounded-full h-8 w-8">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClearAll} title="Clear All" className="rounded-full h-8 w-8 text-destructive hover:bg-destructive/10">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
