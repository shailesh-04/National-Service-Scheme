import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import Header from "@/components/Header";
import { Theme, Color } from "@/constants/Colors";
import * as Icon from "@expo/vector-icons";
import TabEventCard from "@/components/TabEventCard";

const Events = () => {
    const events = [
        {
            imagesrc:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR25GboXcCqDrfa8oi8QimAGhWcscU7ZhXFaA&s",
            date: ["15 ", "FEB ", "2025 "],
            name: "Nasha Mukti Abhiyan",
            numOfUser: 300,
            address: "PAREKH COLLAGE-MAHUVA ",
        },
        {
            imagesrc:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR25GboXcCqDrfa8oi8QimAGhWcscU7ZhXFaA&s",
            date: ["15 ", "FEB ", "2025 "],
            name: "Nasha Mukti Abhiyan",
            numOfUser: 300,
            address: "PAREKH COLLAGE-MAHUVA ",
        },
        {
            imagesrc:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR25GboXcCqDrfa8oi8QimAGhWcscU7ZhXFaA&s",
            date: ["15 ", "FEB ", "2025 "],
            name: "Nasha Mukti Abhiyan",
            numOfUser: 300,
            address: "PAREKH COLLAGE-MAHUVA ",
        },
        {
            imagesrc:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR25GboXcCqDrfa8oi8QimAGhWcscU7ZhXFaA&s",
            date: ["15 ", "FEB ", "2025 "],
            name: "Nasha Mukti Abhiyan",
            numOfUser: 300,
            address: "PAREKH COLLAGE-MAHUVA ",
        },
        {
            imagesrc:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR25GboXcCqDrfa8oi8QimAGhWcscU7ZhXFaA&s",
            date: ["15 ", "FEB ", "2025 "],
            name: "Nasha Mukti Abhiyan",
            numOfUser: 300,
            address: "PAREKH COLLAGE-MAHUVA ",
        },
        {
            imagesrc:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR25GboXcCqDrfa8oi8QimAGhWcscU7ZhXFaA&s",
            date: ["15 ", "FEB ", "2025 "],
            name: "Nasha Mukti Abhiyan",
            numOfUser: 300,
            address: "PAREKH COLLAGE-MAHUVA ",
        },
        {
            imagesrc:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR25GboXcCqDrfa8oi8QimAGhWcscU7ZhXFaA&s",
            date: ["15 ", "FEB ", "2025 "],
            name: "Nasha Mukti Abhiyan",
            numOfUser: 300,
            address: "PAREKH COLLAGE-MAHUVA ",
        },
        {
            imagesrc:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR25GboXcCqDrfa8oi8QimAGhWcscU7ZhXFaA&s",
            date: ["15 ", "FEB ", "2025 "],
            name: "Nasha Mukti Abhiyan",
            numOfUser: 300,
            address: "PAREKH COLLAGE-MAHUVA ",
        },
    ];
    return (
        <SafeAreaView style={Theme} className="gap-5">
            <Header />
            <View className="px-7 gap-4">
                <View className="flex-row justify-between">
                    <Text className="text-[--text-color] text-[18px] font-semibold">
                        Events
                    </Text>
                    <View className="flex-row gap-5">
                        <Icon.FontAwesome
                            name="search"
                            size={24}
                            color="black"
                        />
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
                    {events.map((data, index) => (
                        <TabEventCard key={index} data={data} index={index} />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Events;
