import { prisma } from "@/app/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: Request,
    context: {params:Promise<{userId: string}>}
) {
    const {userId} = await context.params
    try{
        const purchases = await prisma.purchase.findMany({
            where: {userId: userId}
        });
        return NextResponse.json(purchases);
    } catch(err) {
        return NextResponse.json(err);
    }
}