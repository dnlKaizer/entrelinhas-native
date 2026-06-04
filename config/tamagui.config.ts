import { config, tokens } from '@tamagui/config/v3';
import { createTamagui } from 'tamagui';

export const tamaguiTokens = tokens;

const tamaguiConfig = createTamagui({
    ...config,
    tokens: tamaguiTokens,
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