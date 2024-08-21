import styles from "@/styles/NavBar.module.css";
import Image from "next/image";
import logo from "@/images/Kubiki.jpg";
import Link from "next/link";
import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

const NavBar = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  const user = await getUser();

  return (
    <div className={styles.nav}>
      <div className={styles.logoPart}>
        <Link href="/room/1">
          <Image layout="fixed" src={logo} alt="logo" width={60} height={60} />
        </Link>
      </div>
      <div className={styles.rightPart}>
        <div>
          <Link href="/room/1">Комнаты</Link>
        </div>
        <div>
          <Link href="/yoursquare">Ваши кубики</Link>
        </div>
        <div>
          <Link href="/about">Про сайт</Link>
        </div>
        <div>
          {isLoggedIn ? (
            <LogoutLink>Выйти</LogoutLink>
          ) : (
            <LoginLink>Войти</LoginLink>
          )}
        </div>
        <div className={styles.userInfo}>
          {isLoggedIn ? (
            <div>
              {user?.picture ? (
                <div className={styles.userPic}>
                  <Image
                    src={user.picture}
                    alt="Image"
                    width={60}
                    height={60}
                  />
                </div>
              ) : (
                <div className={styles.noPicture}>{user?.given_name?.[0]}</div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
