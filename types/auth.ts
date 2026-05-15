export type AuthUser = {
  id: string;
  // aqui entram os demais campos do usuário autenticado
};

export type AuthSession = {
  accessToken: string;
  // aqui entram os demais campos da sessão do supabase
};
