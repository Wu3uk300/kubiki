"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();
export async function handleDelete(id: number) {
  await prisma.square.update({
    where: {
      id: id,
    },
    data: {
      availability: true,
      content: "",
      addContent: "",
      public: true,
      owner: "",
    },
  });
  revalidatePath("/");
}
