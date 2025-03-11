import { View, Image, Text, TouchableOpacity, StatusBar } from "react-native";
import { Color } from "#/src/constants/Colors";
import { useUserStore } from "#/src/store/useUserStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
const HeaderAdmin = () => {
    const { user } = useUserStore();
    const router = useRouter();
    return (
        <View
            className=" rounded-b-[30px]  flex-row justify-between items-center px-6 py-10 relative"
            style={{ backgroundColor: Color["main-color"] }}
        >
            <StatusBar backgroundColor={Color["main-color"]} />
            <View className="gap-3 mt-5">
                <View className="flex-row gap-3">
                    <View className="w-10 h-10">
                        <Image
                            source={require("@assets/img/logo.png")}
                            className="w-12 h-12 rounded-full overflow-hidden"
                            style={{ backgroundColor: Color["bg-color"] }}
                        />
                    </View>
                    <Text
                        className=" font-bold text-[20px]"
                        style={{ color: Color["bg-color"] }}
                    >
                        NSS Admin
                    </Text>
                </View>
                <Text
                    className=" font-bold"
                    style={{ color: Color["bg-color"] }}
                >
                    National Service Scheme
                </Text>
            </View>
            {user?.role == "a" ? (
                <TouchableOpacity
                    onPress={() => {
                        router.push("/screen/(tabs)");
                    }}
                >
                    <Text className="text-[--second-color] font-bold border-b border-[--second-color]">
                        Home
                    </Text>
                </TouchableOpacity>
            ) : (
                ""
            )}
            {/* <TouchableOpacity
                className="bg-[#ffffff22]  rounded-full w-10 h-10 items-center justify-center"
                onPress={() => {
                    router.push("/screen/notification/Notificatoin");
                }}
            >
                <Ionicons
                    name="notifications-outline"
                    size={24}
                    color={`${Color["bg-color"]}`}
                />
            </TouchableOpacity> */}
        </View>
    );
};
export default HeaderAdmin;
