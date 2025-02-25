import {
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    ActivityIndicator,
    TextInput,
    TouchableOpacity,
    RefreshControl,
} from "react-native";
import Header from "@/components/Header";
import { Theme, Color } from "@/constants/Colors";
import * as Icon from "@expo/vector-icons";
import TabEventCard from "@/components/TabEventCard";
import React, { useEffect, useState } from "react";
import { EventType, allEvent } from "@services/event";
import Notification from "@components/Notification";
import DataNotFound from "@components/DataNotFound";
const Events: React.FC = () => {
    const [events, setEvents] = useState<EventType[]>([]);
    const [eventsMain, setEventsMain] = useState<EventType[]>([]);
    const [searchBox, setSearchBox] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");
    const [alert, setAlert] = useState<string | null>(null);
    const [refreshing, setRefreshing] = React.useState(false);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = () => {
        setRefreshing(true);
        allEvent((data, err) => {
            setRefreshing(false);
            if (err) {
                setAlert(err);
                return;
            } else {
                setEvents(data);
                setEventsMain(data);
            }
        });
    };
    const onRefresh = React.useCallback(() => {
        if(events.length<1)
            fetchData();
    }, []);

    return (
        <SafeAreaView style={Theme} className="gap-5">
            <Header />
            {alert && (
                <Notification
                    message={alert}
                    onClose={setAlert}
                    type={"error"}
                />
            )}
            <View className="px-7 gap-4">
                <View className="flex-row justify-between">
                    <Text className="text-[--text-color] text-[18px] font-semibold">
                        Events
                    </Text>
                    {searchBox ? (
                        <TextInput
                            className="bg-white h-10 w-[160px] text-[9px] ps-2 rounded-full items-center justify-centerdfsd"
                            placeholder="Search.."
                            value={`${searchText}`}
                            onChangeText={(value) => {
                                setSearchText(value);
                                const filteredEvents = eventsMain.filter(
                                    (item) => item.name.includes(value)
                                );
                                setEvents(filteredEvents);
                            }}
                        />
                    ) : (
                        ""
                    )}
                    <View className="flex-row gap-5">
                        <TouchableOpacity
                            onPress={() => {
                                setSearchBox(!searchBox);
                            }}
                        >
                            <Icon.FontAwesome
                                name="search"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                        <Icon.Entypo
                            name="dots-three-vertical"
                            size={24}
                            color="black"
                        />
                    </View>
                </View>
                <ScrollView
                    contentContainerStyle={{
                        gap: 10,
                    }}
                    className="h-[67%]"
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {!refreshing && 
                    events.length > 0 ? (
                        events.map((data, index) => (
                            <TabEventCard key={index} data={data} />
                        ))
                    ) : (
                        !refreshing&&<DataNotFound />
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};
export default Events;
