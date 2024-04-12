import prisma from "@/lib/prisma";
import { connectToDb } from "@/utils";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
    try {
        const { email, password}  = await req.json()

        if ( !email && !password ) {
            return NextResponse.json({error: "Invalid Data"}, {status: 422})
        }
        await connectToDb();
        const existingUser = await prisma.user.findFirst({where : {email}});
if (!existingUser) {
    return NextResponse.json({message: "User not exist"}, {status: 403})

}

const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

if (!isPasswordCorrect) {
    return NextResponse.json({message: "Invalid Password"}, {status: 403})

}

return NextResponse.json({message: "Logged in"}, {status: 200})

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})        
    }finally {
        await prisma.$disconnect();
    }
}

