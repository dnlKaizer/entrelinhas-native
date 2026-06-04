import { config } from '@tamagui/config/v3';
import { createFont, createTamagui } from 'tamagui';

export const tamaguiTokens = config.tokens;

const lobsterFont = createFont({
    family: 'Lobster', // Nome carregado no useFonts
    size: {
        true: 16,
        small: 12,
        large: 24,
    },
    weight: {
        true: '400',
    },
    letterSpacing: {
        true: 0,
    },
});

const tamaguiConfig = createTamagui({
    ...config,
    fonts: {
        ...config.fonts,
        lobster: lobsterFont,
    },
    themes: {
        ...config.themes,
        light: {
            ...config.themes.light_blue,
        },
        dark: {
            ...config.themes.dark_blue,
        }
    },
});

export default tamaguiConfig