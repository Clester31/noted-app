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
    class: string;
    name: string;
    color: string;
    content: string;
}

export default function ClassPage() {
    const { id } = useParams();
    const { getClassById, updateNotesList, notesList, removeNote } = useAppContext();
    const [classPage, setClassPage] = useState<Cls | null>(null);
    const [newNoteDisplay, setNewNoteDisplay] = useState<boolean>(false);
    const [deleteNoteDisplay, setDeleteNoteDisplay] = useState<boolean>(false);
    const [selectedNote, setSelectedNote] = useState<Note>();
    const [pageColor, setPageColor] = useState<string>("");

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

    useEffect(() => {
        if (classPage) {
            setPageColor(classPage.color);
        }
    }, [classPage])

    if (!classPage) {
        return <div>loading...</div>;
    }

    const addNewNote = (id: string, name: string, content: string) => {
        const newNote = {
            id: id,
            class: classPage.name,
            name: name,
            color: pageColor,
            content: content
        };
        updateNotesList(newNote);
    };

    const deleteNote = (noteId: string) => { 
        setDeleteNoteDisplay(false); 
        removeNote(noteId);
    };

    const filteredNotes = notesList.filter((note: Note) => note.class === classPage?.name);

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
                <h1 className="text-4xl font-semibold">{classPage?.name}</h1>
            </div>
            <div>
                <p className="text-2xl mt-4 p-4 rounded-xl bg-zinc-600" style={{ borderBottom: `10px solid #${pageColor}` }}>Existing Notes: </p>
                <div className="my-6">
                    {
                        filteredNotes.length === 0 ?
                            <div className="text-xl p-2 bg-zinc-700 rounded-xl">
                                <h1>Notes are empty</h1>
                            </div>
                            :
                            filteredNotes.map((note) => (
                                <div key={note.id} className="bg-zinc-700 my-4 p-2 text-xl items-center rounded-xl">
                                    <NoteModule
                                        note={note}
                                        setDeleteNoteDisplay={setDeleteNoteDisplay}
                                        setSelectedNote={setSelectedNote}
                                        color={pageColor}
                                    />
                                </div>
                            ))}
                </div>

            </div>
            <div>
                <button className="text-2xl p-2 bg-zinc-600 w-36 text-center rounded-xl hover:font-bold" style={{ backgroundColor: `#${pageColor}` }} onClick={() => setNewNoteDisplay(!newNoteDisplay)}>New Note</button>
            </div>
        </div>
    );
}
