// updatePreview.ts
export const handleMarkdownUpdate = (newText: string, setPreviewText: (formattedText: string) => void) => {
    const lines = newText.split('\n');
  
    const formattedLines = lines.map((line) => {
      const leadingSpaces = line.match(/^\s*/)?.[0].length || 0;
      const invisibleChars = '&nbsp;'.repeat(leadingSpaces);
  
      if (line.trim() === "") {
        return "<br>"; // Return line break for empty lines
      } else if (line.startsWith('#')) {
        const hashCount = line.match(/^#+/)?.[0].length || 1;
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
  