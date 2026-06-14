import { useState } from 'react';
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';
import { toast } from 'sonner';

export interface GeneratedImage {
  id: string;
  dataUrl: string;
}

export function useImageGenerator() {
  const [outputImages, setOutputImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const capturePage = async (
    pageElement: HTMLElement,
    options: { resolution: number; effect: string }
  ): Promise<string> => {
    try {
      const dataUrl = await htmlToImage.toJpeg(pageElement, {
        quality: 0.9,
        pixelRatio: options.resolution,
        backgroundColor: '#fffdfa',
        style: {
          boxShadow: 'none',
          border: 'none',
          borderRadius: '0',
        }
      });

      if (options.effect === 'scanner') {
        // We can still apply contrast to the generated image if needed
        // But html-to-image returns a dataUrl string, not a canvas
        // For simplicity, we'll return the raw dataUrl for now
      }

      return dataUrl;
    } catch (err) {
      console.error('Capture failed:', err);
      throw err;
    }
  };

  const generateImages = async (
    pageElement: HTMLElement,
    options: {
      resolution: number;
      effect: string;
    }
  ) => {
    setIsGenerating(true);
    const paperContentEl = pageElement.querySelector('.paper-content') as HTMLElement;
    
    if (!paperContentEl) {
      toast.error('Could not find editor content to generate image.');
      setIsGenerating(false);
      return;
    }

    const originalHTML = paperContentEl.innerHTML;
    const images: GeneratedImage[] = [];

    // Capture original style values
    const viewHeight = pageElement.clientHeight || 700;
    const originalHeight = pageElement.style.height;
    const originalOverflow = pageElement.style.overflow;
    const originalMinHeight = pageElement.style.minHeight;
    const originalMaxHeight = pageElement.style.maxHeight;
    const originalAspectRatio = pageElement.style.aspectRatio;
    const originalContentHeight = paperContentEl.style.height;
    const originalContentMinHeight = paperContentEl.style.minHeight;
    const originalContentMaxHeight = paperContentEl.style.maxHeight;

    const setAutoHeightMode = () => {
      pageElement.style.height = 'auto';
      pageElement.style.overflow = 'visible';
      pageElement.style.minHeight = '0';
      pageElement.style.maxHeight = 'none';
      pageElement.style.aspectRatio = 'auto';
      paperContentEl.style.height = 'auto';
      paperContentEl.style.minHeight = '0';
      paperContentEl.style.maxHeight = 'none';
    };

    const restoreOriginalStyles = () => {
      pageElement.style.height = originalHeight;
      pageElement.style.overflow = originalOverflow;
      pageElement.style.minHeight = originalMinHeight;
      pageElement.style.maxHeight = originalMaxHeight;
      pageElement.style.aspectRatio = originalAspectRatio;
      paperContentEl.style.height = originalContentHeight;
      paperContentEl.style.minHeight = originalContentMinHeight;
      paperContentEl.style.maxHeight = originalContentMaxHeight;
    };

    try {
      // Ensure all images (if any) are loaded
      await new Promise(resolve => setTimeout(resolve, 500));

      // Temporarily expand to see all content
      setAutoHeightMode();

      const scrollHeight = paperContentEl.scrollHeight;
      const totalPagesEstimate = Math.max(1, Math.ceil(scrollHeight / viewHeight));

      if (totalPagesEstimate <= 1) {
        restoreOriginalStyles();
        const dataUrl = await capturePage(pageElement, options);
        images.push({ id: Math.random().toString(36).substr(2, 9), dataUrl });
      } else {
        const splitContent = originalHTML.split(/(<p>.*?<\/p>|<br\/?>|<h1>.*?<\/h1>|<h2>.*?<\/h2>|<h3>.*?<\/h3>|<ul>.*?<\/ul>|<ol>.*?<\/ol>)/).filter(Boolean);
        let partIndex = 0;

        for (let i = 0; i < totalPagesEstimate + 2; i++) { 
          setAutoHeightMode();
          paperContentEl.innerHTML = '';
          let lastValidHTML = '';

          while (partIndex < splitContent.length) {
            const nextPart = splitContent[partIndex];
            const currentHTML = lastValidHTML + nextPart;
            paperContentEl.innerHTML = currentHTML;
            
            if (paperContentEl.scrollHeight > viewHeight) {
              if (lastValidHTML === '') {
                lastValidHTML = currentHTML;
                partIndex++;
              } else {
                paperContentEl.innerHTML = lastValidHTML;
              }
              break;
            }
            
            lastValidHTML = currentHTML;
            partIndex++;
          }

          if (lastValidHTML !== '') {
            restoreOriginalStyles();
            const dataUrl = await capturePage(pageElement, options);
            images.push({ id: Math.random().toString(36).substr(2, 9), dataUrl });
          }
          
          if (partIndex >= splitContent.length) break;
        }
      }

      setOutputImages((prev) => [...prev, ...images]);
      toast.success(`Successfully generated ${images.length} page(s)!`);
      
    } catch (err) {
      console.error('Generation Error:', err);
      toast.error('Failed to generate image. Please try again.');
    } finally {
      restoreOriginalStyles();
      paperContentEl.innerHTML = originalHTML;
      setIsGenerating(false);
    }
  };

  const downloadAsPDF = () => {
    if (outputImages.length === 0) {
      toast.error('No generated images to download.');
      return;
    }

    try {
      const doc = new jsPDF('p', 'pt', 'a4');
      const width = doc.internal.pageSize.width;
      const height = doc.internal.pageSize.height;

      outputImages.forEach((img, i) => {
        doc.addImage(img.dataUrl, 'JPEG', 0, 0, width, height);
        if (i !== outputImages.length - 1) {
          doc.addPage();
        }
      });

      doc.save('assignmento-handwriting.pdf');
      toast.success('PDF downloaded successfully!');
    } catch (err) {
      console.error('PDF Error:', err);
      toast.error('Failed to create PDF.');
    }
  };

  const deleteImage = (id: string) => {
    setOutputImages((prev) => prev.filter((img) => img.id !== id));
    toast.info('Page removed.');
  };

  const deleteAll = () => {
    setOutputImages([]);
    toast.info('All pages cleared.');
  };

  const moveLeft = (index: number) => {
    if (index === 0) return;
    setOutputImages((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  };

  const moveRight = (index: number) => {
    if (index === outputImages.length - 1) return;
    setOutputImages((prev) => {
      const next = [...prev];
      [next[index + 1], next[index]] = [next[index], next[index + 1]];
      return next;
    });
  };

  return {
    outputImages,
    isGenerating,
    generateImages,
    downloadAsPDF,
    deleteImage,
    deleteAll,
    moveLeft,
    moveRight,
  };
}
