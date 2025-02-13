import { View, Text, Image, ImageSourcePropType } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface EventCardProps {
    title: string;
    location: string;
    image: ImageSourcePropType;
}

export default function EventCard({ title, location, image }: EventCardProps) {
    return (
        <View className="h-[255px] w-[237px] rounded-3xl p-3 overflow-hidden">
            <View className="w-full h-[131px] rounded-xl overflow-hidden">
                <Image source={image} className="w-full h-full" resizeMode="contain" />
            </View>
            <View className="mt-4 px-3 gap-2">
                <Text className="text-[20px]">{title}</Text>
                <Text className="whitespace-nowrap">
                    <Ionicons name="location-sharp" /> {location}
                </Text>
            </View>
        </View>
    );
}
