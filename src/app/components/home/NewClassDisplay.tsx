import { useEffect, useState } from "react"

export default function NewClassDisplay({ colors, addNewClass, setNewClassDisplay }) {
    const [classColor, setClassColor] = useState<string>(colors[Math.floor(Math.random() * 10)]);
    const [className, setClassName] = useState<string>('');

    const handleSubmit = () => {
        addNewClass(className, classColor)
    }

    useEffect(() => {
        console.log(classColor);
    }, [classColor]);

    return (
        <div className="absolute inset-0 flex justify-center items-center backdrop-blur-md bg-black/30">
            <div className="w-1/4 bg-zinc-800 p-4 rounded-xl" style={{ borderBottom: `10px solid #${classColor}` }}>
                <div>
                    <i className="fa-solid fa-x cursor-pointer hover:bg-red-500 p-1 rounded" onClick={() => setNewClassDisplay(!NewClassDisplay)}></i>
                </div>
                <div className="text-center flex flex-col justify-center">
                    <h1 className="font-bold mb-4 text-xl">Add a new class</h1>
                    <input
                        type="text"
                        name="newClassName"
                        placeholder="Class Name"
                        className="bg-zinc-500 rounded mb-4 h-8 p-2"
                        onChange={(e) => setClassName(e.target.value)} />
                    <p className="mb-4">Select a color</p>
                    <div className="grid grid-cols-5 gap-4 flex m-auto">
                        {colors.map((color: string, idx: number) => {
                            return (
                                <div
                                    key={idx}
                                    style={{ backgroundColor: `#${color}` }}
                                    className={`w-8 h-8 rounded-full cursor-pointer mx-5 my-1 ${classColor === color && `border-2 border-white`}`} onClick={() => setClassColor(color)}>
                                </div>
                            )
                        })}
                    </div>
                    <button 
                    className="flex m-auto p-2 rounded mt-4 bg-zinc-500" 
                    onClick={handleSubmit}>Add Class</button>
                </div>
            </div>
        </div>
    )
}