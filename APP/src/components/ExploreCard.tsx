import React from "react";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import { ImageProps } from "@/services/images";
import * as Icon from "@expo/vector-icons";
import { Color } from "@/constants/Colors";
import { useRouter } from "expo-router";
const ExploreCard: React.FC<{ event: ImageProps }> = ({ event }) => {
    const router = useRouter();
    return (
        <View className="mb-8">
            <View className=" justify-between flex-row items-center py-2">
                <Text className="text-xl font-bold ">{event.name.length>20?event.name.substring(0,20)+"...":event.name}</Text>
                <TouchableOpacity
                    className="flex-row justify-center items-center"
                    onPress={() => {
                        router.push({
                            pathname: "/screen/FullEvent",
                            params: {
                                data: JSON.stringify(event.id)
                            },
                        });
                    }}
                >
                    <Text
                        style={{ color: `${Color["text-color"]}88` }}
                        className="text-[14px]"
                    >
                        See Event
                    </Text>
                    <Icon.AntDesign
                        name="caretright"
                        size={15}
                        color={`${Color["text-color"]}88`}
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                data={event.images}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                contentContainerStyle={{ gap: 12 }}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <View className="w-[48%] aspect-square bg-white rounded-2xl shadow-lg overflow-hidden mt-3">
                        <Image
                            source={{ uri: item.imageurl }}
                            className="w-full h-full"
                        />
                    </View>
                )}
            />
        </View>
    );
};

export default ExploreCard;
