interface MarkdownOptionsProps {
  disableOptions: boolean;
  text: string;
  setText: (newText: string) => void;
  updatePreview: (newText: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>; // Pass a ref to the textarea for cursor positioning
}

export default function MarkdownOptions({ disableOptions, text, setText, updatePreview, textareaRef }: MarkdownOptionsProps) {
  const icon_style = 'cursor-pointer hover:text-sky-500';

  const applyStyle = (startTag: string, endTag: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const selectedText = text.substring(startPos, endPos) || "your text here"; // Default text if none selected
      const newText = text.substring(0, startPos) + startTag + selectedText + endTag + text.substring(endPos);

      setText(newText);
      updatePreview(newText);
    }
  };

  return (
    <div>
      <div className="flex flex-row bg-zinc-800 p-2 text-xl rounded-t-xl">
        {disableOptions ? (
          <h1 className="text-gray-500 h-7"></h1>
        ) : (
          <div className="flex flex-row space-x-4">
            <strong className={icon_style} onClick={() => applyStyle('**', '**')}>B</strong>
            <em className={icon_style} onClick={() => applyStyle('*', '*')}>I</em>
            <h1 className={icon_style} onClick={() => applyStyle('# ', '')}>H1</h1>
          </div>
        )}
      </div>
    </div>
  );
}
