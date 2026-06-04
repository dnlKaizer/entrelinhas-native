import { IBook } from "@/types/book.types";
import { FlatList } from "react-native";
import { H3, YStack } from "tamagui";
import { BookCard } from "./BookCard";
import { DB_SCHEMA } from "@/constants/database";
import { tamaguiTokens } from "@/config/tamagui.config";
import { useTheme } from "@/hooks/useTheme";

function backgroundColor(type: 'Desejado' | 'Lido' | 'Lendo', theme: string) {
    switch (type) {
        case 'Desejado':
            return theme === 'light' ? tamaguiTokens.color.blue4Light : tamaguiTokens.color.blue4Dark;
        case 'Lido':
            return theme === 'light' ? tamaguiTokens.color.green4Light : tamaguiTokens.color.green4Dark;
        case 'Lendo':
            return theme === 'light' ? tamaguiTokens.color.yellow4Light : tamaguiTokens.color.yellow4Dark;
        default:
            return theme === 'light' ? tamaguiTokens.color.gray4Light : tamaguiTokens.color.gray4Dark;
    }
}

export function BookList({ books, type }: { books: IBook[]; type: 'Desejado' | 'Lido' | 'Lendo' }) {
    const { theme } = useTheme();

    return (
        <YStack 
            backgroundColor={backgroundColor(type, theme)}
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
    );
}