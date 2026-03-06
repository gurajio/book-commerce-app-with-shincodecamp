// import { PrismaClient } from "@prisma/client"; 
// // import { PrismaClient } from '../generated/prisma/client';

// let prisma: PrismaClient;

// // ここでインスタンス化するのではなく、グローバルオブジェクトというのを使う
// // prisma = new PrismaClient();
// const globalForPrisma = global as unknown as {
//     prisma: PrismaClient | undefined;
// };
// // このようにしたら、生成時に一回だけPrismaインスタンス化して、それ以降はリロードしても存在している場合はインスタンス化されない

// // このように、もしglobalPrismaがなかった時のみ、新しくインスタンスを作成してあげればいい
// if(!globalForPrisma.prisma){
//     globalForPrisma.prisma = new PrismaClient();
// };

// prisma = globalForPrisma.prisma;

// export default prisma;

import "server-only";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL!, // Supabaseの接続文字列
        }),
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}