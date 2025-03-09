import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import Icons from "#/src/components/Icons";


type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role?: "1" | "2" | "3" | "a";
  about?: string;
  password: string;
  is_deleted?: boolean;
  img?: string;
};

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useLocalSearchParams<{ user: string }>();

  // Convert user from JSON string to object
  const parsedUser: User = JSON.parse(user);
  const role = parsedUser.role === "a" ? "Admin" : "Student";

  return (
    <View className="flex-1 bg-[#F5F7FA] px-6 mt-10 items-center justify-center">
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} className="absolute top-6 left-4 p-10 bg-slate-300 rounded-full">
        <Icons.AntDesign name="left" size={24} color="#212121" />
      </TouchableOpacity>

      {/* Profile Image */}
      <Animated.Image
        source={{ uri: parsedUser.img || "https://via.placeholder.com/150" }}
        className="w-36 h-36 rounded-full self-center border-4 border-white shadow-md"
        entering={FadeIn.duration(800)}
      />

      {/* User Info */}
      <Animated.View
        entering={FadeInDown.duration(800).delay(300)}
        className="bg-white p-6 rounded-2xl shadow-md items-center mt-4 w-full"
      >
        <Text className="text-2xl font-bold text-[#212121]">{parsedUser.name}</Text>
        <Text className="text-sm text-[#888]">{parsedUser.email}</Text>
        {parsedUser.phone && <Text className="text-sm text-[#888]">{parsedUser.phone}</Text>}
        <Text className="text-sm text-[#4A43EC] mt-2">Role: {role}</Text>
        {parsedUser.about && (
          <Text className="text-sm text-[#212121] text-center mt-2">{parsedUser.about}</Text>
        )}

        {/* Edit Profile Button */}
        <TouchableOpacity onPress={()=>{
            router.push({
                pathname: "/screen/dashbord/EditUser",
                params: {
                    userId: parsedUser.id,
                },
            });
        }} className="flex-row items-center mt-4 border border-[#4A43EC] px-4 py-2 rounded-full">
          <Icons.Entypo name="edit" size={16} color="#4A43EC" />
          <Text className="text-[#4A43EC] ml-2 font-semibold">Edit Profile</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
