import {
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Feather } from "@expo/vector-icons";
import Header from "@components/Header";
import { useUserStore } from "@store/useUserStore";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { Color, Theme } from "@constants/Colors";
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
            <Header />
            <ScrollView>
                <View className="p-3">
                    {/* Profile Info */}
                    <Animated.View
                        entering={FadeInUp.duration(500)}
                        exiting={FadeOutDown.duration(300)}
                        className=" p-6 rounded-2xl items-center "
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
                    <Animated.View
                        entering={FadeInUp.duration(500)}
                        exiting={FadeOutDown.duration(300)}
                        className="flex-row items-center justify-center gap-5"
                    >
                        <TouchableOpacity
                            className="flex-row gap-5  bg-transparent border py-2 px-6 rounded-md "
                            style={{
                                borderColor: Color["main-color"],
                            }}
                            onPress={() => {
                                router.push("/screen/EditProfile");
                            }}
                        >
                            <Text
                                className=""
                                style={{ color: Color["main-color"] }}
                            >
                                Edit Profile
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="py-2 px-6 rounded-md flex-row gap-2 justify-between items-center"
                            style={{
                                backgroundColor: `${Color["main-color"]}`,
                            }}
                            onPress={handleSignOut}
                        >
                            <Text className="text-white text-base ">
                                Sign Out
                            </Text>
                            <Feather name="log-out" size={13} color="white" />
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View
                        entering={FadeInUp.duration(500)}
                        exiting={FadeOutDown.duration(300)}
                        className="mt-4"
                    >
                        <Text className="text-[13px] text-[#888]">
                            Email:
                        </Text>
                        <Text className="border rounded-md p-2 ps-5 border-[#aaa]">
                            {user?.email}
                        </Text>
                    </Animated.View>
                    <Animated.View
                        entering={FadeInUp.duration(500)}
                        exiting={FadeOutDown.duration(300)}
                        className="mt-4"
                    >
                        <Text className="text-[13px] text-[#888] ps-4">
                            Phone :
                        </Text>
                        <Text className="border rounded-full p-2 ps-5 border-[#aaa]">
                            {user?.phone}
                        </Text>
                    </Animated.View>
                </View>
                <View className="h-40"></View>
            </ScrollView>
        </SafeAreaView>
    );
}
