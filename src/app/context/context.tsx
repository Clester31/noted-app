"use client"

import { useContext, useState, createContext, useEffect } from "react";
import test_db from "../../../data/test_db";

const AppContext = createContext<any>(null);

type Cls = {
    id: string;
    name: string;
    color: string;
    notes: Note[];
}

type Note = {
    id: string;
    name: string;
    content: string;
}

export const AppProvider = ({ children }: { children: React.ReactNode })=> {
    const [classBoxColors, setClassBoxColors] = useState(
        [
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
        ]
    );

    const [classList, setClassList] = useState<Cls[]>(() => {
        // Initialize classList from localStorage if available
        if (typeof window !== "undefined") {
            const storedClasses = localStorage.getItem("classList");
            return storedClasses ? JSON.parse(storedClasses) : [];
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem("classList", JSON.stringify(classList));
    }, [classList])

    const updateClassList = (newClass: Cls) => {
        setClassList((prev) => [...prev, newClass]);
        test_db.push(newClass);
    }

    const removeClass = (classId: string) => {
        setClassList((prev) => prev.filter((cls) => cls.id !== classId));
        console.log(classList);
    }

    const getClassById = (id: string) => {
        return classList.find(classPage => classPage.id === id) || null;
    };

    return (
        <AppContext.Provider value={{ classList, classBoxColors, updateClassList, removeClass, getClassById }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}