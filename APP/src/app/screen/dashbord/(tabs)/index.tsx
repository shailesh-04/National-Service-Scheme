import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    RefreshControl,
    FlatList,
    Image,
    StatusBar,
} from "react-native";
import { Theme, Color } from "@constants/Colors";
import ImageSlider from "@components/ImageSlider";
import EventCard from "@components/DashBordEventCard";
import { useRouter } from "expo-router";
import Header from "@components/Header";
import * as Icon from "@expo/vector-icons/";
import { EventType, fetchAllEvent, fetchUpcomingEvents } from "@services/event";
import useAlert from "@store/useAlert";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { UserType, useUserStore } from "@store/dashbord/useUserStore";
import HeaderAdmin from "../HeaderAdmin";
import { api } from "#/src/services/apiinterceptors";
import { useEventStore } from "#/src/store/dashbord/useEventStore";
import { getGallery, StorageImagesType } from "#/src/services/storage";
const API_URL = process.env.EXPO_PUBLIC_API_URL;
interface ImageProps {
    url: string;
}
interface EventProps {
    upcommingEvents: EventType[];
}
type User = {
    id: string;
    name: string;
    username: string;
    avatar: string;
};
const Index: React.FC = () => {
    const router = useRouter();
    const { events, setEvents } = useEventStore();
    const [upcommingEvents, setUpcommingEvent] = useState<EventType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { users, setUsers } = useUserStore();
    const [gallery, setGallery] = useState<StorageImagesType[] | null>(null);
    const [changeImageValue, setChangeImageValue] = useState<any>("");
    const { setAlert } = useAlert();
    useEffect(() => {
        fetchUpcommintEventData();
    }, []);
    
    const fetchUpcommintEventData = async () => {
        setLoading(true);
        getGallery((data, err) => {
            setLoading(false);
            if (err) return;
            setGallery(data.images);
            setChangeImageValue(data.imageId);
        });
        setLoading(true);
        fetchAllEvent((events, err) => {
            if (err) {
                
                return;
            }
            setEvents(events);
            setLoading(false);
        });

        setLoading(true);
        try {
            const response = await api.get<UserType[]>(`/user/dashbord/`);
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            setAlert("Check Your Network");
        }

        setLoading(true);
        fetchUpcomingEvents((data: EventType[], err: string) => {
            setLoading(false);
            if (err) {
               
                return;
            }
            setUpcommingEvent(data);
        });

    };
    const onRefresh = React.useCallback(() => {
     fetchUpcommintEventData();
    }, []);
    return (
        <SafeAreaView style={Theme} className="gap-8 pb-32">
            <HeaderAdmin />
            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 30,
                    paddingBottom: 200,
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View className="px-5 gap-5">
                    <View className="flex-1 bg-[--bg-color] p-5 justify-center items-center">
                        <Text className="text-[--text-color] text-2xl font-bold mb-5">
                            Dashboard
                        </Text>

                        <View className="w-full flex-row justify-around">
                            <TouchableOpacity
                                onPress={() => {
                                    router.push(
                                        "/screen/dashbord/(tabs)/Users"
                                    );
                                }}
                                className="items-center bg-[--main-color] p-5 rounded-xl w-28"
                            >
                                <FontAwesome5
                                    name="users"
                                    size={24}
                                    color={Color["second-color"]}
                                />
                                <Text className="text-white text-lg font-bold mt-2">
                                    {users.length}
                                </Text>
                                <Text className="text-gray-400">Users</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    router.push(
                                        "/screen/dashbord/(tabs)/Events"
                                    );
                                }}
                                className="items-center bg-[--main-color]  p-5 rounded-xl w-28"
                            >
                                <FontAwesome5
                                    name="calendar-alt"
                                    size={24}
                                    color={Color["second-color"]}
                                />

                                <Text className="text-white text-lg font-bold mt-2">
                                    {events.length}
                                </Text>
                                <Text className="text-gray-400">Events</Text>
                            </TouchableOpacity>

                            <View className="items-center bg-[--main-color]  p-5 rounded-xl w-28">
                                <FontAwesome5
                                    name="image"
                                    size={24}
                                    color={Color["second-color"]}
                                />
                                <Text className="text-white text-lg font-bold mt-2">
                                    400
                                </Text>
                                <Text className="text-gray-400">Images</Text>
                            </View>
                        </View>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="font-bold">Upcomming Event</Text>
                        <TouchableOpacity
                            onPress={() => {
                                router.push("/screen/(tabs)/Events");
                            }}
                            className="flex-row items-center"
                        >
                            <Text className="text-[--light-dark-color]">
                                Manage Event{" "}
                            </Text>
                            <Icon.AntDesign
                                name="caretright"
                                size={15}
                                color={Color["light-dark-color"]}
                            />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={upcommingEvents}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <EventCard data={item} />}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            gap: 30,
                            paddingHorizontal: 10,
                        }}
                        ListEmptyComponent={
                            !loading ? (
                                <View className=" bg-white rounded-3xl p-5 items-center justify-center ">
                                    <View className="w-[100px] h-[100px]">
                                        <Image
                                            source={require("@assets/img/NotFoundEvent.png")}
                                            resizeMode="cover"
                                            className="w-full h-full"
                                        />
                                    </View>
                                    <Text className="text-[-bg-color] text-[13px] font-semibold">
                                        No Upcoming Events
                                    </Text>
                                </View>
                            ) : (
                                <View className=" bg-white rounded-3xl p-5 items-center justify-center ">
                                    <View className="w-[100px] h-[100px]"></View>
                                </View>
                            )
                        }
                        snapToAlignment="start"
                        snapToInterval={250} // Adjust based on your card width + gap
                        decelerationRate="fast"
                    />
                </View>
                <View className="flex-row justify-between px-10">
                    <Text className="font-bold">Latest Joined Users</Text>
                    <TouchableOpacity
                        onPress={() => {
                            router.push("/screen/dashbord/(tabs)/Users");
                        }}
                        className="flex-row items-center"
                    >
                        <Text className="text-[--light-dark-color]">
                            Manage All User{" "}
                        </Text>
                        <Icon.AntDesign
                            name="caretright"
                            size={15}
                            color={Color["light-dark-color"]}
                        />
                    </TouchableOpacity>
                </View>
                <View className="flex-1 bg-[#F5F7FA]">
                    <Text className="text-xl font-bold text-[#212121] p-4">
                        User List
                    </Text>
                    {users.map((item, index, array) => {
                        if (index >= 5) return;
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    router.push({
                                        pathname: "/screen/dashbord/ViewUser",
                                        params: { user: JSON.stringify(item) },
                                    });
                                }}
                                key={index}
                                className="flex-row items-center bg-white p-3 mx-4 rounded-2xl mb-3 shadow-md"
                            >
                                <Image
                                    source={{ uri: item.img }}
                                    className="w-12 h-12 rounded-full mr-3"
                                />
                                <View>
                                    <Text className="text-lg font-semibold text-[#212121]">
                                        {item.name}
                                    </Text>
                                    <Text className="text-sm text-[#888]">
                                        {item.name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <View className="flex-row justify-between px-10">
                    <Text className="font-bold">Image gallery</Text>
                    <TouchableOpacity
                        onPress={() => {
                            router.push({
                                pathname:"/screen/dashbord/ManageImages",
                                params:{imageId:changeImageValue}
                            });
                        }}
                        className="flex-row items-center"
                    >
                        <Text className="text-[--light-dark-color]">
                            Manage Images{" "}
                        </Text>
                        <Icon.AntDesign
                            name="caretright"
                            size={15}
                            color={Color["light-dark-color"]}
                        />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={gallery}
                    numColumns={2}
                    keyExtractor={(item, i) => i.toString()}
                    columnWrapperStyle={{ justifyContent: "space-evenly" }}
                    contentContainerStyle={{ gap: 12 }}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <View className="w-[40%] aspect-square bg-white rounded-2xl shadow-md overflow-hidden mt-3">
                            <Image
                                source={{ uri: item.imageurl }}
                                className="w-full h-full"
                            />
                        </View>
                    )}
                />
            </ScrollView>
        </SafeAreaView>
    );
};
export default Index;
