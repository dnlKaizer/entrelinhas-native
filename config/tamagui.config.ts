import { config } from '@tamagui/config/v3';
import { createTamagui } from 'tamagui';

const tamaguiConfig = createTamagui({
    ...config,
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