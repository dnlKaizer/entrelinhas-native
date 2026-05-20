import { ProtectedLayout } from "@/components/ProtectedLayout";
import { AuthProvider } from "@/providers/AuthProvider";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProtectedLayout />
    </AuthProvider>
  );
}
