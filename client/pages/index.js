import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import PrimaryButton from "../components/primaryButton";
import { Box } from "@mui/material";

export default function Home() {
    const router = useRouter();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box height={40} />
            <p>PayPretend (Mock Payment Gateway)</p>
            <Box height={50} />

            <PrimaryButton
                text="Signup"
                onClick={() => router.push("/signup")}
            />
            <Box height={30} />
            <PrimaryButton text="Login" onClick={() => router.push("/login")} />
        </Box>
    );
}
