import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Pencil, Trash2, Share2, BookOpen, Calendar, Layers, Trophy } from '@tamagui/lucide-icons';
import { YStack, XStack, Text, Image, Button, ScrollView, Progress, Spinner } from 'tamagui';

import { useBookDetails } from '@/hooks/useBookDetails';

import { IBook } from '@/types/book.types';

import placeholderImg from '@/assets/images/placeholder.png';

import { BookMetadataCard } from '@/components/BookMetadataCard';

export default function BookDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const bookId = Number(id);

  const { data, isLoading, isError, error } = useBookDetails(bookId);

  const book = data as IBook;

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="#1e293b">
        <Spinner size="large" color="$blue10" />
        <Text marginTop="$2" color="$colorMuted">Carregando detalhes do livro...</Text>
      </YStack>
    );
  }

  if (isError || !book) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="#1e293b" paddingHorizontal="$4" gap="$3">
        <Text fontSize="$6" fontWeight="bold" color="$red10">Ocorreu um erro</Text>
        <Text color="$colorMuted" textAlign="center">
          {error instanceof Error ? error.message : "Não foi possível carregar os dados deste livro."}
        </Text>
        <Button onPress={() => router.back()} marginTop="$2">Voltar</Button>
      </YStack>
    );
  }

  const urlDaCapa = book.img
    ? `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/covers/${book.img}`
    : placeholderImg;

  const paginasLidas = book.numPagRead || 0;
  const totalPaginas = book.numPag || 1;
  const progressoPorcentagem = Math.min(Math.round((paginasLidas / totalPaginas) * 100), 100);


  return (
    <YStack flex={1} backgroundColor="#1e293b" position="relative">
      {/* Botão de Voltar */}
      <Button
        icon={ArrowLeft}
        position="absolute"
        top="$4"
        left="$4"
        circular
        size="$4"
        elevate
        zIndex={100} // Garante que ele fique por cima de tudo ao rolar
        onPress={() => router.back()}
        backgroundColor="$background"
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
              source={urlDaCapa}
              style={{ width: 220, height: 300, borderRadius: 12 }}
              objectFit="cover"
            />
          </YStack>

          {/* Títulos Dinâmicos */}
          <YStack alignItems="center" gap="$2" marginTop="$2">
            <Text fontSize="$8" fontWeight="bold" textAlign="center" color="$color">
              {book.nome}
            </Text>
            <Text fontSize="$5" color="$colorMuted" textAlign="center">
              {book.autor || "Autor desconhecido"}
            </Text>
          </YStack>

          {/* Status */}
          {book.status && (
            <Button size="$2" alignSelf="center" disabled backgroundColor="$blue4" borderColor="$blue7" color="$blue10" borderRadius="$4">
              {book.status}
            </Button>
          )}

          {/* Barra de Progresso Dinâmica */}
          <YStack gap="$2" marginVertical="$2" paddingHorizontal="$4">
            <XStack justifyContent="space-between" alignItems="center">
              <Progress value={progressoPorcentagem} max={100} flex={1} marginRight="$3" size="$2">
                <Progress.Indicator animation="lazy" backgroundColor="$blue10" />
              </Progress>
              <Text fontSize="$3" fontWeight="bold" color="$colorMuted">{progressoPorcentagem}%</Text>
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
                icon={<Trophy size={16} color="$green10" />} // Um destaque verde para a conquista!
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

          {/* Ações */}
          <YStack gap="$3" marginTop="$4" paddingHorizontal="$2">
            <XStack gap="$3">
              <Button theme="blue" icon={Pencil} flex={1} fontWeight="bold">
                Editar
              </Button>
              <Button theme="red" icon={Trash2} variant="outlined" flex={1} fontWeight="bold">
                Excluir
              </Button>
            </XStack>

            <Button icon={Share2} variant="outlined" fontWeight="bold">
              Compartilhar livro
            </Button>
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
}