import { useState } from 'react';
import { Eye, EyeOff } from '@tamagui/lucide-icons';
import { Button, Input, XStack, YStack, Label, useTheme } from 'tamagui';

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
                <Button
                    size="$4"
                    circular
                    chromeless
                    icon={isPasswordVisible ? EyeOff : Eye}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    backgroundColor="transparent"
                    focusStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                    pressStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                    hoverStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                />
            </XStack>
        </YStack>
    );
}
