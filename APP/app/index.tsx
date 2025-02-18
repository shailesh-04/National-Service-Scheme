import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    Easing,
} from "react-native";
import { useEffect } from "react";
import { Color, Theme } from "@/constants/Colors";
import { useRouter } from "expo-router";
import logo from "@assets/img/logo.png";
import { StatusBar } from "expo-status-bar";
export default function HomeScreen() {
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            router.push("/auth/signIn");
        }, 2000);
    }, []);

    return (
        <View
            style={Theme}
            className="bg-[--main-color] flex-1 items-center justify-center "
        >
            <StatusBar backgroundColor="transparent"/>
            <View className=" w-96 h-96 rounded-full  overflow-hidden items-center justify-center bg-red-50">
                <Image
                    source={logo}
                    resizeMode="contain"
                    className="w-full h-full "
                />
            </View>
            <View className=" w-full px-10 mt-10">
                <Text className=" text-[--bg-color] text-4xl font-black">
                    Welcome to NSS
                </Text>
                <Text className="text-[--accent-color] font-bold">
                    Join hands for social service and national development.
                </Text>
            </View>
        </View>
    );
}
