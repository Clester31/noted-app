import { useEffect, useRef, useState } from "react";
import MarkdownOptions from './MarkdownOptions';
import { handleKeyInput } from '../../utility/handleKeyInput';
import { handleMarkdownUpdate } from '../../utility/handleMarkdownUpdate';

interface MarkdownEditorProps {
  color: string;
  content: string;
  updateNoteContent: (formattedContent: string, rawContent: string) => void;
}

export default function MarkdownEditorOld({ color, content, updateNoteContent }: MarkdownEditorProps) {
  const [text, setText] = useState<string>(content || "");
  const [previewText, setPreviewText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null); 

  useEffect(() => {
    setText(content || "");
    handleMarkdownUpdate(content || "", setPreviewText);
  }, [content]);

  return (
    <div>
      <div className="flex flex-row">
        <div className="mr-2">
          <h1>Write Here</h1>
          <div>
            <MarkdownOptions
              disableOptions={false}
              text={text}
              setText={setText}
              handleMarkdownUpdate={(newText: string) => handleMarkdownUpdate(newText, setPreviewText)}
              textareaRef={textareaRef} 
            />
            <textarea
              className="bg-zinc-700 rounded-b-lg resize-none outline-none p-2"
              name="textarea"
              id="markdown"
              style={{ borderBottom: `8px solid #${color}` }}
              cols={80}
              rows={20}
              ref={textareaRef}  // Attach the ref to the textarea
              value={text}
              onChange={(e) => {
                const newText = e.target.value;
                setText(newText);
                handleMarkdownUpdate(newText, setPreviewText);
              }}
              onKeyDown={(e) => handleKeyInput(e, text, setText, (newText) => handleMarkdownUpdate(newText, setPreviewText))}
            ></textarea>
          </div>
        </div>
        <div className="w-1/2 h-32 ml-2">
          <h1>Preview</h1>
          <MarkdownOptions disableOptions={true} text={text} setText={setText} handleMarkdownUpdate={handleMarkdownUpdate} textareaRef={textareaRef} />
          {text.length === 0 ? (
            <div className="p-2 bg-zinc-700 rounded-b-xl">Written notes will appear here. Write something!</div>
          ) : (
            <div className="bg-zinc-700 p-2 rounded-b-xl">
              <div dangerouslySetInnerHTML={{ __html: previewText }} />
            </div>
          )}
        </div>
      </div>
      <button
        className="bg-zinc-700 p-2 rounded-xl hover:bg-zinc-600 transition duration-150 ease-out mt-4 text-2xl"
        onClick={() => updateNoteContent(previewText, text)}
      >
        Save
      </button>
    </div>
  );
}
