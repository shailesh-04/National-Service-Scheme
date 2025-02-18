import {
    View,
    Text,
    Image,
} from "react-native";
import logo from "@assets/img/logo.png";
import { Theme, Color } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
const Header = () => {
    return (
        <View className=" bg-[--main-color] rounded-b-[30px]  flex-row justify-between items-center px-6 py-10 relative">
            <View className="gap-3 mt-5">
                <View className="flex-row gap-3">
                    <View className="w-10 h-10">
                        <Image
                            source={logo}
                            className="w-12 h-12 bg-white rounded-full overflow-hidden"
                        />
                    </View>
                    <Text className="text-[--bg-color] font-bold text-[20px]">
                        NSS
                    </Text>
                </View>
                <Text className="text-[--bg-color] font-bold">
                    National Service Scheme
                </Text>
            </View>
            <View className="bg-[#ffffff22]  rounded-full w-10 h-10 items-center justify-center">
                <Ionicons
                    name="notifications-outline"
                    size={24}
                    color={`${Color["bg-color"]}`}
                />
            </View>
        </View>
    );
};

export default Header;
