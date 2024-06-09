

import { NextResponse, NextRequest } from 'next/server';
import prisma from "@/lib/prismadb";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth"


// Şİmdi bir get işlemi queryde gonderılen post idsine gore yorumları getiricek

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
        return NextResponse.json({ message: "PostId is required" }, { status: 400 });
    }


    const comments = await prisma.comment.findMany({
        where: {
            postId: postId
        },
        select: {
            content: true,
            createdAt: true,
            author: {
                select: {
                    username: true,
                    image: true
                }
            },

        },


    })

    return NextResponse.json(comments, { status: 200 });

}






export async function POST(request: NextRequest) {
    const session: any = await getServerSession(authOptions as any)

    const { postId, content } = await request.json()

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    }

    const activeUser = await prisma.user.findFirst({
        where: {
            email: session.email
        }
    })

    if (!activeUser) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const newComment = await prisma.comment.create({
        data: {
            postId: postId,
            content: content,
            authorId: activeUser.id
        }
    })

    return NextResponse.json(newComment, { status: 200 });


}