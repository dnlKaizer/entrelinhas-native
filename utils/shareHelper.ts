import { IBook } from '@/types/book.types';
import { Share } from 'react-native';

export const shareBook = async (book: IBook) => {
    const title = book.nome;
    const author = book.autor ?? 'Autor desconhecido';
    const description = book.text || "Sem descrição cadastrada.";
    const url = ""; // Caso sua interface IBook tenha uma url, use: book.url || ""

    const message = `📚 *Indicação de Leitura!*

*Livro:* 
${title}

*Autor:* 
${author}

_${description}_`;

    try {
        await Share.share({
            message: message,
            title: `Indicação: ${title}`,
        });
    } catch (error) {
        console.error("Erro ao compartilhar livro:", error);
    }
};