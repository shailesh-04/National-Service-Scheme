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
    FlatList
} from "react-native";
import Header from "@/components/Header";
import { Theme, Color } from "@/constants/Colors";
import * as Icon from "@expo/vector-icons";
import TabEventCard from "@/components/TabEventCard";
import React, { useEffect, useState } from "react";
import { EventType, allEvent } from "@services/event";
import DataNotFound from "@components/DataNotFound";
import useAlert from "@store/useAlert";
const Events: React.FC = () => {
    const setAlert = useAlert(s=>s.setAlert);
    const [events, setEvents] = useState<EventType[]>([]);
    const [eventsMain, setEventsMain] = useState<EventType[]>([]);
    const [searchBox, setSearchBox] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");
    const [refreshing, setRefreshing] = React.useState(false);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = () => {
        setRefreshing(true);
        allEvent((data, err) => {
            setRefreshing(false);
            if (err) {
                setAlert(err,"error");
                return;
            } else {
                setEvents(data);
                setEventsMain(data);
            }
        });
    };
    return (
        <SafeAreaView style={Theme} className="gap-5">
            <Header />
            <View className="gap-4">
                <View className="px-7 flex-row justify-between">
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
                <FlatList
                    data={events}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <TabEventCard data={item} />}
                    contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
                    className="h-[67%] px-7" // Added paddingBottom for spacing
                    onRefresh={()=> events.length<1?fetchData():null} // Handles pull-to-refresh
                    refreshing={refreshing}
                    ListEmptyComponent={!refreshing ? <DataNotFound message="Not Avalable Any Events" /> : null} // Show empty state only when not refreshing
                />
            </View>
        </SafeAreaView>
    );
};
export default Events;
