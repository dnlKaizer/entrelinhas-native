import { IBook } from "@/types/book.types";
import { FlatList } from "react-native";
import { H3, Paragraph, Theme, XStack, YStack } from "tamagui";
import { BookCard } from "./BookCard";
import { DB_SCHEMA } from "@/constants/database";
import { AddBookButton } from "././AddBookButton";

export function BookList({ books, type }: { books: IBook[]; type: 'Desejado' | 'Lido' | 'Lendo' }) {
    const themeName = type === 'Desejado' ? 'blue' : type === 'Lido' ? 'green' : 'purple';
    const count = books.length;
    const isEmpty = count === 0;

    return (
        <Theme name={themeName}>
            <YStack 
                backgroundColor="$color6"
                paddingBlock="$2"
                paddingHorizontal="$3" 
                borderRadius="$4"
                width="100%"
                maxWidth={800}
                alignSelf="center"
                animation="bouncy"
            >
                <H3 marginBottom="$2" alignSelf="center" fontWeight="bold">{type}</H3>

                <FlatList
                    data={books}
                    keyExtractor={(item) => item[DB_SCHEMA.BOOKS.COLUMNS.ID].toString()}
                    horizontal
                    contentContainerStyle={{
                        gap: 12,
                        padding: 12,
                        alignItems: 'center',
                    }}
                    renderItem={({ item }) => (
                        <BookCard book={item} />
                    )}
                    ListHeaderComponent={<AddBookButton />}
                />
                <Paragraph alignSelf="flex-end">{count} {count === 1 ? 'livro' : 'livros'}</Paragraph>
            </YStack>
        </Theme>
    );
}