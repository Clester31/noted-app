"use client";

import { useContext, useState, createContext, useEffect } from "react";

const AppContext = createContext<any>(null);

type Cls = {
    id: string;
    name: string;
    color: string;
    notes: Note[];
};

type Note = {
    id: string;
    class: string;
    name: string;
    color: string;
    content: string;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [classBoxColors, setClassBoxColors] = useState<string[]>([
        'F2636A',
        'C63333',
        'E94900',
        'F58606',
        'd4ad2c',
        '5ba142',
        '42a188',
        '2d87ad',
        '2e52a6',
        '7357bd'
    ]);

    const [classList, setClassList] = useState<Cls[]>(() => {
        // Initialize classList from localStorage if available
        if (typeof window !== "undefined") {
            const storedClasses = localStorage.getItem("classList");
            return storedClasses ? JSON.parse(storedClasses) : [];
        }
        return [];
    });

    const [notesList, setNotesList] = useState<Note[]>(() => {
        if (typeof window !== "undefined") {
            const storedNotes = localStorage.getItem("notesList");
            return storedNotes ? JSON.parse(storedNotes) : [];
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem("classList", JSON.stringify(classList));
    }, [classList]);

    useEffect(() => {
        localStorage.setItem("notesList", JSON.stringify(notesList));
    }, [notesList]);

    const updateClassList = (newClass: Cls) => {
        setClassList((prev) => [...prev, newClass]);
    };

    const removeClass = (classId: string) => {
        setClassList((prev) => prev.filter((cls) => cls.id !== classId));
    };

    const updateNotesList = (newNote: Note) => {
        setNotesList((prev) => {
            const noteIndex = prev.findIndex((note) => note.id === newNote.id);
            if (noteIndex === -1) {
                return [...prev, newNote];
            } else {
                const updatedNotes = [...prev];
                updatedNotes[noteIndex] = newNote;
                return updatedNotes;
            }
        });
    };

    const updateNote = (updatedNote: Note) => {
        setNotesList((prevNotes) => 
            prevNotes.map((note) => 
                note.id === updatedNote.id ? updatedNote : note
            )
        );
    };

    const removeNote = (noteId: string) => {
        setNotesList((prev) => prev.filter((note) => note.id !== noteId));
    };

    const getClassById = (id: string): Cls | null => {
        return classList.find((classPage) => classPage.id === id) || null;
    };

    const getNotesById = (id: string): Note | null => {
        return notesList.find((n) => n.id === id) || null;
    };

    return (
        <AppContext.Provider value={{
            classList,
            notesList,
            classBoxColors,
            updateClassList,
            removeClass,
            removeNote,
            updateNotesList,
            updateNote, 
            getClassById,
            getNotesById
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
