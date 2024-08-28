import NavBar from "@/components/NavBar";
import styles from "@/styles/YourSquares.module.css";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/types/server";
import { redirect } from "next/navigation";
import Square from "@/components/Square";
import Link from "next/link";
import Footer from "@/components/Footer";
import prisma from "@/prisma";

const yourSquare = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  const user = await getUser();
  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }
  const data = await prisma.square.findMany({
    where: {
      owner: user?.id,
    },
    orderBy: {
      id: "asc",
    },
  });
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.allContent}>
        {data.length === 0 ? (
          <div className={styles.noSquares}>
            <div className={styles.header}>У вас пока нет кубиков</div>
            <div className={styles.noSqauresBtn}>
              <Link style={{ color: "white" }} href="/room/1">
                Купить квадрат
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.header}>Ваши кубики:</div>
            <div className={styles.content}>
              {data.map((item) => (
                <div key={item.id}>{<Square info={item} />}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default yourSquare;
