import { AuthContext } from "@/providers/AuthProvider";
import { bookService } from "@/services/books.service";
import { useQuery } from '@tanstack/react-query';
import { useContext } from "react";

export function useBooks() {
  const { user } = useContext(AuthContext);

  const query = useQuery({
    queryKey: ['books', user?.id],
    queryFn: () => bookService.findAllByUser(user!.id),
    enabled: !!user?.id,
    // ❌ Removido o select daqui
  });

  // ✅ Transformação feita fora, sem interferir no cache
  const data = query.data
    ? {
        readingBooks: query.data.filter((b) => b.status === "Lendo"),
        wishedBooks:  query.data.filter((b) => b.status === "Desejado"),
        readBooks:    query.data.filter((b) => b.status === "Lido"),
        allBooks:     query.data,
      }
    : undefined;

  return { ...query, data };
}