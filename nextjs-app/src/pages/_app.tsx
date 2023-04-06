import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Noto_Sans_JP } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";

const notoSans = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const theme = createTheme({
  palette: {
    primary: { main: "#f42f35" },
    secondary: { main: "#2e5dc8" },
    error: { main: "#e32a30" },
    warning: { main: "#fdb768" },
    link: { main: "#4a90e2", contrastText: "#fff" },
    success: { main: "#45c92d" },
    info: { main: "#2abaaa" },
    border: { main: "#808080", contrastText: "#fff" },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Nextjs app</title>
        <meta name="description" content="you can customize by programming" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" href="/">
              トップページへ
            </Button>
          </Typography>
          <Link href="/">
            <Image src="/logo.png" width={197} height={50} alt="adhack" />
          </Link>
        </Toolbar>
      </AppBar>
      <Container className={notoSans.className} component="main">
        <Component {...pageProps} />
      </Container>
    </>
  );
}
