"use client";
import styles from "@/styles/Square.module.css";
import Link from "next/link";
import gif from "@/images/icons8-wallet.gif";
import pic from "@/images/icons8-wallet-50.png";
import Image from "next/image";
import { useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { handleDelete } from "@/actions/handleDelete";
import padlock from "@/images/icons8-sperren-50.png";

interface SquareProps {
  info: {
    id: number;
    room: number;
    availability: boolean;
    content: string | null;
    public: boolean;
    owner: string | null;
    addContent: string | null;
    ownerName: string | null;
    updatedAt: Date | null;
  };
}

const Square = ({ info }: SquareProps) => {
  const updateUserWithId = handleDelete.bind(null, info.id);
  const [anim, setAnim] = useState(false);
  let perm = "";
  const { getPermissions, getUser } = useKindeBrowserClient();
  const { permissions } = getPermissions();
  const user = getUser();

  if (Array.isArray(permissions)) {
    perm = permissions[0];
  }

  const maxLength = 500;

  const truncateText = (text: string | null) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return info.availability === true ? (
    <div className={styles.squareParams}>
      <Link className={styles.squareLink} href={`/buy/${info.id}`}>
        <div
          onMouseEnter={() => setAnim(true)}
          onMouseLeave={() => setAnim(false)}
          className={styles.squareAvailable}
        >
          <div className={anim ? styles.isAvailableActive : styles.isAvailable}>
            Кубик свободен, его можно купить
          </div>

          <div>
            {anim ? (
              <Image src={gif} alt="gif" width={50} height={50}></Image>
            ) : (
              <Image src={pic} alt="pic" width={50} height={50}></Image>
            )}
          </div>
        </div>
      </Link>
    </div>
  ) : info.public === true ? (
    <div className={styles.squareParams}>
      {perm === "square:delete" || user?.id === info.owner ? (
        <div className={styles.deleteDiv}>
          <form action={updateUserWithId}>
            <button className={styles.deleteBtn}>Очистить</button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
      <Link href={`/square/${info.id}`}>
        <div
          className={
            user?.id === info.owner
              ? styles.yourSquare
              : styles.squareNotAvailable
          }
        >
          <div className={styles.contentText}>
            <div className={styles.contentHeader}>
              {truncateText(info.content)}
            </div>
            <div className={styles.contentAddText}>
              {truncateText(info.addContent)}
            </div>
          </div>
        </div>
      </Link>
    </div>
  ) : (
    <div className={styles.squareParams}>
      {perm === "square:delete" || user?.id === info.owner ? (
        <div className={styles.deleteDiv}>
          <form action={updateUserWithId}>
            <button className={styles.deleteBtn}>Очистить</button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
      <Link href={`/square/${info.id}`}>
        <div
          className={
            user?.id === info.owner ? styles.yourSquare : styles.squareNotPublic
          }
        >
          {user?.id === info.owner || perm === "square:delete" ? (
            <div className={styles.contentText}>
              <div className={styles.contentHeader}>
                {truncateText(info.content)}
              </div>
              <div className={styles.contentAddText}>
                {truncateText(info.addContent)}
              </div>
            </div>
          ) : (
            <div className={styles.privateNotAvaliable}>
              <Image
                className={styles.padlock}
                src={padlock}
                width={50}
                height={50}
                alt="padlock"
              ></Image>
              <div className={styles.privateText}>
                Этот кубик занят, но его содержимое доступно только владельцу!
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Square;
