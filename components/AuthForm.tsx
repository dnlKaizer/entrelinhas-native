import { ROUTES } from "@/constants/routes";
import { useAuthForm } from "@/hooks/useAuthForm";
import { useLogin } from "@/hooks/useLogin";
import { Link } from "expo-router";
import { Button, Form, Input, Label, Paragraph, Spinner, XStack, YStack } from "tamagui";
import { PasswordInput } from "./PasswordInput";

export function AuthForm({ isRegister = false }: { isRegister?: boolean }) {
    const { email, setEmail, password, setPassword, confirmPassword, setConfirmPassword } = useAuthForm();
    const { isLoading, error, register, login } = useLogin();
    const onSubmit = isRegister ? () => register(email, password, confirmPassword) : () => login(email, password);

    return (
        <Form onSubmit={onSubmit} gap="$5" padding="$4" width="100%">
            {error && (
                <YStack backgroundColor="$red2" padding="$3" borderRadius="$4" borderWidth={1} borderColor="$red6">
                    <Paragraph color="$red10" textAlign="center" fontWeight="bold" size="$3">
                        {error}
                    </Paragraph>
                </YStack>
            )}

            <YStack gap="$2">
                <Label size="$5" lineHeight="$5" fontWeight="bold" htmlFor="email">E-mail</Label>
                <Input
                    id="email"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="seu@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </YStack>

            <PasswordInput
                label="Senha"
                id="password"
                value={password}
                onChangeText={setPassword}
                placeholder="Sua senha"
            />

            {isRegister && (
                <PasswordInput
                    label="Confirmar Senha"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirme sua senha"
                />
            )}

            <Form.Trigger asChild>
                <Button
                    theme="blue"
                    marginTop="$2"
                    disabled={isLoading}
                    icon={isLoading ? <Spinner color="$color" /> : null}
                    opacity={isLoading ? 0.8 : 1}
                >
                    {isLoading 
                        ? (isRegister ? "Cadastrando..." : "Entrando...") 
                        : (isRegister ? "Cadastrar" : "Entrar")}
                </Button>
            </Form.Trigger>

            <XStack gap="$2" justifyContent="center" marginTop="$2">
                <Paragraph color="$colorMuted">
                    {isRegister ? "Já possui uma conta?" : "Não possui uma conta?"}
                </Paragraph>

                <Link href={isRegister ? ROUTES.LOGIN : ROUTES.REGISTER} disabled={isLoading} asChild>
                    {/* Usar o SizableText/Paragraph do Tamagui com asChild garante a estilização correta */}
                    <Paragraph color="$blue10" fontWeight="bold" cursor={isLoading ? 'not-allowed' : 'pointer'}>
                        {isRegister ? "Faça login" : "Cadastre-se"}
                    </Paragraph>
                </Link>
            </XStack>
        </Form>
    );
}