import { AuthForm } from "@/components/AuthForm";
import { globalStyles } from "@/constants/global-styles";
import { Card, YStack, H1, ScrollView } from "tamagui";

export function AuthPage({ isRegister = false }: { isRegister?: boolean }) {
    return (
        <ScrollView contentContainerStyle={globalStyles.centerContainer}>
            <YStack width="100%" padding="$4" paddingBottom="$10" backgroundColor="$background" gap="$4" style={globalStyles.centerContainer}>
                <H1 fontFamily="$lobster">
                    Entrelinhas
                </H1>
                <Card borderWidth={2} borderColor="$borderColor" backgroundColor="$cardBackground" width="100%" maxWidth={400}>
                    <AuthForm isRegister={isRegister} />
                </Card>
            </YStack>
        </ScrollView>
    );
}