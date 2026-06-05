import { useState } from "react";
import { authService } from "@/services/auth.service";

export function useLogin() {
    const [ isLoading, setIsLoading ]  = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);

    const register = async (email: string, password: string, confirmPassword: string) => {
        setIsLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError("As senhas não coincidem.");
            setIsLoading(false);
            return;
        }

        await authService.signUp(email, password).catch((err) => {
            setError(err.message);
        }).finally(() => {
            setIsLoading(false);
        });
    };
    
    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        await authService.login(email, password).catch((err) => {
            setError(err.message);
        }).finally(() => {
            setIsLoading(false);
        });
    };
    
    const logout = async () => {
        setIsLoading(true);
        setError(null);

        await authService.logout().catch((err) => {
            setError(err.message);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return { isLoading, error, register, login, logout };
}