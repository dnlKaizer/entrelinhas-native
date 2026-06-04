import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "@tamagui/lucide-icons";
import { Button, H1, Theme, XStack, YStack } from "tamagui";

export function Header() {
    const { theme, toggleTheme } = useTheme();

    return <Theme name='blue'>
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
            >
                <H1 fontFamily="$lobster">Entrelinhas</H1>
                <Button
                    size="$4"
                    circular
                    icon={theme === 'light' ? Moon : Sun}
                    onPress={toggleTheme}
                    aria-label="Trocar tema"
                />
            </XStack>
        </YStack>
    </Theme>
}
