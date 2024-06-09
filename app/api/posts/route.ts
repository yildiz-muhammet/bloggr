import { NextResponse, NextRequest } from 'next/server';
import prisma from "@/lib/prismadb";
import path from 'path';
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth"

const uploadDir = path.join(process.cwd(), 'public', 'images');
import fs from 'fs/promises';


export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag')


    const posts = await prisma.post.findMany({
        include: {
            author: {
                select: {
                    username: true,
                    email: true,
                    image: true,
                }
            },
            comments: {
                select: {
                    content: true,
                    createdAt: true,
                    author: {
                        select: {
                            username: true,
                            image: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        },

    });

    if (!tag) return NextResponse.json(posts)


    const currentTag = await prisma.tag.findFirst({
        where: {
            name: tag as string
        }
    })

    const filteredPosts = posts.filter((post) => {
        return post.relatedTags.includes(currentTag?.id as any)
    })


    return NextResponse.json(filteredPosts);

}




export async function POST(request: any) {
    const session: any = await getServerSession(authOptions as any)

    const formData = await request.formData().then((data: any) => {
        return data
    })
    const title = formData.get('title')
    const content = formData.get('content')
    const image = formData.get('image')
    const relatedTags = formData.get('relatedtags')


    const currentTag = await prisma.tag.findFirst({
        where: {
            id: JSON.parse(relatedTags)[0]
        }
    })

    const fileName = Date.now().toString() + '-post-' + image.name

    if (image) {
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const filePath = path.join(uploadDir, fileName)
        await fs.writeFile(filePath, buffer)
    }

    const newPost = await prisma.post.create({
        data: {
            title,
            content,
            image: image ? fileName : null,
            authorId: session?.id,
            relatedTags: JSON.parse(relatedTags),
            currentTagName: currentTag?.name,
            readingTime: Math.ceil(content.length / 1300) > 1 ? Math.ceil(content.length / 1300) : 1,
        }
    })

    const followers = await prisma.user.findMany({
        where: {
            following: {
                some: {
                    id: session?.id
                }
            }
        }
    })

    const notificationPromises = followers.map((follower) => {
        return prisma.notification.create({
            data: {
                type: 'newPost',
                userId: follower.id,
                actionById: session?.id,
                content: `${session?.username} created a new post called ${title}.`,
                postId: newPost.id,
            },
        });
    });

    await Promise.all(notificationPromises);


    return NextResponse.json(newPost, { status: 201 })

}

