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
    Dimensions,
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
import Icons from "#/src/components/Icons";
const API_URL = process.env.EXPO_PUBLIC_API_URL;
interface ImageProps {
    url: string;
}
interface EventProps {
    events: EventType[];
}
const Index: React.FC = () => {
    const router = useRouter();
    const { width, height } = Dimensions.get("window");
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
                    paddingBottom: 400,
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
                                <View
                                    className=" rounded-3xl p-5 items-center justify-center "
                                    style={{
                                        width: width / 1.8,
                                        height: height / 7,
                                    }}
                                >
                                    <View className="w-[100px]  ">
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
                               <View
                                    className=" rounded-3xl p-5 items-center justify-center "
                                    style={{
                                        width: width / 1.8,
                                        height: height / 7,
                                    }}
                                ></View>
                            )
                        }
                        snapToAlignment="start"
                        snapToInterval={300} // Adjust based on your card width + gap
                        decelerationRate="fast"
                    />
                </View>
                {gallery?.length ? (
                    <ImageSlider images={gallery} title="Photos" />
                ) : (
                    <View className="items-center">
                        <View
                            className="bg-white  items-center justify-center"
                            style={{
                                width: "90%",
                                height: height / 3.5,
                                borderRadius: 15,
                            }}
                        >
                            <Icons.Ionicons
                                name="image-outline"
                                size={150}
                                color="#999"
                            />
                            <Text className="text-[#999] font-black text-2xl">
                                No Avalable Image
                            </Text>
                        </View>
                    </View>
                )}

                <View className="ps-20 mt-20 h-52">
                    <Text className="font-black text-3xl">
                        THANKS FOR JOIN!
                    </Text>
                    <Text className=" text-5xl  font-black text-[--main-color]">
                        NSS
                    </Text>
                    <Icons.SimpleLineIcons
                        name="emotsmile"
                        size={150}
                        color={`${Color["main-color"]}99`}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default Index;
