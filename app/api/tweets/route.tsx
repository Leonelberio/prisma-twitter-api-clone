import prisma from "@/lib/prisma";
import { connectToDb } from "@/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        await connectToDb();
        const tweets = await prisma.tweets.findMany();
        return NextResponse.json({tweets}, {status: 200})
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})        
    }finally {
        await prisma.$disconnect();
    }
}


export async function POST(req: Request) {
    try {
        const { tweet, userId}  = await req.json()

        if (!tweet && !userId ) {
            return NextResponse.json({error: "Invalid Data"}, {status: 422})
        }
        await connectToDb();
        
        const user = await prisma.user.findFirst({where : {id: userId}});

        if (!user) {
            return NextResponse.json({message: "Invalid user"}, {status: 403})
        
        }

        const newTweet = await prisma.tweets.create({data : {tweet, userId}});

        return NextResponse.json({tweet: newTweet}, {status: 201})        
        
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})        
    }finally {
        await prisma.$disconnect();
    }
}

