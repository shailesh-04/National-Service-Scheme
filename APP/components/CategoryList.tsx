import { View, Text, ScrollView } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const categories = [
    { icon: <MaterialIcons name="event" size={19} color="white" />, label: "All Events", color: "bg-blue-500" },
    { icon: <Fontisto name="blood-drop" size={19} color="white" />, label: "Blood Donation", color: "bg-red-500" },
    { icon: <FontAwesome name="paint-brush" size={19} color="white" />, label: "Drawing", color: "bg-pink-500" }
];

export default function CategoryList() {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-[-20] px-5">
            {categories.map((item, index) => (
                <View key={index} className={`p-2 px-5 flex-row gap-2 ${item.color} mr-2 justify-center items-center rounded-full`}>
                    {item.icon}
                    <Text className="text-white text-[13px] text-lg">{item.label}</Text>
                </View>
            ))}
        </ScrollView>
    );
}
