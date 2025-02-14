import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
} from "react-native";
import DrawerMenu from "@assets/img/DrawerMenu.png";
import logo from "@assets/img/logo.png";
import { Theme, Color } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
const index = () => {
    return (
        <View className="" style={Theme}>
            <StatusBar backgroundColor={`${Color["main-color"]}`} />
            <View className=" bg-[--main-color] rounded-b-[30px]  flex-row justify-between items-center px-6 py-10 relative">
                <View>
                    <View className="flex-row gap-3">
                        <Image
                            source={logo}
                            resizeMode="contain"
                            className="w-12 h-12 bg-white rounded-full overflow-hidden"
                        />
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
        </View>
    );
};
export default index;
