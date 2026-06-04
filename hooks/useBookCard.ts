import { IBook } from "@/types/book.types";

import placeholderImg from '@/assets/images/placeholder.png';

export function useBookCard(book: IBook) {
    let { nome: title, autor: author, img: imgUri } = book;

    if (!author) {
        author = "Autor desconhecido";
    }

    if (!imgUri) {
        imgUri = placeholderImg;
    } else {
        imgUri = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/covers/${imgUri}`;
    }

    return { title, author, imgUri };
}