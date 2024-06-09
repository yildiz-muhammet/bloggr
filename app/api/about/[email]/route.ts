
// kullanıcı about sayfasında ona ait postları takıp ettıgı kısılerı tum bılgılerı gormelı


import { NextResponse, NextRequest } from 'next/server';
import prisma from "@/lib/prismadb";



export async function GET(request: NextRequest, response: NextResponse) {

    const target = request.nextUrl.pathname?.split("/")[3]


    const user = await prisma.user.findFirst({
        where: {
            email: target + "@gmail.com",
        },
        select: {
            id: true,
            email: true,
            username: true,
            image: true,
            info: true,
            posts: {
                select: {
                    id: true,
                    title: true,
                    content: true,
                    createdAt: true,
                    // likes: true,
                    image: true,
                    author: {
                        select: {
                            username: true,
                            image: true,
                            email: true
                        }
                    }
                }
            },
            followers: {
                select: {
                    id: true,
                    username: true,
                    image: true,
                    email: true
                }
            },
            following: {
                select: {
                    id: true,
                    username: true,
                    image: true,
                    email: true
                }
            },
            followersIDs: true,
            followingIDs: true
        }

    })


    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);


}


