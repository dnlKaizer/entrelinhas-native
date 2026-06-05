import { useState } from "react";
import { authService } from "@/services/auth.service";

export const translateSupabaseError = (message: string): string => {
    const errors: Record<string, string> = {
        "Invalid login credentials": "E-mail ou senha incorretos",
        "Email already registered": "Este e-mail já está em uso",
        "User already registered": "Este usuário já está cadastrado",
        "Password should be at least 6 characters.": "A senha deve ter pelo menos 6 caracteres",
        "Unable to validate email address: invalid format": "Formato de e-mail inválido",
    };

    return errors[message] || "Ocorreu um erro inesperado. Por favor, tente novamente.";
};

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
            setError(translateSupabaseError(err.message));
        }).finally(() => {
            setIsLoading(false);
        });
    };
    
    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        await authService.login(email, password).catch((err) => {
            setError(translateSupabaseError(err.message));
        }).finally(() => {
            setIsLoading(false);
        });
    };
    
    const logout = async () => {
        setIsLoading(true);
        setError(null);

        await authService.logout().catch((err) => {
            setError(translateSupabaseError(err.message));
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return { isLoading, error, register, login, logout };
}