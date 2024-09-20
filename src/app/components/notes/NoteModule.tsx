type Note = {
    id: string;
    name: string;
    content: string;
}

interface NoteModuleProps {
    note: Note;
    setDeleteNoteDisplay: (dis: boolean) => void; 
    setSelectedNote: (note: Note) => void;
}

export default function NoteModule({ note, setDeleteNoteDisplay, setSelectedNote }: NoteModuleProps) {
    const handleRemove = () => {
        setDeleteNoteDisplay(true);
        setSelectedNote(note);
    }

    return (
        <div className="flex flex-row justify-between">
            <h1>{note.name}</h1>
            <i className="fa-solid fa-trash cursor-pointer hover:bg-red-500 p-1 rounded" onClick={handleRemove}></i>
        </div>
    )
}