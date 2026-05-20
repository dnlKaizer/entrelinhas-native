import { IBook } from "@/services/books.service";

export function useBooks() {
  // aqui é um hook para listar os livros do usuário e buscar detalhes
  return {
    books: [] as IBook[],
    isLoading: false,
  };
}
