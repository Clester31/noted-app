import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex flex-col text-white text-3xl p-2 bg-zinc-800 w-16 h-screen items-center">
            <h1 className="my-5">N.</h1>
            <ul>
                <li className="cursor-pointer"><Link href={'/'}><i className="fa-solid fa-house my-5"></i></Link></li>
                <li><i className="fa-solid fa-clock my-5"></i></li>
            </ul>
        </div>
    )
}