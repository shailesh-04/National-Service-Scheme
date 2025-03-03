import { Stack } from "expo-router";
import "react-native-reanimated";
import "#/global.css";
import useAlert from "@/store/useAlert";
import Notification from "#/src/components/Alert";
import { useEffect } from "react";
export default function RootLayout() {
    const alert = useAlert((state) => state.alert);
    const type = useAlert((state) => state.type);
    const clearAlert = useAlert((state) => state.clearAlert);
    return (
        <>
            {alert && (
                <Notification
                    message={alert}
                    type={type}
                    onClose={clearAlert}
                />
            )}
            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: "slide_from_right",
                }}
            />
        </>
    );
}
