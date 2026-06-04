import { Header } from "@/components/Header";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack
      screenOptions = {{header: () => <Header />}}
    >
      <Stack.Screen name="home" options={{ title: "Meus Livros" }} />
      <Stack.Screen name="books/[id]" options={{ title: "Detalhe do Livro" }} />
    </Stack>
  );
}
