import React, { useEffect, useState } from "react";
import {
    Image,
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Color, Theme } from "@constants/Colors";
import { EventType } from "@services/event";
import Icons from "#/src/components/Icons";
import { date, returnValue } from "@components/date";
import { LinearGradient } from "expo-linear-gradient";
import { fetchUser, EventUserProps } from "@services/user";
import { fetchEvent } from "@services/event";
import Button from "#/src/components/ui/button";
import {useEvent } from '#/src/context/useEvent';
import { api } from "#/src/services/apiinterceptors";
import { useUserStore } from "#/src/store/useUserStore";
import useAlert from "#/src/store/useAlert";
import { height } from "#/src/constants/Dimention";
const FullEvent: React.FC = () => {
    const router = useRouter();
    const mainUser = useUserStore((s) => s.user);
    const { setEventId } = useEvent();
    const { setAlert } = useAlert();
    const [user, setUser] = useState<EventUserProps[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [loading1, setLoading1] = useState<boolean>(false);
    const [event, setEvent] = useState<EventType | null>(null);
    const [dateTime, setDateTime] = useState<returnValue | null>(null);
    const [registed, setRegisted] = useState<boolean>(false);
    const [registerStatus, setRegisterStatus] = useState<string>("");
    const { data } = useLocalSearchParams();

    useEffect(() => {
        const parsedEvent = JSON.parse(data as string);
        if (Number.isInteger(parsedEvent)) {
            setEventId(parsedEvent);
            fetchEvent(parsedEvent, (data1: EventType[], err) => {
                if (err) {
                    setAlert(err);
                    return;
                }
                setDateTime(date(data1[0].start_time, data1[0].end_time));
                setEvent(data1[0]);
                check(parsedEvent);
                fetchUser(data1[0].created_by, (data, err) => {
                    if (err) {
                        setAlert(err);
                        return;
                    }
                    setUser(data);
                });
            });
        } else {
            setEvent(parsedEvent);
            check(parsedEvent.id);
            setEventId(parsedEvent.id);
            setDateTime(date(parsedEvent.start_time, parsedEvent.end_time));
            fetchUser(parsedEvent.created_by, (data, err) => {
                if (err) {
                    setAlert(err);
                    return;
                }
                setUser(data);
            });
            setLoading(false);
        }
    }, []);
    const toDay = new Date(); // Get current date as a Date object
    const eventStartTime = event?.start_time
        ? new Date(event.start_time)
        : null;
    async function check(id: number) {
        try {
            setLoading1(true);
            const responce = await api.post("event-registration/check", {
                user_id: mainUser?.id,
                event_id: id,
            });
            if (!responce.data.message) {
                setRegisted(true);
                setRegisterStatus(responce.data[0].status);
            }
            setLoading1(false);
        } catch (error) {
            setLoading1(false);
        }
    }
    async function onRegister() {
        try {
            setLoading1(true);
            const responce = await api.post("event-registration", {
                user_id: mainUser?.id,
                event_id: event?.id,
            });
            setAlert(responce.data.message, "success");
            setLoading1(false);
            setRegisted(true);
        } catch (error) {
            console.error(error);
            setLoading1(false);
        }
    }
    return (
        <SafeAreaView style={Theme} className="flex-1 relative">
            <ScrollView className="">
                <View className="w-full " style={{ height: height / 2.5 }}>
                    <Image
                        source={{ uri: event?.image }}
                        className="w-full h-full rounded-3xl"
                        resizeMode="cover"
                    />
                </View>
                <View className="items-center mt-[-30px]">
                    {mainUser?.role == "a" ? (
                        <TouchableOpacity
                            className="flex-row items-center gap-4 bg-[--bg-color] px-5 py-4 w-[80%] rounded-full"
                            onPress={() => {
                                router.push({
                                    pathname:
                                        "/screen/dashbord/event(tabs)/Registration",
                                    params: { id: event?.id },
                                });
                            }}
                        >
                            <Icons.Feather
                                name="users"
                                size={20}
                                color={Color["bg-color"]}
                                className="bg-[#00000033] rounded-full p-2"
                            />
                            <View className="flex-row gap-6">
                                <Text
                                    className=" font-semibold text-[12px]"
                                    style={{
                                        color: `${Color["main-color"]}aa`,
                                    }}
                                >
                                    +{event?.numOFUser} Going
                                </Text>
                                <Text>|</Text>
                                <Text className="text-blue-700 underline">
                                    Manage Register User
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <View className="flex-row items-center gap-4 bg-[--bg-color] px-5 py-4 w-[80%] rounded-full">
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
                        </View>
                    )}
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
                                    resizeMode="cover"
                                />
                            </View>
                            <View className="gap-3">
                                <Text className="font-bold">
                                    {user[0].name}
                                </Text>
                                <Text className="text-[12px] text-[#00000055]">
                                    {user[0].role == "1"
                                        ? "Student"
                                        : user[0].role == "2"
                                        ? "Voreentear"
                                        : user[0].role == "3"
                                        ? "faculty"
                                        : "admin"}
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
            {/* ================== */}
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
            {eventStartTime && toDay < eventStartTime ? (
                registed ? (
                    <View className="items-center mb-10">
                        <Text>You Are Registed in This Event</Text>
                        <Text className=" font-bold">{registerStatus.toUpperCase()} </Text>
                    </View>
                ) : (
                    <View className="items-center mb-10">
                        {loading1 ? (
                            <ActivityIndicator />
                        ) : (
                            <Button
                                style={{
                                    width: "80%",
                                    boxShadow: "0px 1px 10px #777",
                                }}
                                onPress={() => {
                                    Alert.alert(
                                        "🎟️ Event Registration",
                                        "Are you sure you want to register for this event? 🎉 This will secure your spot!",
                                        [
                                            {
                                                text: "✅ Yes, Register Me!",
                                                onPress: () => onRegister(),
                                            },
                                            {
                                                text: "❌ No, Maybe Later",
                                                style: "cancel",
                                            },
                                        ]
                                    );
                                }}
                            >
                                <Text className="text-[15px] underline">
                                    Register
                                </Text>
                            </Button>
                        )}
                    </View>
                )
            ) : (
                <View className="items-center mb-10">
                    <Text>This Event Is Expired</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

export default FullEvent;
