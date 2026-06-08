import { router, useLocalSearchParams } from "expo-router";
import { BookForm } from "@/components/BookForm";
import { useBookDetails } from "@/hooks/useBookDetails";
import { useBook } from "@/hooks/useBook";
import { IBookInsert, IBookUpdate } from "@/types/book.types";
import { Spinner, YStack, Text, Button } from "tamagui";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft } from "@tamagui/lucide-icons-2";
import { BackButton } from "@/components/BackButton";

export default function EditBook() {
    const { id } = useLocalSearchParams();
    const { user } = useAuth();
    const bookId = Number(id);

    // Carrega os dados atuais do livro (obtidos instantaneamente via cache pelo useBookDetails)
    const { data: book, isLoading } = useBookDetails(bookId);
    const { updateBook } = useBook();

    const handleSubmit = async (formData: IBookInsert | IBookUpdate) => {
        if (!user) return;

        const payload: IBookUpdate = {
            ...(formData as IBookUpdate),
            idUsuario: user.id,
        };
        // Envia o ID correspondente e os dados modificados para a mutation do cache
        await updateBook({
            id: bookId,
            data: payload
        });
    };

    if (isLoading) {
        return (
            <YStack flex={1} justifyContent="center" alignItems="center">
                <Spinner size="large" color="$blue9" />
                <Text marginTop="$2">Carregando dados do livro...</Text>
            </YStack>
        );
    }

    return (
        <YStack flex={1} backgroundColor="$background" position="relative">
            {/* Botão de Voltar */}
            <BackButton isRight />
            <BookForm
                book={book}
                onSubmit={handleSubmit}
            />
        </YStack>
    );
}