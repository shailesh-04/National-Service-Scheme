import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import EventCard from "./EventCard";
import { AntDesign } from "@expo/vector-icons";
import { Color } from "@/constants/Colors";
import { EventType } from "./services/event";
import { useRouter } from "expo-router";
interface EventProps {
    events: EventType[];
}
const EventList: React.FC<EventProps> = ({ events }) => {
    const router = useRouter();
    return (
        <View className="px-5 gap-5">
            <View className="flex-row justify-between">
                <Text className="font-bold">Upcoming events</Text>
                <TouchableOpacity onPress={()=>{
                    router.push("/screen/(tabs)/Events");
                }} className="flex-row items-center">
                    <Text className="text-[--light-dark-color]">See All </Text>
                    <AntDesign
                        name="caretright"
                        size={15}
                        color={Color["light-dark-color"]}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 30,
                }}
            >
                {events.map((event, index) => (
                    <EventCard key={index} data={event} />
                ))}
            </ScrollView>
        </View>
    );
};
export default EventList;
