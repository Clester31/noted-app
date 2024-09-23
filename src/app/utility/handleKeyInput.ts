// handleKeyDown.ts
export const handleKeyInput = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    text: string,
    setText: (newText: string) => void,
    updatePreview: (newText: string) => void
) => {
    // get currently selected text
    const cursorPosition = e.currentTarget.selectionStart;
    const cursorEnd = e.currentTarget.selectionEnd;
    // also get anything that comes before or after it
    const textBeforeCursor = text.substring(0, cursorPosition);
    const textAfterCursor = text.substring(cursorEnd);

    if (e.key === 'Tab') {
        e.preventDefault();
        const spaces = '       ';
        const newText = textBeforeCursor + spaces + textAfterCursor;
        setText(newText);
        updatePreview(newText);
    }

    if (e.key === 'Enter') {
        const currentLine = textBeforeCursor.split('\n').pop();
        if (currentLine.startsWith('* ')) {
            e.preventDefault();
            const newText = textBeforeCursor + '\n* ' + textAfterCursor;
            setText(newText);
            updatePreview(newText);
        }
    }

    if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        const selectedText = text.substring(cursorPosition, cursorEnd) || "bold text";
        const newText = textBeforeCursor + `**${selectedText}**` + textAfterCursor;
        setText(newText);
        updatePreview(newText);
    }

    if (e.ctrlKey && e.key === 'i') {
        e.preventDefault();
        const selectedText = text.substring(cursorPosition, cursorEnd) || "italic text";
        const newText = textBeforeCursor + `*${selectedText}*` + textAfterCursor;
        setText(newText);
        updatePreview(newText);
    }

    if(e.ctrlKey && e.key === 'h') {
        e.preventDefault();
        const selectedText = text.substring(cursorPosition, cursorEnd) || "Heading";
        const newText = textBeforeCursor + `#${selectedText}`+ textAfterCursor;
        setText(newText);
        updatePreview(newText);
    }
};
