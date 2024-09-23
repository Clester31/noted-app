import { useEffect, useState } from "react";
import MarkdownOptions from './MarkdownOptions';

interface MarkdownEditorProps {
    color: string;
    content: string;
    updateNoteContent: (formattedContent: string, rawContent: string) => void;
}

export default function MarkdownEditorOld({ color, content, updateNoteContent }: MarkdownEditorProps) {
    // Initialize state with the passed raw content
    const [text, setText] = useState<string>(content || ""); // Set default empty string if content is undefined or null
    const [previewText, setPreviewText] = useState<string>("");

    useEffect(() => {
        // When the content prop changes, update the state
        setText(content || ""); // Ensure content is not undefined
        updatePreview(content || ""); // Ensure content is not undefined
    }, [content]);

    const updatePreview = (newText) => {
        const lines = newText.split('\n');

        const formattedLines = lines.map((line) => {
            const leadingSpaces = line.match(/^\s*/)[0].length;
            const invisibleChars = '&nbsp;'.repeat(leadingSpaces);

            if (line.trim() === "") {
                return "<br>"; // Return line break for empty lines
            } else if (line.startsWith('#')) {
                const hashCount = line.match(/^#+/)[0].length;
                let fontSize = 36 - (hashCount - 1) * 6; // Reduce font size as hashCount increases
                fontSize = Math.max(fontSize, 16); // Set a minimum font size limit
                const headingLevel = Math.min(hashCount, 6); // Maximum heading level is h6
                return `<h${headingLevel} style="font-size: ${fontSize}px;">${line.slice(hashCount).trim()}</h${headingLevel}>`;
            } else if (line.match(/^\s*\* /)) {
                return `<p>${invisibleChars}• ${line.trim().slice(2)}</p>`;
            } else if (line.startsWith(' ')) {
                return `<p>${invisibleChars}${line.slice(1)}</p>`;
            } else {
                const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                const finalFormattedLine = formattedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');
                return `<p>${finalFormattedLine}</p>`;
            }
        });
        setPreviewText(formattedLines.join(''));
    };

    return (
        <div>
            <div className="flex flex-row">
                <div className="mr-2">
                    <h1>Write Here</h1>
                    <div>
                        <MarkdownOptions disableOptions={false} setStyle={(t) => console.log(t)} />
                        <textarea
                            className="bg-zinc-700 rounded-b-lg resize-none outline-none p-2"
                            name="textarea"
                            id="markdown"
                            style={{ borderBottom: `8px solid #${color}` }}
                            cols={80}
                            rows={20}
                            value={text}  // Bind textarea value to text state
                            onChange={(e) => {
                                const newText = e.target.value;
                                setText(newText);
                                updatePreview(newText);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Tab') {
                                    e.preventDefault(); 
                                    const cursorPosition = e.target.selectionStart; 
                                    const textBeforeCursor = text.substring(0, cursorPosition); 
                                    const textAfterCursor = text.substring(cursorPosition); 
                                    const spaces = '       '; 
                                    // Insert seven spaces at the cursor position
                                    const newText = textBeforeCursor + spaces + textAfterCursor;
                                    setText(newText);
                                    updatePreview(newText);

                                    // Move the cursor to the correct position after the inserted spaces
                                    setTimeout(() => {
                                        e.target.selectionStart = e.target.selectionEnd = cursorPosition + spaces.length;
                                    }, 0);
                                } if (e.key === 'Enter') {
                                    const cursorPosition = e.target.selectionStart;
                                    const textBeforeCursor = text.substring(0, cursorPosition);
                                    const currentLine = textBeforeCursor.split('\n').pop(); // Get the current line of text

                                    if (currentLine.startsWith('* ')) {
                                        e.preventDefault(); 
                                        const newText = textBeforeCursor + '\n* ' + text.substring(cursorPosition);
                                        setText(newText);
                                        updatePreview(newText);
                                        setTimeout(() => {
                                            e.target.selectionStart = e.target.selectionEnd = cursorPosition + 3;
                                        }, 0);
                                    }
                                }
                            }}
                        ></textarea>
                    </div>
                </div>
                <div className="w-1/2 h-32 ml-2">
                    <h1>Preview</h1>
                    <MarkdownOptions disableOptions={true} setStyle={(t) => console.log(t)} />
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
