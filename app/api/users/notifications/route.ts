import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth"



export async function GET(req: NextRequest, res: NextResponse) {
    const session: any = await getServerSession(authOptions as any)

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }


    const notifications = await prisma.notification.findMany({
        where: {
            userId: session.id
        },
        select: {
            content: true,
            createdAt: true,
            type: true,
            actionBy: {
                select: {
                    id: true,
                    username: true,
                    image: true,
                    email: true
                }
            },
            post: {
                select: {
                    id: true,
                    title: true,
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }

    })

    console.log(notifications)

    return NextResponse.json(notifications)

}