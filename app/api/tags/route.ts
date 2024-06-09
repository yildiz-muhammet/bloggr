

import { NextResponse, NextRequest } from 'next/server';
import prisma from "@/lib/prismadb";


export async function GET(request: NextRequest) {
    const tags = await prisma.tag.findMany();

    return NextResponse.json(tags);

}



export async function POST(request: NextRequest) {
    const { name } = await request.json();

    const tag = await prisma.tag.create({
        data: {
            name
        }
    })

    return NextResponse.json(tag);
}
