import { authService } from "@/services/auth.service";
import { Alert } from "react-native";

export function useAuthActions() {
    const login = async (email: string, password: string) => {
        try {
            await authService.login(email, password);
        } catch (error) {
            console.error('Erro ao logar:', error);
            Alert.alert('Erro', 'Erro ao fazer login. Verifique o console.');
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            Alert.alert('Erro', 'Não foi possível desconectar.');
        }
    };

    return { login, logout };
}