"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/context/context";

import NewNoteDisplay from '../../components/notes/NewNoteDisplay';
import DeleteNoteDisplay from "@/app/components/notes/DeleteNoteDisplay";
import NoteModule from "@/app/components/notes/NoteModule";

type Cls = {
    id: string;
    name: string;
    color: string;
    notes: Note[];
}

type Note = {
    id: string;
    name: string;
    content: string;
}

export default function ClassPage() {
    const { id } = useParams();
    const { getClassById } = useAppContext();
    const [classPage, setClassPage] = useState<Cls | null>(null);
    const [newNoteDisplay, setNewNoteDisplay] = useState<boolean>(false);
    const [deleteNoteDisplay, setDeleteNoteDisplay] = useState<boolean>(false);
    const [notesList, setNotesList] = useState<Note[]>([]); 
    const [selectedNote, setSelectedNote] = useState<Note>();

    useEffect(() => {
        if (id) {
            const fetchedClassPage = getClassById(id);
            if (fetchedClassPage) {
                setClassPage(fetchedClassPage);
                console.log("notes list", notesList);
            } else {
                console.log("Class not found");
            }
        }
    }, [id, getClassById, notesList]);

    if (!classPage) {
        return <div>loading...</div>;
    }

    const addNewNote = (id: string, name: string, content: string) => {
        const newNote = {
            id: id,
            name: name,
            content: content
        };
        setNotesList((prev) => [...prev, newNote]);
    };

    const deleteNote = (noteId: string) => { // Change to accept a string
        setDeleteNoteDisplay(false); // Hide the delete confirmation
        setNotesList(notesList.filter((n) => n.id !== noteId)); // Filter out the note by ID
    };

    return (
        <div className="w-4/5 p-2 m-auto">
            {newNoteDisplay && (
                <NewNoteDisplay
                    setNewNoteDisplay={setNewNoteDisplay}
                    classColor={classPage.color}
                    addNewNote={addNewNote}
                />
            )}
            {deleteNoteDisplay && (
                <DeleteNoteDisplay 
                    setDeleteNoteDisplay={setDeleteNoteDisplay}
                    deleteNote={deleteNote} // Correctly pass the delete function
                    selectedNote={selectedNote} // This is fine as is
                />
            )}
            <div>
                <h1 className="text-6xl font-semibold">{classPage?.name}</h1>
            </div>
            <div>
                <p className="text-2xl mt-4 p-2 rounded-xl" style={{ backgroundColor: `#${classPage.color}` }}>Existing Notes: </p>
                {notesList.map((note) => (
                    <div key={note.id} className="bg-zinc-700 my-4 ml-2 p-2 text-lg items-center rounded-xl">
                        <NoteModule 
                            note={note} 
                            setDeleteNoteDisplay={setDeleteNoteDisplay}
                            setSelectedNote={setSelectedNote} // Pass deleteNote function
                        />
                    </div>
                ))}
            </div>
            <div className="mt-4 text-2xl p-2 bg-zinc-600 w-36 text-center rounded-xl" style={{ backgroundColor: `#${classPage.color}` }}>
                <button onClick={() => setNewNoteDisplay(!newNoteDisplay)}>New Note</button>
            </div>
        </div>
    );
}
