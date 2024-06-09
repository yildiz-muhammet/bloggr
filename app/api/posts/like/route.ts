
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth"


export async function POST(req: NextRequest, res: NextResponse) {
    const session: any = await getServerSession(authOptions as any)

    const { id: postId } = await req.json()
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


    // postun likesCount'una 1 ekleyip, activeUser'ın likedPosts'una postId'yi ekliyoruz

    const post = await prisma.post.update({
        where: {
            id: postId
        },
        // eger likescount  oncekı degerı null ıse 0 al yoksa hata verır
        data: {
            likesCount: {
                increment: 1
            }
        }
    })

    // EGER DAHA ONCE EKLENDIYSE TEKRAR EKLEME  
    if (activeUser.likedPosts.includes(postId)) {
        return NextResponse.json({ message: "Post already liked" }, { status: 200 });
    }

    await prisma.user.update({
        where: {
            id: activeUser.id
        },
        data: {
            likedPosts: {
                set: [...activeUser.likedPosts, postId]
            }
        }
    })

    // bir kullanıcı bir repoyu begendıyse o kullanıcıyı takıp edenler o kullanıcının onu begendıgı bıldırımı gıtmelı 
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
                type: 'like',
                userId: follower.id,
                actionById: session?.id,
                content: ` ${session?.username} liked  the post named ${post.title}.`,
                postId: postId,
            },
        });
    });

    await Promise.all(notificationPromises);



    return NextResponse.json({ message: "Post liked" }, { status: 200 });


}