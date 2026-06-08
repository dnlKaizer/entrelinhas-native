import { Share } from 'react-native';
import { IBook } from '@/types/book.types'; // Importe a sua tipagem original
import { useState } from 'react';

const getMessage = (book: IBook): { title: string, message: string } => {
    const title = book.nome;
    const author = book.autor ?? 'Autor desconhecido';
    const description = book.text || "Sem descrição cadastrada.";
    const url = book.img; // Caso sua interface IBook tenha uma url, use: book.url || ""

    const message = `📚 *Indicação de Leitura!*
        📖 *Livro:* ${title}
        ✍️ *Autor:* ${author}

        💡 _${description}_`;

    return { title, message };
}

export function useShare() {
    const [isSharing, setIsSharing] = useState(false);
    const [shareError, setShareError] = useState<Error | null>(null);

    const share = async (book: IBook) => {
        const { title, message } = getMessage(book);
        setIsSharing(true);
        setShareError(null);

        await Share.share({
            message: message,
            title: `Indicação: ${title}`,
        }).catch((error) => {
            setShareError(error instanceof Error ? error : new Error("Erro desconhecido ao compartilhar"));
        }).finally(() => {
            setIsSharing(false);
        });
    };

    return { share, isSharing, shareError };
}