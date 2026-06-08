import { Label, Text, XStack, YStack } from "tamagui";

interface FieldWrapperProps {
    label: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
    icon?: React.ReactNode;
    htmlFor?: string;
}

export function FieldWrapper({
    label,
    error,
    required,
    children,
    icon,
    htmlFor,
}: FieldWrapperProps) {
    return (
        <YStack gap="$1.5">
            <XStack alignItems="center" gap="$1.5">
                {icon}
                <Label
                    htmlFor={htmlFor}
                    size="$3"
                    fontWeight="600"
                    color="$color11"
                    letterSpacing={0.3}
                >
                    {label}
                    {required && (
                        <Text color="$red10" marginLeft="$1">
                            *
                        </Text>
                    )}
                </Label>
            </XStack>
            {children}
            {error && (
                <Text fontSize="$2" color="$red10" marginLeft="$1">
                    {error}
                </Text>
            )}
        </YStack>
    );
}