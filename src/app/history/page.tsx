"use client"

import NoteModule from "../components/notes/NoteModule";
import { useAppContext } from "../context/context"

export default function HistoryPage() {
    const { notesList } = useAppContext();

    const onNavigate = (id) => {
        window.location.href = `/note/${id}`
    }

    return (
        <div className="p-2">
            <h1 className="text-4xl mb-4">Note History</h1>
            {notesList.length === 0 ? (
                <p>No notes available.</p>
            ) : (
                notesList.slice().reverse().map((note, idx) => (
                    <div key={idx} className="p-4 bg-zinc-700 rounded-xl text-xl flex flex-row my-4 justify-between" style={{ borderBottom: `4px solid #${note.color}` }}>
                        <div className="flex flex-row">
                            <h1>{note.name}</h1>
                            <button
                                className="ml-2 px-2 rounded-lg bg-zinc-600 transition duration-150 ease-in hover:bg-zinc-500"
                                onClick={() => onNavigate(note.id)}
                            >
                                Edit Note
                            </button>
                        </div>
                        <div>
                            <h1 className="text-gray-400">{note.time}</h1>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}