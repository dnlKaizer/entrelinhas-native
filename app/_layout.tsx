import { ProtectedLayout } from "@/components/ProtectedLayout";
import { AuthProvider } from "@/providers/AuthProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { useFonts } from "expo-font";

import "../styles.css";
import lobsterFont from "../assets/fonts/Lobster-Regular.ttf";

export default function RootLayout() {
  useFonts({
    lobster: lobsterFont,
  });

  return (
    <ThemeProvider>
      <AuthProvider>
        <ProtectedLayout />
      </AuthProvider>
    </ThemeProvider>
  );
}
