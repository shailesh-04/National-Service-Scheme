import {
    Button,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Header from "@/components/Header";
import { Color, Theme } from "@/constants/Colors";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import * as Icons from "@expo/vector-icons";
import { useUserStore,UserType } from "#/src/store/useUserStore";
const Profile = () => {
    const user = useUserStore((state)=>state.user);
    const router = useRouter();
    useEffect(() => {
        if(!user){
            router.replace("/auth/signIn");
        }
    },[])
    return (
    <View className="flex-1 bg-white px-4 py-6">
      {/* Profile Picture */}
      <View className="items-center">
        <Image
          source={{ uri: "https://your-image-url.com" }} // Replace with actual image URL
          className="w-32 h-32 rounded-full border-4 border-gray-300"
        />
      </View>

      {/* Profile Info */}
      <View className="mt-4 items-center">
        <Text className="text-xl font-bold">Abhishek</Text>
        <Text className="text-gray-500">2020CE10211</Text>
        <Text className="text-gray-600 mt-2">Girnar | B+</Text>
      </View>

      {/* Contact Info */}
      <View className="mt-6 space-y-3">
        <Text className="text-gray-700">📞 +918755273773</Text>
        <Text className="text-gray-700">✉ abhikriitd@gmail.com</Text>
        <Text className="text-gray-700">✉ ce1200211@iitd.ac.in</Text>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity
        className="mt-6 bg-blue-600 py-2 rounded-lg items-center"
         // Replace with actual navigation route
      >
        <Text className="text-white font-semibold">Edit Profile</Text>
      </TouchableOpacity>
    </View>
    );
};

export default Profile;
