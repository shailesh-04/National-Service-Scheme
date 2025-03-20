import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Icon from "@expo/vector-icons";

const FullImage: React.FC = () => {
    const router = useRouter();
    const { imageUrl } = useLocalSearchParams<{ imageUrl: string }>();
    return (
        <View className="flex-1 bg-black justify-center items-center">
            {/* Close Button */}
            <TouchableOpacity
                onPress={() => router.back()}
                className="absolute top-10 right-5 z-10 bg-white p-2 rounded-full"
            >
                <Icon.AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>

            {/* Full-Screen Image */}
            <Image
                source={{ uri: imageUrl }}
                className="w-full h-full"
                resizeMode="contain"
            />
        </View>
    );
};
export default FullImage;
