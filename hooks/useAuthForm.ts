import { useState } from "react";

export function useAuthForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    return { email, setEmail, password, setPassword, confirmPassword, setConfirmPassword };
}