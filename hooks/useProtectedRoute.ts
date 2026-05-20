import { ROUTES } from "@/constants/routes";
import { Session } from "@supabase/supabase-js";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export function useProtectedRoute(session: Session | null, isLoading: boolean) {
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;

        const inAuthGroup = segments[0] === '(auth)';

        if (session && inAuthGroup) {
            // Se logado e acessar tela de auth, vai para a home
            router.replace(ROUTES.HOME);
        } else if (!session && !inAuthGroup) {
            // Se não logado e não está na rota de auth, vai para o login
            router.replace(ROUTES.LOGIN);
        }
        
    }, [session, isLoading, segments, router]);
}