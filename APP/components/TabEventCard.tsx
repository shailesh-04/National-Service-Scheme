import { Image, TouchableOpacity, Text, View } from "react-native";
import Header from "@/components/Header";
import { Theme, Color } from "@/constants/Colors";
import * as Icon from "@expo/vector-icons";
import React from "react";
import { EventType } from "./services/event";
import { useRouter } from "expo-router";
interface EventProps {
    data: EventType;
}
const TabEventCard: React.FC<EventProps> = ({ data }) => {
    const router = useRouter();
    const date = new Date(data.start_time);
    const formattedDate = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        weekday: "long",
        year:"2-digit"
    });
    const start_time = `${formattedDate.split(", ")[1]} | ${
        date.getHours() % 12 || 12
    }:${date.getMinutes().toString().padStart(2, "0")}${
        date.getHours() >= 12 ? "PM" : "AM"
    } | ${formattedDate.split(", ")[0]}`;

    return (
        <TouchableOpacity onPress={()=>{
            router.push({
                pathname: "/screen/FullEvent",
                params: { data: JSON.stringify(data) },
              });
        }} className="flex-row gap-5 bg-white p-3 rounded-lg relative">
            <View className="w-28 h-28 overflow-hidden rounded-xl">
                <Image
                    source={{ uri: data.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                />
            </View>
            <View className="gap-1">
                <Text
                    style={{ color: Color["main-color"] }}
                    className="text-xs"
                >
                    {start_time}
                </Text>
                <Text className="font-bold text-lg">{data.name}</Text>
                <View className="flex-row items-center">
                    <Icon.EvilIcons
                        name="location"
                        size={20}
                        color={Color["light-dark-color"]}
                    />
                    <Text
                        style={{ color: Color["light-dark-color"] }}
                        className="text-xs"
                    >
                        {data.location}
                    </Text>
                </View>
            </View>
            {new Date() > new Date(data.start_time)?<Text className=" absolute text-red-400 text-[10px] right-2 top-2">EXPIRE</Text>:''}
        </TouchableOpacity>
    );
};
export default TabEventCard;
