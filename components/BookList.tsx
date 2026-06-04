import { IBook } from "@/types/book.types";
import { FlatList } from "react-native";
import { H3, Theme, YStack } from "tamagui";
import { BookCard } from "./BookCard";
import { DB_SCHEMA } from "@/constants/database";

export function BookList({ books, type }: { books: IBook[]; type: 'Desejado' | 'Lido' | 'Lendo' }) {
    const themeName = type === 'Desejado' ? 'blue' : type === 'Lido' ? 'green' : 'yellow';

    return (
        <Theme name={themeName}>
            <YStack 
                backgroundColor="$color4"
                paddingBlock="$2"
                paddingHorizontal="$3" 
                borderRadius="$4"
                width="100%"
                maxWidth={800}
                alignSelf="center"
            >
                <H3 marginBottom="$2" alignSelf="center">{type}</H3>
                
                <FlatList
                    data={books}
                    keyExtractor={(item) => item[DB_SCHEMA.BOOKS.COLUMNS.ID].toString()}
                    horizontal
                    contentContainerStyle={{ 
                        gap: 12, 
                        marginBottom: 8,
                    }}
                    renderItem={({ item }) => (
                        <BookCard book={item} />
                    )}
                />
            </YStack>
        </Theme>
    );
}