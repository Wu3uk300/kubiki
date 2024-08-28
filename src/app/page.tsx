import Image from "next/image";
import styles from "../styles/HomePage.module.css";
import logo from "../images/Kubiki.jpg";
import Link from "next/link";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (isLoggedIn) {
    redirect("/room/1");
  }
  return (
    <div className={styles.container}>
      <div className={styles.leftPart}>
        <div>
          <Image width={200} height={200} src={logo} alt="Logo" />
        </div>
        <div data-testid="headerDiv" className={styles.subHeader}>
          Ваше пространство для воспоминаний, ценностей и идей
        </div>
      </div>
      <div className={styles.rightPart}>
        <LoginLink>Войти</LoginLink>
        <Link href="/room/1">Продолжить как гость</Link>
      </div>
    </div>
  );
}
