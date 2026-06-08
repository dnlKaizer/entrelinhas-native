import { BackButton } from "@/components/BackButton";
import { BookForm } from "@/components/BookForm";
import { useAuth } from "@/hooks/useAuth";
import { useBook } from "@/hooks/useBook";
import { IBookInsert, IBookUpdate } from "@/types/book.types";
import { YStack } from "tamagui";

export default function New() {
    const { user } = useAuth();
    const { insertBook } = useBook();

    const handleSubmit = async (book: IBookInsert | IBookUpdate) => {
        if (!user) throw new Error("Usuário não autenticado");

        const payload: IBookInsert = {
            ...(book as IBookInsert),
            idUsuario: user.id,
        };

        // Chama a mutation que salvará no banco e atualizará o cache automaticamente
        await insertBook(payload);
    };

    return (
        <YStack flex={1} backgroundColor="$background" position="relative">
            {/* Botão de Voltar */}
            <BackButton isRight />
            <BookForm
                onSubmit={handleSubmit}
            />
        </YStack>
    );
}