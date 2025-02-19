import prisma from "@/lib/prisma";
import { connectToDb } from "@/utils";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
    try {
        const { name, email, password}  = await req.json()

        if (!name && !email && !password ) {
            return NextResponse.json({error: "Invalid Data"}, {status: 422})
        }
        await connectToDb();
        const existingUser = await prisma.user.findFirst({where: {email}})

        if (existingUser) {
            return NextResponse.json({message: "User already registered, please Login"}, {status: 201})

        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({data : {name, email, password: hashedPassword}});
        return NextResponse.json({user}, {status: 201})
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})        
    }finally {
        await prisma.$disconnect();
    }
}

