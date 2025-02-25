import { Stack } from "expo-router";
import "react-native-reanimated";
import "../global.css";
import { Provider } from "react-redux";
import store from "@redux/store";
export default function RootLayout() {
    return (
      <Provider store={store}>
        <Stack
            screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
            }}
        />
      </Provider>
    );
}
