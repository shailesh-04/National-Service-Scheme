import {
    Button,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Header from "@/components/Header";
import { Color, Theme } from "@/constants/Colors";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import * as Icons from "@expo/vector-icons";
import userImage from "@assets/img/download.png";
const Profile = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={Theme} className="gap-8 flex-1">
              <Header/>
            <ScrollView className="flex-1">
                <View className="items-center ">
                    <View className="w-32 h-32">
                        <Image
                            source={userImage}
                            resizeMode="cover"
                            className="w-full h-full rounded-full"
                        />
                    </View>
                </View>
                <Text className="text-center mt-5 font-semibold text-[17px]">
                    Shailesh Makavana
                </Text>
                <Text
                    className="text-center mt-3 "
                    style={{ color: `${Color["text-color"]}aa` }}
                >
                    ADMIN
                </Text>
                <View className="mt-5 items-center">
                    <TouchableOpacity className=" flex-row bg-transparent border-[--main-color] gap-4 border-2 p-3 items-center rounded-xl">
                        <Icons.Feather name="edit" size={20} color={`${Color['main-color']}`} />
                        <Text className="text-[--main-color]">Edit Profle</Text>
                    </TouchableOpacity>
                </View>
                <View className="px-7 mt-10 gap-4">
                    <Text className="font-semibold">
                        About Me
                    </Text>
                    <Text style={{color:`${Color['text-color']}99`}}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate error minima, magni numquam inventore culpa repellendus, fuga iste aliquam ea id sunt sequi consequuntur voluptate molestias, necessitatibus maiores? Ipsa, aspernatur.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
