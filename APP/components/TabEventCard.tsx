import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import Header from "@/components/Header";
import { Theme, Color } from "@/constants/Colors";
import * as Icon from "@expo/vector-icons";
import React from "react";

interface EventProps {
    data: {
        imagesrc: string;
        date: [string, string, string]; // [day, month, year]
        name: string;
        numOfUser: number;
        address: string;
    };
}

const TabEventCard: React.FC<EventProps> = ({ data }) => {
    return (
        <View className="flex-row gap-5 bg-white p-3 rounded-lg">
            <View className="w-28 h-32 overflow-hidden rounded-xl">
                <Image
                    source={{ uri: data.imagesrc }}
                    className="w-full h-full"
                    resizeMode="cover"
                />
            </View>
            <View className="gap-1">
                <Text
                    style={{ color: Color["main-color"] }}
                    className="text-xs"
                >
                    {data.date.join(" ")}
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
                        {data.address}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default TabEventCard;
