import { cn } from '@/lib/utils';
import type { Config } from '@/types';

interface PaperSheetProps {
  config: Config;
  content: string;
  pageRef: React.RefObject<HTMLDivElement | null>;
  placeholder?: string;
}

export function PaperSheet({ config, content, pageRef, placeholder }: PaperSheetProps) {
  const isContentEmpty = !content || content === '<p><br></p>';

  const paperStyle: React.CSSProperties = {
    fontFamily: config.handwritingFont,
    fontSize: `${config.fontSize}pt`,
    color: config.inkColor,
    letterSpacing: `${config.letterSpacing}px`,
    wordSpacing: `${config.wordSpacing}px`,
    paddingTop: `${config.topPadding}px`,
    backgroundImage: config.paperImage ? `url(${config.paperImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="flex justify-center w-full overflow-visible">
      <div
        ref={pageRef}
        id="page-a"
        className={cn(
          "relative bg-[#fffdfa] shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-300 overflow-y-auto border border-border/50",
          "w-full aspect-[1/1.41] rounded-sm paper-texture",
          config.paperLines && "paper-lines"
        )}
        style={paperStyle}
      >
        <div 
          className={cn(
            "paper-content h-full relative z-0 ql-editor",
            isContentEmpty && "is-blank text-muted-foreground/30 italic"
          )}
          dangerouslySetInnerHTML={{ __html: isContentEmpty ? `<p>${placeholder || ''}</p>` : content }}
        />

        {config.pageEffect !== 'none' && (
          <div 
            className={cn(
              "absolute inset-0 pointer-events-none z-10",
              config.pageEffect === 'shadows' && "bg-gradient-to-tr from-black/20 to-transparent",
              config.pageEffect === 'scanner' && "bg-gradient-to-b from-black/10 via-transparent to-black/10"
            )}
          />
        )}
      </div>
    </div>
  );
}
