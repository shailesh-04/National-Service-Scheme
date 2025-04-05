import {
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    Alert,
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
import Animated, {
    FadeInDown,
    FadeOutUp,
    SlideInRight,
    SlideOutRight,
} from "react-native-reanimated";
import { DeleteEvent, Restore } from "#/src/services/dashbord/event";
import Button from "#/src/components/ui/button";
import { Dimensions } from "react-native";
const Events: React.FC = () => {
    const { width, height } = Dimensions.get("window");
    const router = useRouter();
    const setAlert = useAlert((s) => s.setAlert);

    // Zustand store hooks
    const { events, setEvents, updateEvent, removeEvent, clearEvents } =
        useEventStore();
    const [refreshing, setRefreshing] = useState(false);
    const [isDeleted, setIsDelted] = useState(false);
    const fetchData = () => {
        setRefreshing(true);
        fetchAllEvent((events, err) => {
            setRefreshing(false);
            if (err) {
                setAlert("faild data fetching ", "warn");
                return;
            }
            setEvents(events);
        });
    };

    const filteredEvent = isDeleted
        ? events.filter((event) => event.is_deleted)
        : events.filter((event) => !event.is_deleted);

    return (
        <SafeAreaView style={Theme} className="gap-5">
            <Header />
            <View className="gap-4">
                {/* Header & Search */}
                <View className="px-7 flex-row justify-between items-center">
                    <Text className="text-[--text-color] text-[18px] font-semibold">
                        Events
                    </Text>

                    <TouchableOpacity
                        className=" ml-5 border items-center justify-center h-10 w-10 rounded-2xl mr-10"
                        onPress={() => {
                            setIsDelted(!isDeleted);
                            const temp = events;
                            clearEvents();
                            setEvents(temp);
                        }}
                    >
                        {isDeleted ? (
                            <Icon.Feather
                                name="check"
                                size={24}
                                color="black"
                            />
                        ) : (
                            ""
                        )}
                    </TouchableOpacity>
                </View>
                <Button
                    className="m-auto"
                    style={{ width: width - 100 }}
                    onPress={() => {
                        router.push({
                            pathname: "/screen/dashbord/NewEvent",
                        });
                    }}
                >
                    Addnew
                </Button>

                {/* Events List */}
                <FlatList
                    data={filteredEvent}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => {
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
                            <Animated.View
                                entering={FadeInDown.delay(index * 100)}
                                exiting={FadeOutUp}
                            >
                                <TouchableOpacity
                                    onPress={() =>
                                        router.push({
                                            pathname: "/screen/dashbord/event(tabs)",
                                            params: {
                                                data: JSON.stringify(item),
                                            },
                                        })
                                    }
                                    className="flex-row gap-5 bg-white p-3 rounded-lg relative"
                                >
                                    {/* Edit & Delete Checkboxes */}
                                    <View className="justify-around">
                                        <TouchableOpacity
                                            onPress={() =>
                                                router.push({
                                                    pathname:
                                                        "/screen/dashbord/EditEvent",
                                                    params: {
                                                        eventId: item.id,
                                                    },
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
                                                Alert.alert(
                                                    !item.is_deleted
                                                        ? "Delete"
                                                        : "Restore",
                                                    `Are you sure you want to ${
                                                        !item.is_deleted
                                                            ? "Delete"
                                                            : "Restore"
                                                    } this Event`,
                                                    [
                                                        {
                                                            text: "❌ No",
                                                            style: "cancel",
                                                        },
                                                        {
                                                            text: "✅ Yes",
                                                            onPress:
                                                                async () => {
                                                                    item.is_deleted
                                                                        ? Restore(
                                                                              item.id,
                                                                              (
                                                                                  res,
                                                                                  err
                                                                              ) => {
                                                                                  if (
                                                                                      err
                                                                                  ) {
                                                                                      setAlert(
                                                                                          "Edit Error" +
                                                                                              err,
                                                                                          "error"
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
                                                                              (
                                                                                  res,
                                                                                  err
                                                                              ) => {
                                                                                  if (
                                                                                      err
                                                                                  ) {
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
                                                                },
                                                        },
                                                    ]
                                                );
                                            }}
                                        >
                                            {item.is_deleted ? (
                                                <Icon.FontAwesome
                                                    name="recycle"
                                                    size={22}
                                                    color="green"
                                                />
                                            ) : (
                                                <Icon.AntDesign
                                                    name="delete"
                                                    size={22}
                                                    color="red"
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
                                            style={{
                                                color: Color["main-color"],
                                            }}
                                            className="text-xs"
                                        >
                                            {start_time.length > 23
                                                ? start_time.substring(0, 23) +
                                                  "..."
                                                : start_time}
                                        </Text>
                                        <Text className="font-bold text-lg">
                                            {item.name.length > 17
                                                ? item.name.substring(0, 17) +
                                                  "..."
                                                : item.name}
                                        </Text>
                                        <View className="flex-row items-center">
                                            <Icon.EvilIcons
                                                name="location"
                                                size={20}
                                                color={
                                                    Color["light-dark-color"]
                                                }
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
                            </Animated.View>
                        );
                    }}
                    contentContainerStyle={{ gap: 10, paddingBottom: 50 }}
                    className="px-7"
                    style={{ height: height - 300 }}
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
