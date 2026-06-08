import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { bookService } from "@/services/books.service";
import { IBook, IBookInsert, IBookUpdate } from "@/types/book.types";
import { AuthContext } from "@/providers/AuthProvider";

export function useBook() {
    const queryClient = useQueryClient();
    const { user } = useContext(AuthContext);

    // ─── MUTATION: INSERIR LIVRO ─────────────────────────────────────────────
    const insertMutation = useMutation({
        mutationFn: (newBook: IBookInsert) => bookService.create(newBook),
        onSuccess: (createdBook) => {
            // Sincroniza a lista geral de livros adicionando o novo item no cache
            queryClient.setQueryData<IBook[]>(['books', user?.id], (oldBooks) => {
                return oldBooks ? [createdBook, ...oldBooks] : [createdBook];
            });
            
            // Retorna para a tela anterior
            router.back();
        },
    });

    // ─── MUTATION: ATUALIZAR LIVRO ───────────────────────────────────────────
    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: IBookUpdate }) => 
            bookService.update(id, data),
        onSuccess: (updatedBook, variables) => {
            // 1. Atualiza o cache do livro individual específico
            queryClient.setQueryData(['book', variables.id], updatedBook);

            // 2. Sincroniza a lista geral, substituindo o livro antigo pelo editado
            queryClient.setQueryData<IBook[]>(['books', user?.id], (oldBooks) => {
                return oldBooks?.map((book) => 
                    book.idLivro === variables.id ? updatedBook : book
                ) ?? [];
            });

            // Retorna para a tela anterior
            router.back();
        },
    });

    // ─── MUTATION: DELETAR LIVRO ─────────────────────────────────────────────
    const deleteMutation = useMutation({
        mutationFn: (id: number) => bookService.delete(id),
        onSuccess: (_, deletedId) => {
            // Remove o livro deletado do cache da lista geral
            queryClient.setQueryData<IBook[]>(['books', user?.id], (oldBooks) => {
                return oldBooks?.filter((book) => book.idLivro !== deletedId) ?? [];
            });
            
            // Remove o cache individual do livro deletado
            queryClient.removeQueries({ queryKey: ['book', deletedId] });

            router.back();
        },
    });

    return {
        insertBook: insertMutation.mutateAsync,
        isInserting: insertMutation.isPending,
        
        updateBook: updateMutation.mutateAsync,
        isUpdating: updateMutation.isPending,
        
        deleteBook: deleteMutation.mutateAsync,
        isDeleting: deleteMutation.isPending,
        
        error: insertMutation.error || updateMutation.error || deleteMutation.error,
    };
}