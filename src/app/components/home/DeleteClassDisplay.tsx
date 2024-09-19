interface DeleteClassDisplayProps {
    setDeleteClassDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    removeClass: React.Dispatch<React.SetStateAction<any>>;
    selectedClassId: string
}

export default function DeleteClassDisplay({ setDeleteClassDisplay, removeClass, selectedClassId }: DeleteClassDisplayProps) {
    const handleRemove = () => {
        setDeleteClassDisplay(false);
        removeClass(selectedClassId);
    }

    return (
        <div className="absolute inset-0 flex justify-center items-center backdrop-blur-md bg-black/30">
            <div className="flex flex-col items-center bg-zinc-800 p-4 rounded-xl">
                <h1 className="mb-4">Delete This Class?</h1>
                <div className="flex flex-row text-xl w-4/5 m-auto justify-center">
                    <button className="mx-2 p-1 bg-red-500 rounded-md w-16 hover:bg-red-400" onClick={handleRemove}>Yes</button>
                    <button className="mx-2 p-1 bg-zinc-500 rounded-md w-16 hover:bg-zinc-400" onClick={() => setDeleteClassDisplay(false)}>No</button>
                </div>
            </div>
        </div>
    )
}