import { useState, useRef } from 'react';
import { PaperSheet } from '@/components/editor/PaperSheet';
import { MainEditor } from '@/components/editor/MainEditor';
import { CustomizationPanel } from '@/components/customization/CustomizationPanel';
import { OutputSection } from '@/components/output/OutputSection';
import { HandwritingsGuide } from '@/components/sections/HandwritingsGuide';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { SponsorshipSection } from '@/components/sections/SponsorshipSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { DrawCanvas } from '@/components/editor/DrawCanvas';
import { useAppConfig } from '@/hooks/useAppConfig';
import { useImageGenerator } from '@/hooks/useImageGenerator';
import { Button } from '@/components/ui/button';
import { Pencil, PenTool, Eye, FileImage } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Home() {
  const { config, updateConfig, loading } = useAppConfig();
  const [content, setContent] = useState('');
  const [isDrawOpen, setIsDrawOpen] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  const {
    outputImages,
    isGenerating,
    generateImages,
    downloadAsPDF,
    deleteImage,
    deleteAll,
    moveLeft,
    moveRight,
  } = useImageGenerator();

  const handleGenerate = () => {
    if (pageRef.current) {
      generateImages(pageRef.current, {
        resolution: config.resolution,
        effect: config.pageEffect,
      });
    }
  };

  const handleDrawSave = (dataUrl: string) => {
    setContent((prev) => `<img src="${dataUrl}" style="width: 100%;" />${prev}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="text-muted-foreground animate-pulse">Loading Assignmento...</p>
      </div>
    );
  }

  return (
    <>
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Text to Handwriting <span className="text-primary">Converter</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Convert your digital text into realistic handwriting images. Perfect for assignments, letters, and more.
            </p>
          </section>

          <CustomizationPanel 
            config={config} 
            onConfigChange={updateConfig}
            onGenerate={handleGenerate}
            onDownloadAll={downloadAsPDF}
            onClearAll={deleteAll}
            isGenerating={isGenerating}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch max-w-7xl mx-auto">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between h-10">
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                  <PenTool className="h-5 w-5 text-primary" />
                  Content Editor
                </h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 rounded-xl"
                  onClick={() => setIsDrawOpen(true)}
                >
                  <Pencil className="h-4 w-4" />
                  Draw / Add Image
                </Button>
              </div>
              <div className="flex-grow">
                <MainEditor content={content} onContentChange={setContent} />
              </div>

              <div className={cn("mt-8 space-y-4 transition-all duration-500", outputImages.length === 0 ? "opacity-60" : "opacity-100")}>
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                  <FileImage className="h-5 w-5 text-primary" />
                  Generated Pages {outputImages.length > 0 && <span className="text-sm font-normal text-muted-foreground ml-2">({outputImages.length})</span>}
                </h2>
                {outputImages.length > 0 ? (
                  <OutputSection 
                    images={outputImages}
                    onDelete={deleteImage}
                    onMoveLeft={moveLeft}
                    onMoveRight={moveRight}
                  />
                ) : (
                  <div className="border-2 border-dashed border-border rounded-3xl p-12 text-center bg-muted/20">
                    <p className="text-muted-foreground text-sm italic">Click "Generate" above to see your handwritten pages here.</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col space-y-4">
              <div className="flex items-center h-10">
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  Handwriting Preview
                </h2>
              </div>
              <div className="flex-grow flex items-start justify-center">
                <PaperSheet 
                  config={config} 
                  content={content} 
                  pageRef={pageRef}
                  placeholder="Start typing your assignment here..."
                />
              </div>
            </div>
          </div>
        </div>

        <HandwritingsGuide />
        <FeaturesSection />
        <FAQSection />
        <SponsorshipSection />
      </main>

      <DrawCanvas 
        isOpen={isDrawOpen} 
        onClose={() => setIsDrawOpen(false)} 
        onSave={handleDrawSave}
        inkColor={config.inkColor}
      />
    </>
  );
}
