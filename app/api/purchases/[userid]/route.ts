import { prisma } from "@/app/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request,
    {params}:{params:{userId: string}}
) {
    const userId = params.userId
    try{
        const purchases = await prisma.purchase.findMany({
            where: {userId: userId}
        });
        return NextResponse.json(purchases);
    } catch(err) {
        return NextResponse.json(err);
    }
}