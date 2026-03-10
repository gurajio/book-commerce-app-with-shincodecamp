import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
// 購入履歴の保存
export async function POST(request:Request){
    const { sessionId } = await request.json();

    try{
        // 購入時のメタデータとかの取得が可能になっている
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        const existingPurchase = await prisma.purchase.findFirst({
            where: {
                userId: session.client_reference_id!,
                bookId: session.metadata?.bookId!
            }
        })

        if(!existingPurchase){
            // prismaで保存するための記述
            const purchase = await prisma.purchase.create({
                // sessionのmetadata,client_reference_idなどを利用する
                data: {
                    userId: session.client_reference_id!,
                    bookId: session.metadata?.bookId!,
                }
            })
            return NextResponse.json({ purchase })
        } else {
            return NextResponse.json({ message: "すでに購入済みです" });
        }
    } catch(err) {
        return NextResponse.json(err);
    }
}
