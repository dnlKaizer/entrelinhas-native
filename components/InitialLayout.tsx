import { useAuth } from "@/hooks/useAuth";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { Stack } from "expo-router";
import { LoadingScreen } from "./LoadingScreen";

export function InitialLayout() {
    const { session, isLoading } = useAuth();

    // A lógica de rotas foi extraída completamente para este Hook customizado
    useProtectedRoute(session, isLoading);

    return (isLoading ? (
        <LoadingScreen />
    ) : (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
        </Stack>
    ));
}