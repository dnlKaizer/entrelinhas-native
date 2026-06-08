import { ArrowLeft } from "@tamagui/lucide-icons-2";
import { router } from "expo-router";
import { Button } from "tamagui";

export const handleBack = () => {
    if (router.canGoBack()) {
        router.back();
    } else {
        router.replace('/');
    }
};

export function BackButton({ isRight = false }: { isRight?: boolean }) {

    return (
        <Button
            icon={ArrowLeft}
            position="absolute"
            top="$4"
            left={isRight ? undefined : "$4"}
            right={isRight ? "$4" : undefined}
            circular
            size="$4"
            zIndex={100} // Garante que ele fique por cima de tudo ao rolar
            onPress={handleBack}
            backgroundColor="$background"
            aria-label="Voltar"
            />
    );
}