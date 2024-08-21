import styles from "@/styles/Mapper.module.css";
import Square from "./Square";
import { PrismaClient } from "@prisma/client";
import prisma from "@/prisma";

const Mapper = async ({ params }: { params: { roomId: string } }) => {
  const roomNumber = parseInt(params.roomId);
  const data = await prisma.square.findMany({
    where: {
      room: roomNumber,
    },
    orderBy: {
      id: "asc",
    },
  });

  return (
    <div className={styles.container}>
      {data.map((item) => (
        <div key={item.id}>{<Square info={item} />}</div>
      ))}
    </div>
  );
};

export default Mapper;
