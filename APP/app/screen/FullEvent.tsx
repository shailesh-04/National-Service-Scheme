import React, { useEffect, useState } from "react";
import {
    Image,
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Color, Theme } from "@/constants/Colors";
import { EventType } from "@services/event";
import * as Icons from "@expo/vector-icons";
import { date, returnValue } from "@/components/date";
import { LinearGradient } from "expo-linear-gradient";
import { fetchUser, EventUserProps } from "@/services/user";
const FullEvent: React.FC = () => {
    const router = useRouter();

    const [user, setUser] = useState<EventUserProps[]| null>(null)
    const [event, setEvent] = useState<EventType | null>(null);
    const [dateTime, setDateTime] = useState<returnValue | null>(null);
    const { data } = useLocalSearchParams();
    useEffect(() => {
        const parsedEvent = JSON.parse(data as string);
        setEvent(parsedEvent);
        setDateTime(date(parsedEvent.start_time, parsedEvent.end_time));
        fetchUser(parsedEvent.id, (data, err) => {
            if (err) {
                alert(err);
                console.log(err);
                return;
            }
            setUser(data);
        });
    }, []);

    return (
        <SafeAreaView style={Theme} className="flex-1 relative">
            <ScrollView className="">
                <View className="w-full h-72">
                    <Image
                        source={{ uri: event?.image }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                </View>
                <View className="items-center mt-[-30px]">
                    <View className="flex-row items-center gap-4 bg-[--bg-color] px-5 py-4 rounded-full">
                        <Icons.Feather
                            name="users"
                            size={20}
                            color={Color["bg-color"]}
                            className="bg-[#00000033] rounded-full p-2"
                        />
                        <Text
                            className=" font-semibold text-[12px]"
                            style={{ color: `${Color["main-color"]}aa` }}
                        >
                            +{event?.numOFUser} Going
                        </Text>
                        <TouchableOpacity className="bg-[--main-color] p-2 rounded-xl ms-16">
                            <Text className="text-[--bg-color] text-[11px]">
                                Register
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="px-5">
                    <View className=" mt-10">
                        <Text className="text-[25px]">{event?.name}</Text>
                    </View>
                    <View className="flex-row items-center gap-6 mt-6">
                        <View
                            style={{
                                backgroundColor: `${Color["main-color"]}22`,
                            }}
                            className=" p-4 rounded-lg"
                        >
                            <Icons.Ionicons
                                name="calendar"
                                size={27}
                                color={Color["main-color"]}
                            />
                        </View>
                        <View className="gap-3">
                            <Text className="font-bold">{dateTime?.date}</Text>
                            <Text className="text-[12px] text-[#00000055]">
                                {dateTime?.time}
                            </Text>
                        </View>
                    </View>
                    <View className="flex-row items-center gap-6 mt-6">
                        <View
                            style={{
                                backgroundColor: `${Color["main-color"]}22`,
                            }}
                            className=" p-4 rounded-lg"
                        >
                            <Icons.Ionicons
                                name="location"
                                size={27}
                                color={Color["main-color"]}
                            />
                        </View>
                        <View className="gap-3">
                            <Text className="font-bold">
                                {event?.location.split(",")[0]}
                            </Text>
                            <Text className="text-[12px] text-[#00000055]">
                                {event?.location.split(",")[1]}
                            </Text>
                        </View>
                    </View>
                        {user ? (
                    <View className="flex-row items-center gap-6 mt-6 rela">
                                <View className="w-16 h-16 rounded-xl overflow-hidden">
                                    <Image
                                        source={{
                                            uri: user[0].img,
                                        }}
                                        className="w-full h-full"
                                        resizeMode="contain"
                                    />
                                </View>
                                <View className="gap-3">
                                    <Text className="font-bold">
                                        {user[0].name}
                                    </Text>
                                    <Text className="text-[12px] text-[#00000055]">
                                        {user[0].role=="1"?'Student':user[0].role=="2"?'Voreentear':user[0].role=="3"?"faculty":'admin'}
                                    </Text>
                                </View>
                                <Text className="ms-auto text-[10px] text-[--main-color] me-4">
                                    Create By
                                </Text>
                    </View>
                        ) : (
                            <ActivityIndicator />
                        )}
                    <View className="mt-6 pb-32">
                        <Text className="font-bold">About Event</Text>
                        <Text className="mt-6">{event?.description}</Text>
                    </View>
                </View>
            </ScrollView>
            <LinearGradient
                colors={["transparent", "#fff"]} // Define gradient colors here
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                className=" absolute w-full h-[20%] bottom-0"
            ></LinearGradient>

            <LinearGradient
                colors={["transparent", "#fff"]} // Define gradient colors here
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                className=" absolute w-full h-[20%] bottom-0"
            ></LinearGradient>

            <LinearGradient
                colors={["#00000099", "transparent"]} // Define gradient colors here
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                className=" absolute w-full h-[20%] top-0"
            ></LinearGradient>
            <View className=" absolute top-20 left-5 flex-row gap-10 items-center justify-center">
                <TouchableOpacity
                    onPress={() => {
                        router.back();
                    }}
                >
                    <Icons.AntDesign
                        name="arrowleft"
                        size={24}
                        color={Color["bg-color"]}
                    />
                </TouchableOpacity>
                <Text className="text-[--bg-color] font-semibold text-[17px] ">
                    Event Details
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default FullEvent;
