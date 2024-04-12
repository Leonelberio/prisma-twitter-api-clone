import prisma from "@/lib/prisma";
import { connectToDb } from "@/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request, {params}: {params: {id: string}}) {
    try {
        await connectToDb();
        const tweet = await prisma.tweets.findFirst({where : {id: params.id}});
        return NextResponse.json({tweet}, {status: 200})
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})        
    }finally {
        await prisma.$disconnect();
    }
}


export async function PUT(req: Request, {params}: {params: {id: string}}) {
    try {
        const {tweet} = await req.json()
        await connectToDb();
        const updatedTweet = await prisma.tweets.update({data: {tweet}, where: {id: params.id}});
        return NextResponse.json({tweet}, {status: 200})
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})        
    }finally {
        await prisma.$disconnect();
    }
}



export async function DELETE(req: Request, {params}: {params: {id: string}}) {
    try {
        const {tweet} = await req.json()
        await connectToDb();
        const updatedTweet = await prisma.tweets.delete({where: {id: params.id}});
        return NextResponse.json({tweet}, {status: 200})
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})        
    }finally {
        await prisma.$disconnect();
    }
}