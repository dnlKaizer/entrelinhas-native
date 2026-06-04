import { ProtectedLayout } from "@/components/ProtectedLayout";
import { AuthProvider } from "@/providers/AuthProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { useFonts } from "expo-font";
import Head from "expo-router/head";

import "../styles.css";
import lobsterFont from "../assets/fonts/Lobster-Regular.ttf";

export default function RootLayout() {
  useFonts({
    lobster: lobsterFont,
  });

  return (
    <ThemeProvider>
      <AuthProvider>
        <Head>
          <title>Entrelinhas</title>
          <meta name="description" content="Gerencie sua coleção de livros com o Entrelinhas!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <ProtectedLayout />
      </AuthProvider>
    </ThemeProvider>
  );
}
