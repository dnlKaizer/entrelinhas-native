import type { AuthUser } from "@/types/auth";

export function useAuth() {
  // aqui é um hook para autenticação (login, logout, cadastro, sessão)
  return {
    user: null as AuthUser | null,
    isLoading: false,
  };
}
