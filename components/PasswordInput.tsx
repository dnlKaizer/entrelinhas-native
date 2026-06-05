import { useState } from 'react';
import { Eye, EyeOff } from '@tamagui/lucide-icons';
import { Input, XStack, YStack, Label } from 'tamagui';

export function PasswordInput({ label, id, value, onChangeText, placeholder }: any) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <YStack gap="$2">
            <Label size="$5" lineHeight="$5" fontWeight="bold" htmlFor={id}>{label}</Label>
            <XStack
                alignItems="center"
                borderWidth={1}
                borderRadius="$4"
                backgroundColor="$background"
                overflow="hidden"
                paddingRight="$2"
                borderColor={'$borderColor'}

                hoverStyle={{ borderColor: '$borderColorHover' }}
                outlineColor={isFocused ? '$outlineColor' : undefined}
                outlineWidth={isFocused ? 2 : undefined}
                outlineStyle={isFocused ? 'solid' : undefined}
            >
                <Input
                    id={id}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    secureTextEntry={!isPasswordVisible}
                    flex={1}
                    borderWidth={0}
                    backgroundColor="transparent"
                    focusStyle={{
                        borderWidth: 0,
                        outlineWidth: 0,
                        shadowColor: 'transparent',
                        borderColor: 'transparent'
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <YStack
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    padding="$2"
                    cursor="pointer"
                    opacity={0.7}
                    hoverStyle={{ opacity: 1 }}
                >
                    {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </YStack>
            </XStack>
        </YStack>
    );
}
