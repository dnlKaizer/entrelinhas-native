import { useLogin } from "@/hooks/useLogin";
import { useTheme } from "@/hooks/useTheme";
import { LogOut, Moon, Sun } from "@tamagui/lucide-icons";
import { Button, H1, XStack, YStack } from "tamagui";

export function Header() {
    const { theme, toggleTheme } = useTheme();
    const { logout } = useLogin();

    return (
        <YStack
            backgroundColor="$background" 
            padding="$3" 
            justifyContent="space-between" 
            alignItems="center" 
            borderBottomWidth={2} 
            borderColor="$borderColor"
        >
            <XStack 
                width="100%"
                maxWidth={1200}
                justifyContent="space-between" 
                alignItems="center" 
                overflow="visible"
            >
                <H1 fontFamily="$lobster">
                    Entrelinhas
                </H1>
                <XStack gap="$2">
                    <Button
                        size="$4"
                        circular
                        icon={theme === 'light' ? Moon : Sun}
                        onPress={toggleTheme}
                        aria-label="Trocar tema"
                    />
                    <Button
                        size="$4"
                        circular
                        icon={LogOut}
                        onPress={logout}
                        aria-label="Desconectar"
                    />
                </XStack>
            </XStack>
        </YStack>
    );
}
