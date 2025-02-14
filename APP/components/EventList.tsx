import React from "react";
import { ScrollView, View, Text } from "react-native";
import EventCard from "./EventCard";
import { AntDesign } from "@expo/vector-icons";
import { Color } from "@/constants/Colors";
interface Event {
    imagesrc: string;
    date: [string, string, string];
    name: string;
    numOfUser: number;
    address: string;
}
interface EventProps {
    events: Event[];
}

const EventList: React.FC<EventProps> = ({ events }) => {
    return (
        <View className="px-5 gap-5">
            <View className="flex-row justify-between">
                <Text className="font-bold">Upcoming events</Text>
                <View className="flex-row items-center">
                    <Text className="text-[--light-dark-color]">See All </Text>
                    <AntDesign
                        name="caretright"
                        size={15}
                        color={Color["light-dark-color"]}
                    />
                </View>
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
