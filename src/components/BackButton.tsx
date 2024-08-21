"use client";
import { useRouter } from "next/navigation";
import styles from "@/styles/BackButton.module.css";

const BackButton = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <button onClick={handleBack} className={styles.backBtn}>
      Назад
    </button>
  );
};

export default BackButton;
