import { View, TextInput,Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Color } from "@/constants/Colors";

export default function SearchBar() {
    return (
        <View className="flex-row mt-5 px-6 items-center">
            <AntDesign name="search1" size={24} color={Color["bg-color"]} />
            <Text className="border-s border-[--accent-color] h-6 mx-2 "></Text>
            <TextInput className="w-full" placeholder="Search..." placeholderTextColor="#999" />
        </View>
    );
}
