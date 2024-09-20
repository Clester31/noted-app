import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");

    // Retrieve the classList from localStorage
    let noteList: any[] = [];
    if (typeof window !== "undefined") {
        const storedNotes = localStorage.getItem("notesList");
        if (storedNotes) {
            noteList = JSON.parse(storedNotes);
        }
    }

    const classPage = query
        ? noteList.filter(cls => cls.id === query)
        : noteList;

    return NextResponse.json(classPage);
}