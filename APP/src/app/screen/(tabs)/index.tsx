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
import Notification from "@components/Notification";
import NoEventImage from "@assets/img/NotFoundEvent.png";
const API_URL = process.env.EXPO_PUBLIC_API_URL;
interface Image {
    url: string;
}
interface EventProps {
    events: EventType[];
}
const Index: React.FC = () => {
    const router = useRouter();
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [alert, setAlert] = useState<string | null>(null);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = () => {
        setLoading(true);
        fetchUpcomingEvents((data: EventType[], err: string) => {
            setLoading(false);
            if (err) {
                setAlert(err);
                return;
            }
            setEvents(data);
        });
    };
    const images: Image[] = [
        {
            url: "https://www.sbpedutrust.org/PhotoGallery/Gallery/Blood_Donation/19251.png",
        },
        {
            url: "https://www.sbpedutrust.org/PhotoGallery/Gallery/Drawing_Competition/115.png",
        },
        {
            url: "https://www.sbpedutrust.org/PhotoGallery/Gallery/Harghar_Tiranga/65420.png",
        },
        {
            url: "https://www.sbpedutrust.org/PhotoGallery/Gallery/Debate_On_Beti_Bachavo/69019.png",
        },
    ];
    const onRefresh = React.useCallback(() => {
        if (events.length < 1) fetchData();
    }, []);
    return (
        <SafeAreaView style={Theme} className="gap-8">
            <Header />
            {alert && (
                <Notification
                    message={alert}
                    type={"error"}
                    onClose={setAlert}
                />
            )}
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
                                            source={NoEventImage}
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
                    />
                </View>
                <ImageSlider images={images} title="Photos..." />
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
