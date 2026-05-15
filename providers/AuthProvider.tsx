import { PropsWithChildren } from "react";

export function AuthProvider({ children }: PropsWithChildren) {
  // aqui fica o provider de sessão/autenticação global
  return children;
}
