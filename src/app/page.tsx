import Image from "next/image";
import styles from "../styles/HomePage.module.css";
import logo from "../images/Kubiki.jpg";
import Link from "next/link";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
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
