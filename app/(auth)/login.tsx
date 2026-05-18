import { useAuthActions } from "@/hooks/useAuthActions";
import { Button, Text, View } from "react-native";

export default function LoginPage() {
  const { login } = useAuthActions();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20 }}>Página de Login</Text>
      <Button title="Entrar (Testar Auth)" onPress={() => login('admin@gmail.com', 'admin')} />
    </View>
  );
}
