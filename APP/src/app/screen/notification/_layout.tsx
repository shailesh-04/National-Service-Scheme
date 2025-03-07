import { Stack, useRouter } from "expo-router";
import "react-native-reanimated";
import { Color } from "@constants/Colors";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
    const router = useRouter(); // Use router for navigation

    return (
        <Stack
            screenOptions={{
                animation: "slide_from_right",
                headerStyle: {
                    backgroundColor: Color["main-color"],
                },
                headerTintColor: Color["bg-color"],
                headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: "bold",
                    
                },
                headerLeft: ({ tintColor }) => (
                    <TouchableOpacity
                        onPress={() => router.back()} // Navigate back
                        style={{
                            marginLeft: 10,
                            marginRight: 20,
                            borderRadius: 50,
                            padding: 6,
                            backgroundColor: "rgba(255,255,255,0.2)",
                        }}
                    >
                        <Ionicons name="arrow-back" size={24} color={Color["bg-color"]} />
                    </TouchableOpacity>
                ),
            }}
        />
    );
}
