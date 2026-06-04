import { useBookCard } from "@/hooks/useBookCard";
import { IBook } from "@/types/book.types";
import { Card, H4, Paragraph, YStack } from "tamagui";
import { Image } from "expo-image";

export function BookCard({ book }: { book: IBook }) {
    const { title, author, imgUri } = useBookCard(book);

    return (
        <Card elevate size="$4" bordered animation="lazy" width={160} hoverStyle={{ scale: 1.02 }}>
            <YStack width="100%" padding="$2" alignItems="center">
                <Image
                    source={imgUri}
                    style={{ width: '100%', height: 200, borderRadius: 8 }}
                    contentFit="contain"
                    cachePolicy="disk"
                    transition={100}
                />
                <H4 numberOfLines={1} fontSize="$6">{title}</H4>
                <Paragraph theme="alt1">{author}</Paragraph>
            </YStack>
        </Card>
    );
}