import { bookService } from "@/services/books.service";
import { useQuery } from '@tanstack/react-query';

export function useBookDetails(id: number) {
    return useQuery({
        // A chave inclui o ID, assim o cache de um livro não sobrescreve o de outro
        queryKey: ['book', id],
        queryFn: () => bookService.findById(id),
        enabled: !!id, // Só busca se o ID for válido
        staleTime: 1000 * 60 * 10, // 10 min de cache para detalhes
    });
}