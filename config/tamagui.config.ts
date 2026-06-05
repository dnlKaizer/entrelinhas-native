import { config } from '@tamagui/config/v3';
import { createFont, createTamagui } from 'tamagui';

export const tamaguiTokens = config.tokens;

const lobsterFont = createFont({
    family: 'Lobster',
    size: {
        1: 12, 2: 14, 3: 16, 4: 18, 5: 20, 6: 24, 7: 30, 8: 36, 9: 48, 10: 60,
    },
    weight: { 400: '400' },
    letterSpacing: {
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0
    },
    lineHeight: { 
        1: 20, 2: 22, 3: 24, 4: 26, 5: 28, 6: 32, 7: 38, 8: 44, 9: 56, 10: 68,
    },
});

export const tamaguiConfig = createTamagui({
    ...config,
    fonts: {
        ...config.fonts,
        lobster: lobsterFont,
    },
});
