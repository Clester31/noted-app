import { NextRequest, NextResponse } from "next/server";
import test_db from '../../test_db'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const classPage = query 
        ? test_db.filter(cls => cls.id === query) 
        : test_db;
    return NextResponse.json(classPage); 
}