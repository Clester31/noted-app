"use client"

import { useContext, useState, createContext, useEffect } from "react";
import test_db from "../test_db";

const AppContext = createContext<any>(null);

type Cls = {
    id: string;
    name: string;
    color: string;
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

    const [classList, setClassList] = useState<Cls[]>([]);

    useEffect(() => {
        console.log("something has happened...");
        console.log(classList, test_db);
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