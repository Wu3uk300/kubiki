import NavBar from "@/components/NavBar";
import styles from "@/styles/Room.module.css";
import Mapper from "@/components/Mapper";
import RoomNavigate from "@/components/RoomNavigate";
import Footer from "@/components/Footer";

function Room({ params }: { params: { roomId: string } }) {
  return (
    <div className={styles.container}>
      <NavBar />
      <RoomNavigate params={params} />
      <div className={styles.header}>Комната {params.roomId}</div>
      <div
        className={styles.mapper}
        style={{ marginBottom: 80, minHeight: "100vh" }}
      >
        <Mapper params={params} />
      </div>
      <Footer />
    </div>
  );
}

export default Room;
