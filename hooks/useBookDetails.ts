import { AuthContext } from "@/providers/AuthProvider";
import { bookService } from "@/services/books.service";
import { IBook } from "@/types/book.types";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext } from "react";

export function useBookDetails(id: number) {
    const queryClient = useQueryClient();
    const { user } = useContext(AuthContext);

    return useQuery({
        queryKey: ['book', id],
        queryFn: () => bookService.findById(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 10,

        // O SEGREDO ESTÁ AQUI:
        initialData: () => {
            const booksCache = queryClient.getQueryData<IBook[]>(['books', user?.id]);
            return booksCache?.find((b) => b.idLivro === id);
        },

        // Garante que o React Query entenda que o dado inicial veio de um cache anterior
        initialDataUpdatedAt: () => queryClient.getQueryState(['books', user?.id])?.dataUpdatedAt,
    });
}