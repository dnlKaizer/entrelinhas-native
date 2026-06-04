import { BookList } from "@/components/BookList";
import { globalStyles } from "@/constants/global-styles";
import { useBooks } from "@/hooks/useBooks";
import { H2, ScrollView, YStack } from "tamagui";

export default function HomePage() {
  const { readBooks, readingBooks, wishedBooks, allBooks } = useBooks(); // Hook para buscar os livros do usuário

  return (
    <ScrollView>
      <YStack padding="$4" paddingBottom="$10" backgroundColor="$background" gap="$4" style={globalStyles.centerContainer}>
        <H2>Minha Biblioteca</H2>
        <BookList books={readingBooks} type="Lendo" />
        <BookList books={wishedBooks} type="Desejado" />
        <BookList books={readBooks} type="Lido" />
      </YStack>
    </ScrollView>
  );
}
