import type { Book } from "@/types/book";

export function useBooks() {
  // aqui é um hook para listar os livros do usuário e buscar detalhes
  return {
    books: [] as Book[],
    isLoading: false,
  };
}
