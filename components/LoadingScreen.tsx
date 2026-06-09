import { globalStyles } from "@/constants/global-styles";
import { ActivityIndicator, View } from "react-native";

export function LoadingScreen() {
    return (
        <View style={globalStyles.centerContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
}
