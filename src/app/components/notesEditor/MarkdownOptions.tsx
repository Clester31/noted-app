export default function MarkdownOptions({ disableOptions }) {
    const icon_style = 'cursor-pointer hover:text-sky-500';

    return (
        <div>
            <div className="flex flex-row bg-zinc-800 p-2 text-xl rounded-t-xl">
                {disableOptions ?
                    <h1 className="text-gray-500 h-7"></h1>
                    :
                    <div className="flex flex-row space-x-4">
                        <strong className={icon_style}>B</strong>
                        <em className={icon_style}>I</em>
                        <h1 className={icon_style}>H1</h1>
                    </div>
                }

            </div>
        </div>
    )
}