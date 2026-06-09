import { BookList } from "@/components/BookList";
import { globalStyles } from "@/constants/global-styles";
import { useBooks } from "@/hooks/useBooks";
import { H2, Paragraph, ScrollView, YStack, Spinner } from "tamagui";

export default function HomePage() {
  const { data, isLoading, error } = useBooks(); // Hook para buscar os livros do usuário

  if (isLoading) {
    return (
      <YStack padding="$4" backgroundColor="$background" gap="$4" style={globalStyles.centerContainer}>
        <H2 fontWeight="bold">Carregando sua biblioteca...</H2>
        <Spinner size="large" color="$primary" />
      </YStack>
    );
  }

  return (
    <ScrollView backgroundColor="$background">
      <YStack padding="$4" gap="$4" style={globalStyles.centerContainer}>
        {error && (
          <YStack backgroundColor="$yellow5" padding="$2" alignItems="center">
            <Paragraph color="$yellow11" size="$2">
              Você está offline. Exibindo dados salvos localmente.
            </Paragraph>
          </YStack>
        )}
        {data && (<>
            <H2 fontWeight="bold">Minha Biblioteca</H2>
            <BookList books={data.readingBooks} type="Lendo" />
            <BookList books={data.wishedBooks} type="Desejado" />
            <BookList books={data.readBooks} type="Lido" />
          </>)
        }
      </YStack>
    </ScrollView>
  );
}
