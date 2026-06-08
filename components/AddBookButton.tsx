import { Plus } from "@tamagui/lucide-icons-2";
import { router } from "expo-router";
import { Button } from "tamagui";

export function AddBookButton() {
    return (
        <Button
            width={80}
            height={120}
            borderWidth={2}
            borderColor="$borderColor"
            borderStyle="dashed"
            borderRadius="$4"
            onPress={() => router.push("/books/new")}
            icon={Plus}
            scaleIcon={2}
            aria-label="Adicionar novo livro"
            alignSelf="center"
        />
    );
}