import NavBar from "@/components/NavBar";
import { PrismaClient } from "@prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import styles from "@/styles/SquarePage.module.css";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";

import prisma from "@/prisma";
async function Square({ params }: { params: { squareId: string } }) {
  const { getUser, getPermission } = getKindeServerSession();

  const user = await getUser();

  const perm = await getPermission("square:see");

  const squareNumber = parseInt(params.squareId);
  const data = await prisma.square.findUnique({
    where: {
      id: squareNumber,
    },
  });

  const words = data?.addContent?.split(" ").filter((word) => word !== "");

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.backBtn}>
        <BackButton />
      </div>

      <div className={styles.allInfo}>
        <div className={styles.content}>
          {data?.public ? (
            <div className={styles.square}>
              <div className={styles.header}>{data?.content}</div>
              <div className={styles.mainText}>{data?.addContent}</div>
            </div>
          ) : (
            <div>
              {data?.owner === user?.id || perm?.isGranted ? (
                <div>
                  <div className={styles.square}>
                    <div className={styles.header}>{data?.content}</div>
                    <div className={styles.mainText}>{data?.addContent}</div>
                  </div>
                </div>
              ) : (
                <div>
                  Владелец кубика сделал его приватным, вы не можете просмотреть
                  его содержимое.{" "}
                </div>
              )}
            </div>
          )}
        </div>
        {data?.public ||
          data?.owner === user?.id ||
          (perm?.isGranted && (
            <div className={styles.squareInfo}>
              <div className={styles.squareInfoContent}>
                <div className={styles.squareInfoHeader}>Информация:</div>

                <div className={styles.squareInfoOwner}>
                  <b> Владелец:</b> {data?.ownerName}
                </div>

                <div className={styles.squareInfoPublic}>
                  <b> Квадрат публичный:</b> {data?.public ? "Да" : "Нет"}
                </div>

                <div className={styles.squareInfoSymbols}>
                  <b> Кол-во символов:</b> {data?.addContent?.length}
                </div>

                <div className={styles.squareInfoWords}>
                  <b>Кол-во слов: </b>
                  {words?.length}
                </div>

                <div className={styles.squareInfoUpdatedAt}>
                  <b>Измененно:</b> {data?.updatedAt?.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default Square;
