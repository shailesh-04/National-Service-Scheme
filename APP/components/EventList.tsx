import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import EventCard from "./EventCard";
import bloodDonation from "@assets/img/bloodDonation.jpg";
import drawing from "@assets/img/Sahyogam-Drawing-Creative-02.jpg";

const events = [
    { title: "Blood Donation", location: "Mahuva SMT Parekh College", image: bloodDonation },
    { title: "Drawing Competition", location: "Mahuva SMT Parekh College", image: drawing }
];

export default function EventList() {
    return (
        <View className="mt-8 px-7">
            <View className="flex-row justify-between items-center">
                <Text className="font-bold">Upcoming Events</Text>
                <TouchableOpacity>
                    <Text className="text-[#555] text-[12px]">See All <AntDesign name="right" /></Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="w-full">
                {events.map((event, index) => (
                    <EventCard key={index} title={event.title} location={event.location} image={event.image} />
                ))}
            </ScrollView>
        </View>
    );
}
