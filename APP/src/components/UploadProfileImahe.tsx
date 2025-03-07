import { TouchableOpacity, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons"; // Proper icon import
import { Color } from "../constants/Colors";
import { useEffect, useState } from "react";
import { string } from "yup";

interface UploadProfileImageProps {
    image: string | null;
    setImage: (image: any) => void;
}

const UploadProfileImage: React.FC<UploadProfileImageProps> = ({ image, setImage }) => {
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
               quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setImage(result.assets[0].uri);
        }
    };
    return (
        <View className="items-center">
            <TouchableOpacity
                className="w-40 h-40 border rounded-full relative overflow-hidden"
                onPress={pickImage}
            >
                {image ? (
                    <Image source={{ uri: image }} resizeMode="cover" className="w-full h-full rounded-full" />
                ) : (
                    <View className="w-full h-full bg-gray-300 rounded-full items-center justify-center">
                        <AntDesign name="user" size={50} color="white" />
                    </View>
                )}
                <View className="absolute bottom-0 left-0 w-full items-center h-10" style={{ backgroundColor: `${Color["text-color"]}22` }}>
                    <AntDesign name="edit" size={24} color="black" />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default UploadProfileImage;
