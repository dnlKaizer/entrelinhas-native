import { IBook } from "@/types/book.types";

import placeholderImg from '@/assets/images/placeholder.png';

const statusTheme = {
    Desejado: {
        backgroundColor: '$blue4',
        borderColor: '$blue7',
        color: '$blue10',
    },
    Lido: {
        backgroundColor: '$green4',
        borderColor: '$green7',
        color: '$green10',
    },
    Lendo: {
        backgroundColor: '$purple4',
        borderColor: '$purple7',
        color: '$purple10',
    },
};

export function useBookCard(book: IBook) {
    let { nome: title, autor, img } = book;

    const author = autor ? autor : "Autor desconhecido";
    const imgUri = img ? `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/covers/${img}` : placeholderImg;

    const readPages = book.numPagRead || 0;
    const totalPages = book.numPag || 1;
    const progressPercentual = Math.min(Math.round((readPages / totalPages) * 100), 100);

    const currentStatusTheme =
        statusTheme[book.status as keyof typeof statusTheme] ??
        statusTheme.Lendo;

    return { title, author, imgUri, progressPercentual, currentStatusTheme };
}