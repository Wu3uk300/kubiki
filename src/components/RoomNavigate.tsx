import styles from "@/styles/RoomNavigate.module.css";
import Link from "next/link";
import { useState } from "react";

const RoomNavigate = ({ params }: { params: { roomId: string } }) => {
  return (
    <div className={styles.container}>
      <div className={styles.rooms}>
        <Link className={styles.roomLink} href={"/room/1"}>
          <div
            className={
              params.roomId === "1" ? styles.activeRoom : styles.unactiveRoom
            }
          >
            Комната номер 1
          </div>
        </Link>
        <Link className={styles.roomLink} href={"/room/2"}>
          <div
            className={
              params.roomId === "2" ? styles.activeRoom : styles.unactiveRoom
            }
          >
            Комната номер 2
          </div>
        </Link>
        <Link className={styles.roomLink} href={"/room/3"}>
          <div
            className={
              params.roomId === "3" ? styles.activeRoom : styles.unactiveRoom
            }
          >
            Комната номер 3
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RoomNavigate;
