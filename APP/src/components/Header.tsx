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
        <View className=" rounded-b-[30px]  flex-row justify-between items-center px-6 py-10 relative"
        style={{backgroundColor:Color['main-color']}}>
             <StatusBar backgroundColor={Color["main-color"]}  />
            <View className="gap-3 mt-5">
                <View className="flex-row gap-3">
                    <View className="w-10 h-10">
                        <Image
                            source={require("@assets/img/logo.png")}
                            className="w-12 h-12 rounded-full overflow-hidden"
                            style={{backgroundColor:Color['bg-color']}}
                        />
                    </View>
                    <Text className=" font-bold text-[20px]" style={{color:Color['bg-color']}}>
                        NSS
                    </Text>
                </View>
                <Text className=" font-bold" style={{color:Color['bg-color']}}>
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
