import { readBooks, readingBooks, wishedBooks } from "@/mock/books";

export function useBooks() {
  const allBooks = [...readBooks, ...readingBooks, ...wishedBooks];
  return { readBooks, readingBooks, wishedBooks, allBooks };
}
