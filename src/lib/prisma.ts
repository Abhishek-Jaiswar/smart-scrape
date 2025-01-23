import { PrismaClient } from "@prisma/client";

const prismaClientSignleton = () => {
  return new PrismaClient();
};

declare const globleThis: {
  prismaGlobal: ReturnType<typeof prismaClientSignleton>;
} & typeof global;

const prisma = globleThis.prismaGlobal ?? prismaClientSignleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globleThis.prismaGlobal = prisma;
