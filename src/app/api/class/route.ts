import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");

    // Retrieve the classList from localStorage
    let classList: any[] = [];
    if (typeof window !== "undefined") {
        const storedClasses = localStorage.getItem("classList");
        if (storedClasses) {
            classList = JSON.parse(storedClasses);
        }
    }

    const classPage = query
        ? classList.filter(cls => cls.id === query)
        : classList;

    return NextResponse.json(classPage);
}