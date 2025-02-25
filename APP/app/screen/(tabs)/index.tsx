import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { Theme, Color } from "@constants/Colors";
import ImageSlider from "@components/ImageSlider";
import EventList from "@components/EventList";
import Header from "@components/Header";
import { EventType, fetchUpcomingEvents } from "@services/event";
import Notification from "@components/Notification";
const API_URL = process.env.EXPO_PUBLIC_API_URL;
interface Image {
    url: string;
}
const Index: React.FC = () => {
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
const onRefresh = React.useCallback(()=>{
    if(events.length<1)
        fetchData();
    },[]);
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
                {!loading && (
                    <EventList events={events} />
                )}

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
