import { AuthContext } from "@/providers/AuthProvider";
import { bookService } from "@/services/books.service";
import { useQuery } from '@tanstack/react-query';
import { useContext } from "react";

export function useBooks() {
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ['books', user?.id],
    queryFn: () => bookService.findAllByUser(user!.id),
    enabled: !!user?.id,
    select: (data) => ({
      readingBooks: data.filter((b) => b.status === "Lendo"),
      wishedBooks: data.filter((b) => b.status === "Desejado"),
      readBooks: data.filter((b) => b.status === "Lido"),
      allBooks: data
    })
  });
}