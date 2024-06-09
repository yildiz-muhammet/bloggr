
import { NextResponse, NextRequest } from 'next/server';
import prisma from "@/lib/prismadb";


export async function GET(request: NextRequest, response: NextResponse) {

    const id = request.nextUrl.pathname?.split("/")[3]

    const post = await prisma.post.findUnique({
        where: {
            id: id
        },
        include: {
            author: {
                select: {
                    username: true,
                    email: true,
                    image: true,
                    followersIDs: true
                }
            },
            comments: {
                select: {
                    content: true,
                    createdAt: true,
                    author: {
                        select: {
                            username: true,
                            image: true,
                        }
                    }
                }
            }

        }
    })

    if (!post) {
        return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }


    const relatedTagsPromises = post.relatedTags.map(async (tag) => {
        const tagData = await prisma.tag.findUnique({
            where: {
                id: tag
            }
        });
        return tagData?.name;
    });

    const relatedTagsNames = (await Promise.all(relatedTagsPromises)).filter(name => name !== undefined);


    return NextResponse.json({
        post,
        relatedTagsNames
    });

}
