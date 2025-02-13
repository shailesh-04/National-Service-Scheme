import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
import DrawerMenu from "@assets/img/DrawerMenu.png";
import { Theme, Color } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import EventList from "@/components/EventList";
export default function HomeScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <View
                className="rounded-b-[34px] bg-[--primary-color] pt-7 pb-16"
                style={Theme}
            >
                <View className="flex-row justify-between items-center px-6 ">
                    <StatusBar
                        style="light"
                        backgroundColor={`${Color["primary-color"]}`}
                    />
                    <TouchableOpacity
                        onPress={() =>
                            navigation.dispatch(DrawerActions.openDrawer())
                        }
                    >
                        <Image
                            source={DrawerMenu}
                            style={{ width: 25, height: 25 }}
                        />
                    </TouchableOpacity>
                    <View className=" items-center">
                        <Text className="text-[--bg-color] font-bold">
                            THE GROUP OF PAREKH
                        </Text>
                        <Text className="text-[--bg-color] ">MAHUVA</Text>
                    </View>
                    <View className="bg-[#ffffff22]  rounded-full w-10 h-10 items-center justify-center">
                        <Ionicons
                            name="notifications-outline"
                            size={24}
                            color={`${Color["bg-color"]}`}
                        />
                    </View>
                </View>
                <View className="flex-row mt-5 px-6 items-center">
                    <AntDesign
                        className=""
                        name="search1"
                        size={24}
                        color={`${Color["bg-color"]}`}
                    />
                    <Text className="border-s border-[--accent-color] h-6 mx-2 "></Text>
                    <TextInput
                        className=" w-full"
                        placeholderTextColor={`#999`}
                        placeholder="Search..."
                    />
                </View>
            </View>
            <ScrollView
                className="mt-[-20] px-5"
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <View className="p-[5px] ms-1 px-5 flex-row gap-2  bg-blue-500 mr-2 justify-center items-center rounded-full">
                    <MaterialIcons
                        name="event"
                        size={19}
                        color={`${Color["bg-color"]}`}
                    />
                    <Text className="text-white text-[13px] text-lg">
                        All Events
                    </Text>
                </View>
                <View className="p-[5px] ms-1 px-5 flex-row gap-2  bg-red-500 mr-2 justify-center items-center rounded-full">
                    <Fontisto
                        name="blood-drop"
                        size={19}
                        color={`${Color["bg-color"]}`}
                    />
                    <Text className="text-white text-[13px] text-lg">
                        Blood Donetion
                    </Text>
                </View>

                <View className="p-[5px] ms-1 px-5 flex-row gap-2  bg-pink-500 mr-2 justify-center items-center rounded-full">
                    <FontAwesome
                        name="paint-brush"
                        size={19}
                        color={`${Color["bg-color"]}`}
                    />
                    <Text className="text-white text-[13px] text-lg">
                        Droing
                    </Text>
                </View>
            </ScrollView>
            <EventList/>
        </SafeAreaView>
    );
}
