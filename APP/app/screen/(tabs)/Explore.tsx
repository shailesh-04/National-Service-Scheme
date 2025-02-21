import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ActivityIndicator, Text } from "react-native";
import Header from "@/components/Header";
import { Theme } from "@/constants/Colors";
import { fetchImages, ImageData, ImageProps } from "@/services/images";
import ExploreCard from "@/components/ExploreCard";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import DataNotFound from "@/components/DataNotFound";
const EventImageList: React.FC = () => {
    const [events, setEvents] = useState<ImageProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchImages((data: ImageData[], err: string) => {
            const groupedEvents = groupImagesByEvent(data);
            setEvents(groupedEvents);
            setLoading(false);
        });
    }, []);

    const groupImagesByEvent = (data: ImageData[]): ImageProps[] => {
        const eventMap: { [key: number]: ImageProps } = {};
        data.forEach((img) => {
            if (!eventMap[img.E_id]) {
                eventMap[img.E_id] = {
                    id: img.E_id,
                    name: img.event_name,
                    images: [],
                };
            }
            eventMap[img.E_id].images.push(img);
        });
        return Object.values(eventMap);
    };
    return (
        <SafeAreaView style={Theme} className="flex-1 bg-gray-100">
            <Header />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : events.length > 0 ? (
                <FlatList
                    data={events}
                    className="p-3"
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <ExploreCard event={item} />}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            ) : (
                <DataNotFound/>
            )}
        </SafeAreaView>
    );
};
export default EventImageList;
