import {
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Alert,
} from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import Header from "#/src/components/Header";
import { Theme } from "#/src/constants/Colors";
import { useUserStore } from "#/src/store/useUserStore";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";

export default function ProfileScreen() {
    const router = useRouter();
    const user = useUserStore((state) => state.user);
    const clearUser = useUserStore((state) => state.clearUser);

    useEffect(() => {
        if (!user) router.replace("/auth/signIn");
    }, []);
    
    const roleNames = {
        1: "Student",
        2: "Volunteer",
        3: "Faculty",
        4: "Guest",
        'a': "Admin",
    };

    const handleSignOut = () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out?",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Sign Out", 
                    style: "destructive", 
                    onPress: () => {
                        clearUser(); 
                        router.replace("/auth/signIn");
                    }
                }
            ]
        );
    };
      
    return (
        <SafeAreaView style={Theme} className="flex-1 bg-[--bg-color]">
            <Header />
            <View className="p-6">
                {/* Profile Info */}
                <Animated.View 
                    entering={FadeInUp.duration(500)} 
                    exiting={FadeOutDown.duration(300)}
                    className="mt-6 bg-white gap-3 p-6 rounded-2xl items-center shadow-md"
                >
                    <Image
                        source={{ uri: user?.img }}
                        className="w-32 h-32 rounded-full"
                    />
                    <Text className="text-xl font-semibold mt-2">
                        {user?.name}
                    </Text>
                    <Text className="text-gray-500">STD - 12(B)</Text>
                    <Text className="text-center text-gray-400 mt-2">
                        {roleNames[user?.role ? user?.role : '4'] || "Unknown Role"}
                    </Text>
                </Animated.View>
                <View className="mt-4 bg-white p-4 rounded-2xl shadow-md gap-4">
                    <View className="flex-row items-center gap-4">
                        <FontAwesome name="phone" size={20} color="black" />
                        <Text className="text-black text-base">{user?.phone}</Text>
                    </View>
                    <View className="flex-row items-center gap-4 mt-2">
                        <FontAwesome name="envelope" size={20} color="black" />
                        <Text className="text-black text-base">{user?.email}</Text>
                    </View>
                </View>

                {/* Edit Button */}
                <TouchableOpacity 
                    className="mt-4 bg-white p-4 rounded-2xl shadow-md flex-row justify-between items-center active:opacity-70"
                    onPress={()=>{
                        router.push("/screen/EditProfile");
                    }}
                >
                    <Text className="text-black text-base">Edit</Text>
                    <Feather name="edit-2" size={20} color="black" />
                </TouchableOpacity>

                {/* Sign Out Button */}
                <TouchableOpacity 
                    className="mt-4 bg-white p-4 rounded-2xl shadow-md flex-row justify-between items-center active:opacity-70"
                    onPress={handleSignOut}
                >
                    <Text className="text-black text-base">Sign Out</Text>
                    <Feather name="log-out" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
