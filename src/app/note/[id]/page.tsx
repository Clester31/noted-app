"use client"

type Note = {
    id: string;
    class: string;
    name: string;
    color: string;
    content: string;
}


import MarkdownEditor from "@/app/components/notesEditor/MarkdownEditor";
import { useAppContext } from "@/app/context/context";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FullNote() {
    const { id } = useParams();
    const { getNotesById, updateNote } = useAppContext();
    const[currentNotes, setCurrentNotes] = useState<Note | null>(null);

    const updateNoteContent = (previewText: string) => {
        if (currentNotes) {
            const updatedNote = { ...currentNotes, content: previewText };
            setCurrentNotes(updatedNote);
            updateNote(updatedNote); // Update the shared state in the context
            console.log("Updated Content:", updatedNote.content);
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
            <MarkdownEditor 
            color={currentNotes.color} 
            updateNoteContent={updateNoteContent}
            />
        </div>
    )
}