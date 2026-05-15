import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ title: "Meus Livros" }} />
      <Stack.Screen name="books/[id]" options={{ title: "Detalhe do Livro" }} />
    </Stack>
  );
}
