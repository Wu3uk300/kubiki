import styles from "@/styles/AboutPage.module.css";
import logo from "@/images/Kubiki.jpg";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <div>
      <div className={styles.container}>
        <NavBar />
        <div className={styles.logoPart}>
          <Image
            className={styles.logo}
            width={150}
            height={150}
            src={logo}
            alt="logo"
          />
        </div>
        <div className={styles.aboutText}>
          <div className={styles.about1}>
            Добро пожаловать на наш сайт — уникальную платформу для хранения и
            дележа ваших самых ценных вещей и воспоминаний! Мы предлагаем вам
            купить место в нашей виртуальной ячейке, где вы сможете разместить
            все, что вам дорого или важно. Будь то личные документы, фотографии,
            заметки или даже публичные сообщения и изображения — все это будет
            надежно храниться и доступно для других пользователей, если вы того
            захотите.
          </div>

          <br />
          <div className={styles.about2}>
            Наши ячейки предоставляют не только пространство для хранения, но и
            возможность делиться своими мыслями и творениями с миром. Вы можете
            создать личное хранилище для своих данных или сделать ваши записи
            доступными для всех. Мы обеспечиваем высокий уровень защиты и
            конфиденциальности для частных данных и удобные инструменты для
            публичного размещения контента.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
