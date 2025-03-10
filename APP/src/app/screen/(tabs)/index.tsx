import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    RefreshControl,
    FlatList,
    Image,
} from "react-native";
import { Theme, Color } from "@constants/Colors";
import ImageSlider from "@components/ImageSlider";
import EventCard from "@components/EventCard";
import { useRouter } from "expo-router";
import Header from "@components/Header";
import * as Icon from "@expo/vector-icons/";
import { EventType, fetchUpcomingEvents } from "@services/event";
import useAlert from "@store/useAlert";
import { getGallery, StorageImagesType } from "#/src/services/storage";
const API_URL = process.env.EXPO_PUBLIC_API_URL;
interface ImageProps {
    url: string;
}
interface EventProps {
    events: EventType[];
}
const Index: React.FC = () => {
    const router = useRouter();
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [gallery, setGallery] = useState<StorageImagesType[] | null>(null);
    const setAlert = useAlert((e) => e.setAlert);
    useEffect(() => {
        fetchData();
        getGallery((data, err) => {
            if (err) setAlert(err, "error");
            setGallery(data.images);
        });
    }, []);
    const fetchData = () => {
        setLoading(true);
        fetchUpcomingEvents((data: EventType[], err: string) => {
            setLoading(false);
            if (err) {
                setAlert(err, "error");
                return;
            }
            setEvents(data);
        });
    };
    const onRefresh = React.useCallback(() => {
        if (events.length < 1) fetchData();
    }, []);
    return (
        <SafeAreaView style={Theme} className="gap-8">
            <Header />
            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 30,
                    paddingBottom: 200,
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View className="px-5 gap-5">
                    <View className="flex-row justify-between">
                        <Text className="font-bold">Upcoming events</Text>
                        <TouchableOpacity
                            onPress={() => {
                                router.push("/screen/(tabs)/Events");
                            }}
                            className="flex-row items-center"
                        >
                            <Text className="text-[--light-dark-color]">
                                See All{" "}
                            </Text>
                            <Icon.AntDesign
                                name="caretright"
                                size={15}
                                color={Color["light-dark-color"]}
                            />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={events}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <EventCard data={item} />}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            gap: 30,
                            paddingHorizontal: 10,
                        }}
                        ListEmptyComponent={
                            !loading ? (
                                <View className=" bg-white rounded-3xl p-5 items-center justify-center ">
                                    <View className="w-[100px] h-[100px]">
                                        <Image
                                            source={require("@assets/img/NotFoundEvent.png")}
                                            resizeMode="cover"
                                            className="w-full h-full"
                                        />
                                    </View>
                                    <Text className="text-[-bg-color] text-[13px] font-semibold">
                                        No Upcoming Events
                                    </Text>
                                </View>
                            ) : (
                                <View className=" bg-white rounded-3xl p-5 items-center justify-center ">
                                    <View className="w-[100px] h-[100px]"></View>
                                </View>
                            )
                        }
                        snapToAlignment="start"
                        snapToInterval={250} // Adjust based on your card width + gap
                        decelerationRate="fast"
                    />
                </View>
                {gallery ? (
                    <ImageSlider images={gallery} title="Photos" />
                ) : (
                    <View className="bg-white w-full py-20 items-center justify-center">
                        <Text className="text-[#999] font-black">
                            Not Images For Gallery
                        </Text>
                    </View>
                )}

                <View className="items-center h-52">
                    <Text className="font-black text-3xl">
                        THANKS FOR JOIN!
                    </Text>
                    <Text className="w-full text-5xl ps-20 font-black text-[--main-color]">
                        NSS
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default Index;
