import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth"



export async function GET(req: NextRequest, res: NextResponse) {
    const session: any = await getServerSession(authOptions as any)

    if (!session) {
        const users = await prisma.user.findMany()
        const recommendedUsers = users.sort(() => Math.random() - 0.5).slice(0, 3).map((user) => {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                image: user.image,
                info: user.info
            }
        })
        return NextResponse.json(recommendedUsers)
    }

    const activeUser = await prisma.user.findFirst({
        where: {
            email: session.email
        }
    })

    const users = await prisma.user.findMany({
        where: {
            NOT: {
                id: activeUser?.id
            }
        }
    })

    const filteredUsers = users.filter((user) => !activeUser?.followingIDs.includes(user.id))


    const recommendedUsers = filteredUsers.sort(() => Math.random() - 0.5).slice(0, 3).map((user) => {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            image: user.image,
            info: user.info
        }
    })



    return NextResponse.json(recommendedUsers)

}







export async function POST(req: NextRequest, res: NextResponse) {

    const session: any = await getServerSession(authOptions as any)


    if (!session) {
        return NextResponse.redirect('/login')
    }

    const { id } = await req.json()


    const activeUser = await prisma.user.findFirst({
        where: {
            email: session.email
        }
    })
    const targetUser = await prisma.user.findFirst({
        where: {
            id: id
        }
    })

    if (!targetUser) {
        return NextResponse.json({
            "Kullanıcı bulunamadı ": id
        })
    }


    if (activeUser?.followingIDs.includes(targetUser?.id)) {
        console.log("TAKİPTEN CIKARIYORUZ ")

        await prisma.user.update({
            where: {
                email: session.email
            },
            data: {
                following: {
                    disconnect: {
                        id: targetUser?.id
                    }

                }
            }
        })
        await prisma.user.update({
            where: {
                id: targetUser?.id
            },
            data: {
                followers: {
                    disconnect: {
                        id: activeUser?.id
                    }
                }
            }
        })


        return NextResponse.json({
            "followersLenght": targetUser?.followersIDs.length - 1
        });


    }
    else {
        console.log("TAKİBE ALIYORUZ")
        await prisma.user.update({
            where: {
                email: session.email
            },
            data: {
                following: {
                    connect: {
                        id: targetUser?.id
                    }
                }

            }
        })
        await prisma.user.update({
            where: {
                id: targetUser?.id
            },
            data: {
                followers: {
                    connect: {
                        id: activeUser?.id
                    }
                }
            }
        })

        // burda notification eklicez active olan kullanıcının takıp ettıgı kısıye bu senı takıp edıyor dıcez ingilizce

        await prisma.notification.create({
            data: {
                content: `${activeUser?.username} is started following you.`,
                type: "follow",
                userId: targetUser?.id,
                actionById: activeUser?.id
            }
        })


        return NextResponse.json({
            "followersLenght": targetUser?.followersIDs.length + 1
        });
    }



}