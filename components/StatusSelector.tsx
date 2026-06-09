import { BookStatus } from "@/types/book.types";
import { FieldWrapper } from "./FieldWrapper";
import { BookMarked } from "@tamagui/lucide-icons-2";
import { Button, Theme, ThemeName, XStack } from "tamagui";

const STATUS_OPTIONS: { label: string; value: BookStatus }[] = [
    { label: 'Desejado', value: 'Desejado' },
    { label: 'Lendo', value: 'Lendo' },
    { label: 'Lido', value: 'Lido' },
];

interface StatusSelectorProps {
    value: BookStatus;
    onChange: (v: BookStatus) => void;
    error?: string;
}

export function StatusSelector({ value, onChange, error }: StatusSelectorProps) {
    const colorMap: Record<BookStatus, string> = {
        'Desejado': 'blue',
        'Lendo': 'orange',
        'Lido': 'green',
    };

    return (
        <FieldWrapper
            label="Status"
            error={error}
            required
            icon={<BookMarked size={14} />}
        >
            <XStack gap="$2">
                {STATUS_OPTIONS.map(({ label, value: optVal }) => {
                    const isSelected = value === optVal;
                    return (
                        <Theme name={colorMap[optVal] as ThemeName} key={optVal}>
                            <Button
                                key={optVal}
                                flex={1}
                                size="$3"
                                onPress={() => onChange(optVal)}
                                variant={isSelected ? undefined : 'outlined'}
                                backgroundColor={isSelected ? '$color9' : '$colorTransparent'}
                                borderColor={isSelected ? '$color9' : '$borderColor'}
                                color={isSelected ? 'white' : '$color'}
                                fontWeight={isSelected ? '700' : '400'}
                                pressStyle={{ opacity: 0.8, scale: 0.97 }}
                                
                            >
                                {label}
                            </Button>
                        </Theme>
                    );
                })}
            </XStack>
        </FieldWrapper>
    );
}