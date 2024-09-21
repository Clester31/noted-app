import { useState } from "react";
import getCurrentDateTime from "@/app/utility/getCurrentDateTime";

type Note = {
    id: string;
    class: string;
    classId: string;
    name: string;
    color: string;
    content: string;
    time: string;
}

interface NoteModuleProps {
    note: Note;
    setDeleteNoteDisplay: (dis: boolean) => void;
    setSelectedNote: (note: Note) => void;
    color: string;
}

export default function NoteModule({ note, setDeleteNoteDisplay, setSelectedNote }: NoteModuleProps) {
    const [displayNotePreview, setDisplayNotePreview] = useState<boolean>(false);
    const handleRemove = () => {
        setDeleteNoteDisplay(true);
        setSelectedNote(note);
    }

    const onNavigate = () => {
        window.location.href = `/note/${note.id}`
    }

    return (
        <div>
            <div className="flex flex-row justify-between p-1">
                <div className="flex flex-row">
                    <h1 className="font-semibold mr-2">{note.name}</h1>
                    <button
                        className="ml-2 px-2 rounded-lg bg-zinc-600 transition duration-150 ease-in hover:bg-zinc-500"
                        onClick={onNavigate}
                    >
                        Edit Note</button>
                    <i className="fa-solid fa-caret-down cursor-pointer hover:text-sky-500 p-1 rounded mx-2 text-xl" onClick={() => setDisplayNotePreview(!displayNotePreview)}></i>
                </div>
                <div className="flex flex-row text-xl">
                    <p className="text-gray-400">{note.time}</p>
                    <i className="fa-solid fa-trash cursor-pointer hover:text-red-500 p-1 rounded mx-2" onClick={handleRemove}></i>
                </div>
            </div>
            {displayNotePreview && (
                <div className="p-2 bg-zinc-800 rounded">
                    <div dangerouslySetInnerHTML={{ __html: note.content }} />
                </div>

            )}
        </div>
    )
}