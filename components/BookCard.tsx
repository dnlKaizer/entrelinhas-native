import { useBookCard } from "@/hooks/useBookCard";
import { IBook } from "@/types/book.types";
import { Card, H4, Paragraph, YStack } from "tamagui";
import { Image } from "expo-image";
import { DB_SCHEMA } from "@/constants/database";
import { useRouter } from "expo-router";

export const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + "...";
};

export function BookCard({ book }: { book: IBook }) {
    const { title, author, imgUri } = useBookCard(book);
    const router = useRouter();
    const bookLabel = `Capa do Livro ${book[DB_SCHEMA.BOOKS.COLUMNS.NAME]}`;

    return (
        <Card 
            size="$4" 
            bordered 
            animation="bouncy" 
            width={160} 
            hoverStyle={{ scale: 1.02 }}
            cursor="pointer"
            onPress={() => router.push(`/books/${book[DB_SCHEMA.BOOKS.COLUMNS.ID]}`)}
        >
            <YStack width="100%" padding="$2" alignItems="center">
                <Image
                    source={imgUri}
                    style={{ width: '100%', height: 200, borderRadius: 8 }}
                    contentFit="contain"
                    cachePolicy="disk"
                    transition={100}
                    alt={bookLabel}
                    accessibilityLabel={bookLabel}
                />
                <H4
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    fontSize="$6"
                    fontWeight="bold"
                >{truncateText(title, 20)}</H4>
                <Paragraph
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    theme="alt1"
                >{truncateText(author, 20)}</Paragraph>
            </YStack>
        </Card>
    );
}