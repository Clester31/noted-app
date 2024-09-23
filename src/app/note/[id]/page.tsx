"use client"

type Note = {
    id: string;
    class: string;
    classId: string;
    name: string;
    color: string;
    content: string;
    rawContent: string;
}


import MarkdownEditorOld from "@/app/components/notesEditor/MarkdownEditorOld";
import { useAppContext } from "@/app/context/context";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FullNote() {
    const { id } = useParams();
    const { getNotesById, updateNote } = useAppContext();
    const[currentNotes, setCurrentNotes] = useState<Note | null>(null);

    const updateNoteContent = (previewText: string, rawText: string) => {
        if (currentNotes) {
            const updatedNote = { ...currentNotes, content: previewText, rawContent: rawText };
            setCurrentNotes(updatedNote);
            updateNote(updatedNote);
            window.location.href = `/class/${currentNotes.classId}`;
        }
    }

    useEffect(() => {
        if (id) {
            const fetchedNotes = getNotesById(id);
            if (fetchedNotes) {
                setCurrentNotes(fetchedNotes);
                console.log("notes list", currentNotes);
            } else {
                console.log("Class not found");
            }
        }
    }, [id, getNotesById, currentNotes]);

    if (!currentNotes) {
        return <div>loading...</div>;
    }

    return (
        <div>
            <h1 className="text-4xl">{currentNotes.name}</h1>
            <MarkdownEditorOld 
            content={currentNotes.rawContent}
            color={currentNotes.color} 
            updateNoteContent={updateNoteContent}
            />
        </div>
    )
}