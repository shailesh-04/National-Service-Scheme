import {
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
} from "react-native";
import Header from "@components/Header";
import { Theme } from "@constants/Colors";
import * as Icon from "@expo/vector-icons";
import TabEventCard from "@/components/TabEventCard";
import React, { useEffect, useState } from "react";
import { EventType, allEvent } from "@services/event";
import DataNotFound from "@components/DataNotFound";
import useAlert from "@store/useAlert";
import Animated, {
    FadeIn,
    FadeOut,
    SlideInRight,
    SlideOutRight,
} from "react-native-reanimated";

const Events: React.FC = () => {
    const setAlert = useAlert((s) => s.setAlert);
    const [events, setEvents] = useState<EventType[]>([]);
    const [eventsMain, setEventsMain] = useState<EventType[]>([]);
    const [searchBox, setSearchBox] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setRefreshing(true);
        allEvent((data, err) => {
            setRefreshing(false);
            if (err) {
                setAlert(err, "error");
                return;
            }
            setEvents(data);
            setEventsMain(data);
        });
    };

    return (
        <SafeAreaView style={Theme} className="gap-5">
            <Header />
            <View className="gap-4">
                <View className="px-7 flex-row justify-between items-center">
                    <Text className="text-[--text-color] text-[18px] font-semibold">
                        Events
                    </Text>

                    {searchBox && (
                        <Animated.View
                            entering={SlideInRight}
                            exiting={SlideOutRight}
                        >
                            <TextInput
                                className="bg-white h-10 w-[160px] text-[9px] ps-2 rounded-full"
                                placeholder="Search..."
                                value={searchText}
                                onChangeText={(value) => {
                                    setSearchText(value);
                                    setEvents(
                                        eventsMain.filter((item) =>
                                            item.name.includes(value)
                                        )
                                    );
                                }}
                            />
                        </Animated.View>
                    )}

                    <View className="flex-row gap-5 me-10">
                        <TouchableOpacity
                            onPress={() => setSearchBox(!searchBox)}
                        >
                            <Icon.FontAwesome
                                name="search"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                           
                        >
                            <Icon.Entypo
                                name="dots-three-vertical"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity> */}
                    </View>
                </View>
                    
                <FlatList
                    data={events}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Animated.View entering={FadeIn} exiting={FadeOut}>
                            <TabEventCard data={item} />
                        </Animated.View>
                    )}
                    contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
                    className="h-[67%] px-7"
                    onRefresh={() => (events.length < 1 ? fetchData() : null)}
                    refreshing={refreshing}
                    ListEmptyComponent={
                        !refreshing ? (
                            <DataNotFound message="No Available Events" />
                        ) : null
                    }
                />
            </View>
        </SafeAreaView>
    );
};

export default Events;
