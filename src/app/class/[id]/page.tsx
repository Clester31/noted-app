"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useAppContext } from "@/app/context/context";

type Cls = {
    id: string;
    name: string;
    color: string;
}

export default function ClassPage() {
    const { id } = useParams();
    const { getClassById } = useAppContext();
    const [classPage, setClassPage] = useState<Cls | null>(null);

    useEffect(() => {
        if(id) {
            const fetchedClassPage = getClassById(id);
            if(fetchedClassPage) {
                setClassPage(fetchedClassPage);
            } else {
                console.log("Class not found")
            }
        }
    }, [id, getClassById])

    if(!classPage) {
        return <div>loading...</div>
    }

    return (
        <div>
            <h1>{classPage?.name}</h1>
        </div>
    )
}