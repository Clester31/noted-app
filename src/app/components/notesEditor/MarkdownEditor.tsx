import { useState, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import MarkdownOptions from './MarkdownOptions'

export default function MarkdownEditor({ color, updateNoteContent }) {
    const [text, setText] = useState<string>("");
    const [previewText, setPreviewText] = useState<string>("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const updatePreview = (newText: string) => {
        const lines = newText.split('\n');
        const formattedLines = lines.map((line) => {
            if (line.startsWith('**') && line.endsWith('**')) {
                return `<p><strong>${line.slice(2, (line.length - 2))}</strong></p>`;
            } else if (line.startsWith('*') && line.endsWith('*')) {
                return `<p><em>${line.slice(1, (line.length - 1))}</em></p>`;
            } else if (line.startsWith('#')) {
                const hashCount = line.match(/^#+/)[0].length;
                let fontSize = 36 - (hashCount - 1) * 6; // Reduce font size as hashCount increases
                fontSize = Math.max(fontSize, 16); // Set a minimum font size limit
                const headingLevel = Math.min(hashCount, 6); // Maximum heading level is h6
                return `<h${headingLevel} style="font-size: ${fontSize}px;">${line.slice(hashCount).trim()}</h${headingLevel}>`;
            } else {
                return `<p>${line}</p>`;
            }
        });
        setPreviewText(formattedLines.join(''));
    };

    // const setStyle = (t: string) => {
    //     if (textAreaRef) {
    //         const selected = textAreaRef.current;
    //         const start = selected?.selectionStart;
    //         const end = selected?.selectionEnd;

    //         if(start !== end) {
    //             const selection = text.substring(start, end);
    //             let formattedText = "";

    //             switch (t) {
    //                 case 'b':
    //                     formattedText = `**${selection}**`; // Bold
    //                     break;
    //                 case 'i':
    //                     formattedText = `*${selection}*`; // Italic
    //                     break;
    //                 case 'h1':
    //                     formattedText = `# ${selection}`; // Heading 1
    //                     break;
    //                 // Add more cases for other styles as needed
    //                 default:
    //                     break;
    //             }

    //             const newText = text.substring(0, start) + formattedText + text.substring(end);
    //             setText(newText);
    //             updatePreview(newText);
    //         }
    //     }
    // }

    return (
        <div>
            <div className="flex flex-row">
                <div className="mr-2">
                    <h1>write here</h1>
                    <div>
                        <MarkdownOptions disableOptions={false} />
                        <textarea
                            className="bg-zinc-700 rounded-b-lg resize-none outline-none p-2"
                            name="textarea"
                            id="markdown"
                            style={{ borderBottom: `8px solid #${color}` }}
                            cols={80}
                            rows={20}
                            onChange={(e) => {
                                const newText = e.target.value;
                                setText(newText);
                                updatePreview(newText);
                            }}
                        ></textarea>
                    </div>
                </div>
                <div className="w-1/2 h-32 ml-2">
                    <h1>Preview</h1>
                    <MarkdownOptions disableOptions={true} />
                    {text.length === 0 ?
                        <div className="p-2 bg-zinc-800 rounded">Written notes will appear here. Write something!</div>
                        :
                        <div className="bg-zinc-700 p-2 rounded-b-xl">
                            <div dangerouslySetInnerHTML={{ __html: previewText }} />
                        </div>
                    }
                </div>
            </div>
            <button
                className="bg-zinc-700 p-2 rounded-xl hover:bg-zinc-600 transition duration-150 ease-out mt-4 text-2xl"
                onClick={() => updateNoteContent(previewText)}
            >
                Save
            </button>
        </div>
    );
}
