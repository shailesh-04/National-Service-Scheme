import {
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Feather } from "@expo/vector-icons";
import Header from "@components/Header";
import { useUserStore } from "@store/useUserStore";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { Color } from "@constants/Colors";
import { singOut } from "@services/user";
import useAlert from "@store/useAlert";
export default function ProfileScreen() {
    const router = useRouter();
    const user = useUserStore((state) => state.user);
    const clearUser = useUserStore((state) => state.clearUser);
    const setAlert = useAlert((e) => e.setAlert);
    useEffect(() => {
        if (!user) router.replace("/auth/signIn");
    }, []);

    const roleNames = {
        1: "Student",
        2: "Volunteer",
        3: "Faculty",
        4: "Guest",
        a: "Admin",
    };

    const handleSignOut = () => {
        Alert.alert("Sign Out", "Are you sure you want to sign out?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Sign Out",
                style: "destructive",
                onPress: () => {
                    singOut((res, err) => {
                        if (err) {
                            setAlert(err, "error");
                            return;
                        }
                        setAlert(res, "success");
                        clearUser();
                        router.replace("/auth/signIn");
                    });
                },
            },
        ]);
    };

    return (
        <SafeAreaView className="flex-1">
            <LinearGradient
                colors={[Color["bg-color"], `#ddd`]}
                className="flex-1"
            >
                <Header />
                <View className="p-6">
                    {/* Profile Info */}
                    <Animated.View
                        entering={FadeInUp.duration(500)}
                        exiting={FadeOutDown.duration(300)}
                        className="mt-6 bg-white gap-3 p-6 rounded-2xl items-center "
                    >
                        <Image
                            source={{ uri: user?.img }}
                            className="w-32 h-32 rounded-full"
                        />
                        <Text
                            className="text-xl font-semibold mt-2"
                            style={{ color: Color["text-color"] }}
                        >
                            {user?.name}
                        </Text>
                        <Text
                            className="text-center mt-2"
                            style={{ color: Color["light-dark-color"] }}
                        >
                            {roleNames[user?.role ? user?.role : "4"] ||
                                "Unknown Role"}
                        </Text>
                    </Animated.View>

                    {/* Contact Info */}
                    <View
                        className="mt-4 bg-white p-4 rounded-2xl shadow-md gap-4"
                    >
                        <View className="flex-row items-center gap-4">
                            <FontAwesome name="phone" size={20} color="black" />
                            <Text className="text-black text-base">
                                {user?.phone}
                            </Text>
                        </View>
                        <View className="flex-row items-center gap-4 mt-2">
                            <FontAwesome
                                name="envelope"
                                size={20}
                                color="black"
                            />
                            <Text className="text-black text-base">
                                {user?.email}
                            </Text>
                        </View>
                    </View>

                    {/* Edit Button */}
                    <TouchableOpacity
                        className="mt-4 p-4 rounded-2xl flex-row justify-between items-center active:opacity-70"
                        style={{
                            backgroundColor: Color["main-color"],
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.2,
                            shadowRadius: 6,
                            elevation: 6,
                        }}
                        onPress={() => {
                            router.push("/screen/EditProfile");
                        }}
                    >
                        <Text className="text-white text-base">Edit</Text>
                        <Feather name="edit-2" size={20} color="white" />
                    </TouchableOpacity>

                    {/* Sign Out Button */}
                    <TouchableOpacity
                        className="mt-4 p-4 rounded-2xl flex-row justify-between items-center active:opacity-70"
                        style={{
                            backgroundColor: Color["second-color"],
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.2,
                            shadowRadius: 6,
                            elevation: 6,
                        }}
                        onPress={handleSignOut}
                    >
                        <Text className="text-white text-base">Sign Out</Text>
                        <Feather name="log-out" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}
