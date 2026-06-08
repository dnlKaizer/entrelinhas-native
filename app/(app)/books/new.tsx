import { BookForm } from "@/components/BookForm";
import { useAuth } from "@/hooks/useAuth";
import { useBook } from "@/hooks/useBook";
import { IBookInsert, IBookUpdate } from "@/types/book.types";

export default function New() {
    const { user } = useAuth();
    const { insertBook } = useBook();

    const handleSubmit = async (book: IBookInsert | IBookUpdate) => {
        if (!user) return;

        const payload: IBookInsert = {
            ...(book as IBookInsert),
            idUsuario: user.id,
        };

        // Chama a mutation que salvará no banco e atualizará o cache automaticamente
        await insertBook(payload);
    };
    
    return (
        <BookForm 
            onSubmit={handleSubmit}
        />
    );
}