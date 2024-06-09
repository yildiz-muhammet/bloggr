import { NextResponse, NextRequest } from 'next/server';
import prisma from "@/lib/prismadb";

export async function GET(request: NextRequest) {
    // postların title larını gondrıcez 

    const posts = await prisma.post.findMany({
        select: {
            title: true,
            id: true
        }
    });

    return NextResponse.json(posts)

}