import { ArrowLeft, BookOpen, Calendar, Layers, Loader, Pencil, Share2, Trash2, Trophy } from '@tamagui/lucide-icons-2';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, Progress, ScrollView, Spinner, Text, XStack, YStack } from 'tamagui';
import { useBookDetails } from '@/hooks/useBookDetails';
import { IBook } from '@/types/book.types';
import { BookMetadataCard } from '@/components/BookMetadataCard';
import { useBookCard } from '@/hooks/useBookCard';
import { Image } from 'expo-image';
import { useBook } from '@/hooks/useBook';

export default function BookDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const bookId = Number(id);

  const { data, isLoading, isError, error } = useBookDetails(bookId);
  const { deleteBook, isDeleting, error: bookError } = useBook();

  const book = data as IBook;

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$background">
        <Spinner size="large" color="$blue10" />
        <Text marginTop="$2" color="$colorMuted">Carregando detalhes do livro...</Text>
      </YStack>
    );
  }

  if (isError || !book) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$background" paddingHorizontal="$4" gap="$3">
        <Text fontSize="$6" fontWeight="bold" color="$red10">Ocorreu um erro</Text>
        <Text color="$colorMuted" textAlign="center">
          {error instanceof Error ? error.message : "Não foi possível carregar os dados deste livro."}
        </Text>
        <Button onPress={() => router.back()} marginTop="$2">Voltar</Button>
      </YStack>
    );
  }

  const { title, author, imgUri, progressPercentual, currentStatusTheme } = useBookCard(book);

  return (
    <YStack flex={1} backgroundColor="$background" position="relative">
      {/* Botão de Voltar */}
      <Button
        icon={ArrowLeft}
        position="absolute"
        top="$4"
        left="$4"
        circular
        size="$4"
        zIndex={100} // Garante que ele fique por cima de tudo ao rolar
        onPress={() => router.back()}
        backgroundColor="$background"
        aria-label="Voltar"
      />

      <ScrollView flex={1} contentContainerStyle={{ flexGrow: 1 }}>
        {/* <Button
        icon={ArrowLeft}
        position="absolute"
        top="$4"
        left="$4"
        circular
        size="$4"
        elevate
        zIndex={10}
        onPress={() => router.back()}
        backgroundColor="$background"
      /> */}

        {/* Container Centralizado */}
        <YStack
          flex={1}
          maxWidth={600}
          width="100%"
          alignSelf="center"
          backgroundColor="$background"
          paddingHorizontal="$5"
          paddingVertical="$6"
          gap="$4"
        >
          {/* Capa do Livro Dinâmica */}
          <YStack alignSelf="center" shadowColor="#000" shadowRadius={10} shadowOpacity={0.1}>
            <Image
              source={imgUri}
              style={{ width: 220, height: 300, borderRadius: 12 }}
              contentFit="cover"
              cachePolicy="disk"
              transition={100}
              accessibilityLabel={`Capa do Livro ${title}`}
            />
          </YStack>

          {/* Títulos Dinâmicos */}
          <YStack alignItems="center" gap="$2" marginTop="$2">
            <Text fontSize="$8" fontWeight="bold" textAlign="center" color="$color">
              {title}
            </Text>
            <Text fontSize="$5" color="$colorMuted" textAlign="center">
              {author}
            </Text>
          </YStack>

          {/* Status */}
          {book.status && (
            <Button
              size="$2"
              alignSelf="center"
              disabled
              {...currentStatusTheme}
              borderRadius="$4"
              aria-label={`Status do livro: ${book.status}`}
            >
              {book.status}
            </Button>
          )}

          {/* Barra de Progresso Dinâmica */}
          <YStack gap="$2" marginVertical="$2" paddingHorizontal="$4">
            <XStack justifyContent="space-between" alignItems="center">
              <Progress value={progressPercentual} max={100} flex={1} marginRight="$3" size="$2" aria-label="Progresso de Leitura">
                <Progress.Indicator backgroundColor="$blue10" />
              </Progress>
              <Text fontSize="$3" fontWeight="bold" color="$colorMuted">{progressPercentual}%</Text>
            </XStack>
          </YStack>

          {/* Metadados Responsivos */}
          <XStack
            justifyContent="center"
            alignItems="center"
            gap="$3"
            flexWrap="wrap"           
            paddingHorizontal="$2"
            marginVertical="$2"
            width="100%"
          >

            {/* 1. Total de Páginas (Sempre visível) */}
            <BookMetadataCard
              icon={<BookOpen size={16} color="$colorMuted" />}
              accessibilityLabel="Total de páginas"
            >
              {book.numPag} páginas
            </BookMetadataCard>

            {/* 2. Ano do Livro (Condicional) */}
            {book.ano && (
              <BookMetadataCard
                icon={<Layers size={16} color="$colorMuted" />}
                accessibilityLabel="Ano de publicação"
              >
                {book.ano}
              </BookMetadataCard>
            )}

            {/* 3. Data de Início (Condicional) */}
            {book.dtInicial && (
              <BookMetadataCard
                icon={<Calendar size={16} color="$colorMuted" />}
                accessibilityLabel="Data de início da leitura"
              >
                {new Date(String(book.dtInicial)).toLocaleDateString('pt-BR')}
              </BookMetadataCard>
            )}

            {/* 4. Data de Término (Condicional) */}
            {book.dtFinal && (
              <BookMetadataCard
                icon={<Trophy size={16} color="$green10" />} 
                accessibilityLabel="Data de término da leitura"
              >
                {new Date(String(book.dtFinal)).toLocaleDateString('pt-BR')}
              </BookMetadataCard>
            )}

          </XStack>

          <XStack borderBottomWidth={1} borderColor="$borderColor" marginVertical="$2" />

          {/* Descrição */}
          <Text fontSize="$4" lineHeight={22} color="$color" paddingHorizontal="$2" textAlign="justify">
            {book.text || "Nenhuma descrição ou anotação inserida para este livro."}
          </Text>

          {/* Erro */}
          {bookError && (
            <Text fontSize="$3" color="$red10" textAlign="center">
              {bookError}
            </Text>
          )}

          {/* Ações */}
          <YStack gap="$3" marginTop="$4" paddingHorizontal="$2">
            <XStack gap="$3">
              <Button
                theme="blue"
                onPress={() => router.push(`/books/${bookId}/edit`)}
                flex={1}
                fontWeight="bold"
                aria-label="Editar livro"
              >
                Editar
              </Button>
              <Button
                theme="red"
                icon={!isDeleting ? Trash2 : <Spinner />}
                onPress={() => deleteBook(bookId)}
                variant="outlined"
                flex={1}
                fontWeight="bold"
                aria-label="Excluir livro"
              >
                Excluir
              </Button>
            </XStack>

            <Button icon={Share2} variant="outlined" fontWeight="bold" aria-label="Compartilhar livro">
              Compartilhar livro
            </Button>
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
}