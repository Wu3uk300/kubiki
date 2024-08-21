import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Этот файл необходим для расширения глобального пространства имён.
export {};
