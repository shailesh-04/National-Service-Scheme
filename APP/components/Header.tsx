import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DrawerMenu from "@assets/img/logo.png";
import { Color } from "@/constants/Colors";

export default function Header() {
    const navigation = useNavigation();
    
    return (
        <View className="flex-row justify-between items-center px-6 py-10 mt-5">
            {/* <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Image source={DrawerMenu} className="w-20"/>

            </TouchableOpacity> */}
          
            <View className="bg-[#ffffff22] rounded-full w-10 h-10 items-center justify-center">
                <Ionicons name="notifications-outline" size={24} color={Color["bg-color"]} />
            </View>
        </View>
    );
}
