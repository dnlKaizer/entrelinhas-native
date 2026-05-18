import { useAuth } from "@/hooks/useAuth";
import { useAuthActions } from "@/hooks/useAuthActions";
import { Button, Text, View } from "react-native";

export default function HomePage() {
  const { user } = useAuth();
  const { logout } = useAuthActions(); // Hook com ações abstraídas

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ marginBottom: 10 }}>Bem-Vindo à Home!</Text>
      {user && <Text style={{ marginBottom: 20 }}>Email: {user.email}</Text>}
      
      <Button 
        title="Sair (Logout)" 
        color="#ff5c5c" 
        onPress={logout} 
      />
    </View>
  );
}
