import NavBar from "@/components/NavBar";
import { PrismaClient } from "@prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import styles from "@/styles/BuyPage.module.css";
import { join } from "path";
import { writeFile } from "fs/promises";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
  }
  prisma = globalThis.prisma;
}

async function Buy({ params }: { params: { buyId: string } }) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  const isLoggedIn = await isAuthenticated();
  const redirectRoom = parseInt(params.buyId);

  let redirectExact = 0;

  if (redirectRoom <= 9) {
    redirectExact = 1;
  } else if (redirectRoom > 9 && redirectRoom <= 18) {
    redirectExact = 2;
  } else if (redirectRoom > 18 && redirectRoom <= 27) {
    redirectExact = 3;
  }

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const buyNumber = parseInt(params.buyId);

  const userId = await prisma.counter.findUnique({
    where: {
      User: user?.id,
    },
  });

  if (userId === null) {
    await prisma.counter.create({
      data: {
        User: user?.id as string,
        Counter: 0,
      },
    });
  }

  const changeForm = async (formData: FormData) => {
    "use server";
    const counter = await prisma.counter.findUnique({
      where: {
        User: user?.id,
      },
    });
    const counterNumber = counter?.Counter as number;
    const mainContent = formData.get("mainText");
    const additionalContent = formData.get("additionalText");
    const selectContent = formData.get("selectPublic");
    let booleanContent;

    if (selectContent === "no") {
      booleanContent = false;
    } else {
      booleanContent = true;
    }

    const file: File | null = formData.get("file") as unknown as File;
    if (!file) {
      await prisma.square.update({
        where: { id: buyNumber },
        data: {
          availability: false,
          content: mainContent as string,
          addContent: additionalContent as string,
          owner: user?.id as string,
          public: booleanContent,
          ownerName: user?.given_name,
        },
      });
      redirect(`/room/${redirectExact}`);
    } else {
      await prisma.counter.update({
        where: { User: user?.id },
        data: { Counter: counterNumber + 1 },
      });
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      let dataType;

      if (file.type === "image/png" || file.type === "image/jpeg") {
        dataType = "png";
      }
      const fileName = `${user?.id}_${params.buyId}_${counterNumber}.${dataType}`;

      const path = join(
        "D:",
        "tslern",
        "kubiki",
        "src",
        "images",
        "userFiles",
        fileName
      );
      await writeFile(path, buffer);

      await prisma.square.update({
        where: { id: buyNumber },
        data: {
          availability: false,
          content: mainContent as string,
          addContent: additionalContent as string,
          owner: user?.id as string,
          public: booleanContent,
          ownerName: user?.given_name,
        },
      });
      redirect(`/room/${redirectExact}`);
    }
  };

  return (
    <div>
      <NavBar />

      <div className={styles.container}>
        <div className={styles.backBtn}>
          <BackButton />
        </div>

        <div className={styles.wholeContent}>
          {" "}
          <div className={styles.header}>Заполните пожалуйста поля</div>
          <div className={styles.dataFields}>
            <form action={changeForm}>
              <label>Напишите текст, который вы хотите сохранить:</label>
              <br />
              <input
                className={styles.mainTextInput}
                name="mainText"
                maxLength={100}
              />
              <br />
              <br />
              <label>
                Напишите второстепенный текст, который вы хотите сохранить, но
                который не будет показан на главной странице:
              </label>
              <br />
              <textarea
                className={styles.additionalTextInput}
                name="additionalText"
                maxLength={30000}
              />
              <br />
              <br />
              <label>
                Выберите файл, фото или видео которые вы хотите хранить
              </label>
              <br />
              <input className={styles.fileInput} type="file" name="file" />
              <br />
              <br />
              <label>
                Хотите ли вы сделать кубик доступным всем для просмотра?
              </label>
              <select
                className={styles.selector}
                name="selectPublic"
                defaultValue="Да"
              >
                <option value="yes">Да</option>
                <option value="no">Нет</option>
              </select>
              <br />
              <br />
              <button className={styles.SbmtBtn}>Создать</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Buy;
