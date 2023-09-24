import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

    return (
        <div className={styles.container}>
            <p>demo payment gateway</p>
            <p>payment gateway</p>

            <p>payment links</p>

            <p>payment pages</p>

            <p>QR codes</p>

            <button onClick={() => router.push("/signup")}>Signup</button>
            <button onClick={() => router.push("/login")}>Login</button>
        </div>
    );
}
