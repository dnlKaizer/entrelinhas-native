import { ProtectedLayout } from "@/components/ProtectedLayout";
import { AuthProvider } from "@/providers/AuthProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProtectedLayout />
      </AuthProvider>
    </ThemeProvider>
  );
}
