import { useBookCard } from "@/hooks/useBookCard";
import { IBook } from "@/types/book.types";
import { Card, H4, Paragraph, YStack } from "tamagui";
import { Image } from "expo-image";
import { DB_SCHEMA } from "@/constants/database";
import { useRouter } from "expo-router";

export function BookCard({ book }: { book: IBook }) {
    const { title, author, imgUri } = useBookCard(book);
    const router = useRouter();
    const bookLabel = `Capa do Livro ${book[DB_SCHEMA.BOOKS.COLUMNS.NAME]}`;

    return (
        <Card 
            elevate 
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
                <H4 numberOfLines={1} fontSize="$6" fontWeight="bold">{title}</H4>
                <Paragraph theme="alt1">{author}</Paragraph>
            </YStack>
        </Card>
    );
}