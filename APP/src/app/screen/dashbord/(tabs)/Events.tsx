import {
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
} from "react-native";
import Header from "../HeaderAdmin";
import { Theme, Color } from "@constants/Colors";
import * as Icon from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { fetchAllEvent } from "@services/event";
import DataNotFound from "@components/DataNotFound";
import useAlert from "@store/useAlert";
import { useRouter } from "expo-router";
import { useEventStore } from "@store/dashbord/useEventStore"; // Import Zustand store
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";
import { DeleteEvent, Restore } from "#/src/services/dashbord/event";
import Button from "#/src/components/ui/button";

const Events: React.FC = () => {
    const router = useRouter();
    const setAlert = useAlert((s) => s.setAlert);

    // Zustand store hooks
    const { events, setEvents, updateEvent, removeEvent } = useEventStore();

    const [searchBox, setSearchBox] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = () => {
        setRefreshing(true);
        fetchAllEvent((events, err) => {
            setRefreshing(false);
            if (err) {
                setAlert(err, "error");
                return;
            }
            setEvents(events);
        });
    };

    return (
        <SafeAreaView style={Theme} className="gap-5">
            <Header />
            <View className="gap-4">
                {/* Header & Search */}
                <View className="px-7 flex-row justify-between items-center">
                    <Text className="text-[--text-color] text-[18px] font-semibold">
                        Events
                    </Text>

                    <Button
                        style={{ width: "20%" }}
                        onPress={() => {
                            router.push({
                                pathname: "/screen/dashbord/NewEvent",
                            });
                        }}
                    >
                        Addnew
                    </Button>
                </View>

                {/* Events List */}
                <FlatList
                    data={events}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        const date = new Date(item.start_time);
                        const formattedDate = date.toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            weekday: "long",
                            year: "2-digit",
                        });
                        const start_time = `${formattedDate.split(", ")[1]} | ${
                            date.getHours() % 12 || 12
                        }:${date.getMinutes().toString().padStart(2, "0")}${
                            date.getHours() >= 12 ? "PM" : "AM"
                        } | ${formattedDate.split(", ")[0]}`;

                        return (
                            <TouchableOpacity
                                onPress={() =>
                                    router.push({
                                        pathname: "/screen/FullEvent",
                                        params: { data: JSON.stringify(item) },
                                    })
                                }
                                className="flex-row gap-5 bg-white p-3 rounded-lg relative"
                            >
                                {/* Edit & Delete Checkboxes */}
                                <View className="justify-around">
                                    <TouchableOpacity
                                        onPress={() =>
                                            router.push({
                                                pathname:"/screen/dashbord/EditEvent",
                                                params:{ eventId: item.id}
                                            })
                                        }
                                    >
                                        <Icon.Feather
                                            name="edit"
                                            size={22}
                                            color={Color["main-color"]}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            item.is_deleted
                                                ? Restore(
                                                      item.id,
                                                      (res, err) => {
                                                          if (err) {
                                                              setAlert(
                                                                  "Edit Error" +
                                                                      err,
                                                                  "warn"
                                                              );
                                                              return;
                                                          }
                                                          updateEvent(
                                                              item.id,
                                                              "is_deleted",
                                                              false
                                                          );
                                                      }
                                                  )
                                                : DeleteEvent(
                                                      item.id,
                                                      (res, err) => {
                                                          if (err) {
                                                              setAlert(
                                                                  "Edit Error" +
                                                                      err,
                                                                  "warn"
                                                              );
                                                              return;
                                                          }
                                                          updateEvent(
                                                              item.id,
                                                              "is_deleted",
                                                              true
                                                          );
                                                      }
                                                  );
                                        }}
                                    >
                                        {item.is_deleted ? (
                                            <Icon.AntDesign
                                                name="delete"
                                                size={22}
                                                color="red"
                                            />
                                        ) : (
                                            <Icon.AntDesign
                                                name="delete"
                                                size={22}
                                                color="green"
                                            />
                                        )}
                                    </TouchableOpacity>
                                </View>

                                {/* Event Image */}
                                <View className="w-28 h-28 overflow-hidden rounded-xl">
                                    <Image
                                        source={{ uri: item.image }}
                                        className="w-full h-full"
                                        resizeMode="cover"
                                    />
                                </View>

                                {/* Event Info */}
                                <View className="gap-1">
                                    <Text
                                        style={{ color: Color["main-color"] }}
                                        className="text-xs"
                                    >
                                        {start_time.length > 23
                                            ? start_time.substring(0, 23) +
                                              "..."
                                            : start_time}
                                    </Text>
                                    <Text className="font-bold text-lg">
                                        {item.name.length > 17
                                            ? item.name.substring(0, 17) + "..."
                                            : item.name}
                                    </Text>
                                    <View className="flex-row items-center">
                                        <Icon.EvilIcons
                                            name="location"
                                            size={20}
                                            color={Color["light-dark-color"]}
                                        />
                                        <Text
                                            style={{
                                                color: Color[
                                                    "light-dark-color"
                                                ],
                                            }}
                                            className="text-xs"
                                        >
                                            {item.location}
                                        </Text>
                                    </View>
                                </View>

                                {/* Expired Badge */}
                                {new Date() > new Date(item.start_time) && (
                                    <Text className="absolute text-red-400 text-[10px] right-2 top-2">
                                        EXPIRED
                                    </Text>
                                )}
                            </TouchableOpacity>
                        );
                    }}
                    contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
                    className="h-[67%] px-7"
                    onRefresh={fetchData}
                    refreshing={refreshing}
                    ListEmptyComponent={
                        !refreshing ? (
                            <DataNotFound message="No Available Events" />
                        ) : null
                    }
                />
            </View>
        </SafeAreaView>
    );
};

export default Events;
