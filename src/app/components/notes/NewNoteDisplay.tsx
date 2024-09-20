import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

export default function newNoteDisplay({ setNewNoteDisplay, classColor, addNewNote }) {
    const [noteName, setNoteName] = useState<string>("");
    const [noteContent, setNoteContent] = useState<string>("");

    const handleSubmit = () => {
        setNewNoteDisplay(false);
        addNewNote(uuidv4(), noteName, noteContent)
    }

    return (
        <div className="absolute inset-0 flex justify-center items-center backdrop-blur-md bg-black/30">
            <div
                className="w-1/4 bg-zinc-800 p-4 rounded-xl"
                style={{ borderBottom: `10px solid #${classColor}` }}>
                <div>
                    <i
                        className="fa-solid fa-x cursor-pointer hover:bg-red-500 p-1 rounded"
                        onClick={() => setNewNoteDisplay(false)}></i>
                </div>
                <div>
                    <div className="flex flex-col items-center mb-4">
                        <label
                            htmlFor="noteTitle"
                            className="text-lg mb-2">Notes name</label>
                        <input
                            type="text"
                            name="noteTitle"
                            className="bg-zinc-500 rounded mb-4 h-8 p-2"
                            placeholder="notes name"
                            onChange={(e) => setNoteName(e.target.value)} />
                    </div>
                    <div className="flex flex-row justify-c enter mb-4 items-center">
                        <h1 className="mx-2">Add to folder</h1>
                        <select className="bg-zinc-500 rounded h-8 mx-2">
                            <option>Work in Progress</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-center mb-4">
                        <button
                            onClick={handleSubmit}
                            className="mt-4 text-xl p-2 bg-zinc-600 w-18 text-center rounded-xl">Add new note</button>
                    </div>
                </div>
            </div>
        </div>
    )
}