import React, { useEffect, useState } from "react";
import {
    FlatList,
    SafeAreaView,
    ActivityIndicator,
    Text,
    View,
} from "react-native";
import Header from "@components/Header";
import { Theme } from "@constants/Colors";
import { fetchImages, ImageData, ImageProps } from "@services/images";
import ExploreCard from "@components/ExploreCard";
import DataNotFound from "@components/DataNotFound";
import useAlert from "@store/useAlert";
const EventImageList: React.FC = () => {
    const [events, setEvents] = useState<ImageProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const setAlert = useAlert(s=>s.setAlert); 
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        fetchImages((data: ImageData[], err: string) => {
            setLoading(false);
            if (err) {
                setAlert(err);
                return;
            }
            const groupedEvents = groupImagesByEvent(data);
            setEvents(groupedEvents);
        });
    };
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
            {
                <FlatList
                    data={events}
                    className="px-7 py-3"
                    onRefresh={() => events.length<1?fetchData():null}
                    refreshing={loading}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <ExploreCard event={item} />}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ListEmptyComponent={
                        !loading ? <DataNotFound message="Not Avalable Any Event Images"/> : <View></View>
                    }
                />
            }
        </SafeAreaView>
    );
};
export default EventImageList;
