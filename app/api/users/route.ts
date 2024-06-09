import { NextResponse, NextRequest } from 'next/server';
import prisma from "@/lib/prismadb";


export async function GET(request: NextRequest) {
    const users = await prisma.user.findMany(
        {
            include: {
                posts: {
                    select: {
                        title: true,
                        content: true,

                    }
                }
            }
        }

    );

    return NextResponse.json(users);

}



