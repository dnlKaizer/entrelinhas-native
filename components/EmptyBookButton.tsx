import { Plus } from "@tamagui/lucide-icons";
import { Button } from "tamagui";

export function EmptyBookButton() {
    return (
        <Button
            width={120}
            height={200}
            borderWidth={2}
            borderColor="$borderColor"
            borderStyle="dashed" // O segredo para o pontilhado
            borderRadius="$4"
            onPress={() => console.log("Adicionar novo livro")}
            icon={Plus}
            scaleIcon={3}
            aria-label="Adicionar novo livro"
        />
    );
}