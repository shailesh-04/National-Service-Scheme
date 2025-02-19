import {
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    ActivityIndicator,
    TextInput,
    TouchableOpacity,
} from "react-native";
import Header from "@/components/Header";
import { Theme, Color } from "@/constants/Colors";
import * as Icon from "@expo/vector-icons";
import TabEventCard from "@/components/TabEventCard";
import React, { useEffect, useState } from "react";
import { EventType, allEvent } from "@services/event";
const Events: React.FC = () => {
    const [events, setEvents] = useState<EventType[]>([]);
    const [eventsMain, setEventsMain] = useState<EventType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchBox, setSearchBox] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");
    useEffect(() => {
        setLoading(true);
        allEvent((data, err) => {
            if (err) return alert(err);
            setEvents(data);
            setEventsMain(data);
            setLoading(false);
        });
    }, []);
    return (
        <SafeAreaView style={Theme} className="gap-5">
            <Header />
            <View className="px-7 gap-4">
                <View className="flex-row justify-between">
                    <Text className="text-[--text-color] text-[18px] font-semibold">
                        Events
                    </Text>
                    {searchBox?<TextInput
                        className="border border-blue-600 h-10 w-[160px] text-[9px] ps-2 rounded-full"
                        placeholder="Search.."
                        value={`${searchText}`}
                        onChangeText={(value) => {
                            setSearchText(value);
                            const filteredEvents = eventsMain.filter((item) => 
                                item.name.includes(value)
                            );
                            setEvents(filteredEvents);
                        }}
                        
                    />:''}
                    <View className="flex-row gap-5">
                        <TouchableOpacity
                        onPress={()=>{
                            setSearchBox(!searchBox);
                        }}>
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
                >
                    {loading ? (
                        <ActivityIndicator size="large" color="blue" />
                    ) : (
                        events.map((data, index) => (
                            <TabEventCard key={index} data={data} />
                        ))
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Events;
