import { View, Text, Image, TouchableOpacity } from "react-native";
import { Theme, Color } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useRouter } from "expo-router";
const Header = () => {
    const [errorVisible, setErrorVisible] = useState(true);
    const router = useRouter();
    return (
        <View className=" bg-[--main-color] rounded-b-[30px]  flex-row justify-between items-center px-6 py-10 relative">
             <StatusBar backgroundColor="transparent" />
            <View className="gap-3 mt-5">
                <View className="flex-row gap-3">
                    <View className="w-10 h-10">
                        <Image
                            source={require("@assets/img/logo.png")}
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
            <TouchableOpacity className="bg-[#ffffff22]  rounded-full w-10 h-10 items-center justify-center"
            onPress={()=>{
                router.push("/screen/notification/Notificatoin")
            }}>
                <Ionicons
                    name="notifications-outline"
                    size={24}
                    color={`${Color["bg-color"]}`}
                />
            </TouchableOpacity>
        </View>
    );
};

export default Header;
