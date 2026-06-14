import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Card } from '@/components/ui/card';

interface MainEditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

export function MainEditor({ content, onContentChange }: MainEditorProps) {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean']
    ],
  };

  return (
    <Card className="w-full h-full border-border shadow-lg overflow-hidden flex flex-col rounded-2xl">
      <div className="p-4 bg-muted/30 border-b border-border shrink-0">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Editor</h3>
      </div>
      <div className="flex-grow flex flex-col min-h-[500px]">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={onContentChange}
          modules={modules}
          placeholder="Start writing your content here..."
          className="flex-grow main-content-editor flex flex-col"
        />
      </div>
    </Card>
  );
}
