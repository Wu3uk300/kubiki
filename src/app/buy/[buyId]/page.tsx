import NavBar from "@/components/NavBar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import styles from "@/styles/BuyPage.module.css";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import prisma from "@/prisma";

async function Buy({ params }: { params: { buyId: string } }) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  const isLoggedIn = await isAuthenticated();
  const redirectRoom = parseInt(params.buyId);

  let redirectExact = 0;

  if (redirectRoom <= 320) {
    redirectExact = 1;
  } else if (redirectRoom > 320 && redirectRoom <= 641) {
    redirectExact = 2;
  } else if (redirectRoom > 641 && redirectRoom <= 960) {
    redirectExact = 3;
  }

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const buyNumber = parseInt(params.buyId);

  const changeForm = async (formData: FormData) => {
    "use server";

    const mainContent = formData.get("mainText");
    const additionalContent = formData.get("additionalText");
    const selectContent = formData.get("selectPublic");
    let booleanContent;

    if (selectContent === "no") {
      booleanContent = false;
    } else {
      booleanContent = true;
    }

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
  };

  return (
    <div>
      <NavBar />

      <div className={styles.container}>
        <div className={styles.backBtn}>
          <BackButton />
        </div>

        <div className={styles.wholeContent}>
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
