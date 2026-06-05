import { ProtectedLayout } from "@/components/ProtectedLayout";
import { AuthProvider } from "@/providers/AuthProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { useFonts } from "expo-font";
import Head from "expo-router/head";
import "../styles.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { YStack } from "tamagui";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { queryClient } from "@/lib/react-query/client";
import { persister } from "@/lib/react-query/adapter";

export default function RootLayout() {
  useFonts({
    'Lobster': require("../assets/fonts/Lobster-Regular.ttf"),
  });

  return (
    <ThemeProvider>
      <AuthProvider>
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
          <Head>
            <title>Entrelinhas</title>
            <meta name="description" content="Gerencie sua coleção de livros com o Entrelinhas!" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <YStack backgroundColor="$background" style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
              <ProtectedLayout />
            </SafeAreaView>
          </YStack>
        </PersistQueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
