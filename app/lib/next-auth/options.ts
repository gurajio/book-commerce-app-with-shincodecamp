import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import { prisma } from "@/app/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const nextAuthOptions: NextAuthOptions = {
    debug: false,
    providers:[
        GithubProvider({
            // GITHUB_IDとSECRETがUndefinedの場合にclientIdなどに波線が出るから、「!」で回避
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    // prismaはインスタンス化したprismaを入れる
    adapter: PrismaAdapter(prisma),
    callbacks:{
        session:({session, user}) => {
            return{
                ...session,
                user:{
                    ...session.user,
                    id: user.id
                },
            };
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}