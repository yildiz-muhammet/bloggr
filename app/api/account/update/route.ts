import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { File } from 'buffer';
import prisma from "@/lib/prismadb";

const uploadDir = path.join(process.cwd(), 'public', 'images');


export async function POST(request: NextRequest, response: NextResponse) {
    const formData = await request.formData()
    const formDataArray = Array.from(formData.entries());

    const username = formDataArray.find((item) => item[0] === 'username') as any

    const email = formDataArray.find((item) => item[0] === 'email') as any

    const image = formDataArray.find((item) => item[0] === 'image') || null as any

    const info = formDataArray.find((item) => item[0] === 'info') as any

    const activeUserEmail = formDataArray.find((item) => item[0] === 'activeUserEmail') as any


    const currentDate = Date.now().toString()

    // const fileName = image && Date.now().toString() + '-' + image[1].name
    if (image !== null) {

        const bytes = await image[1].arrayBuffer()
        const buffer = Buffer.from(bytes)
        const filePath = path.join(uploadDir,
            currentDate + '-' + image[1].name
        )
        await fs.writeFile(filePath, buffer)
    }


    const updateUser = await prisma.user.update({
        where: {
            email: activeUserEmail[1]
        },
        data: {
            username: username[1],
            email: email[1],
            image: image ? currentDate + '-' + image[1].name : null,
            info: info[1]
        }
    })




    return NextResponse.json({
        message: 'Dosya yükleme başarılı!',
    });
};
