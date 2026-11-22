import { PrismaClient } from "@prisma/client";
import { prismaOptions } from "./databaseUrl";

const prisma = new PrismaClient(prismaOptions());

export default prisma;
