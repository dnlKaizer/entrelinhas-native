import { Platform } from "react-native"
import * as SecureStore from 'expo-secure-store'

export const expoSecureStoreAdapter = {
    getItem: async (key: string) => {
        if (Platform.OS === 'web') {
            return typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
        }
        return await SecureStore.getItemAsync(key)
    },
    setItem: async (key: string, value: string) => {
        if (Platform.OS === 'web') {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, value)
            }
            return
        }
        await SecureStore.setItemAsync(key, value)
    },
    removeItem: async (key: string) => {
        if (Platform.OS === 'web') {
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem(key)
            }
            return
        }
        await SecureStore.deleteItemAsync(key)
    },
}