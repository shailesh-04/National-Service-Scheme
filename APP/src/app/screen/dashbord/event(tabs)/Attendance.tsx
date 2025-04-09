import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "#/src/constants/Colors";
import { height } from "#/src/constants/Dimention";
import { AttendanceType, UserType } from "#/src/types/attendance.types";
import { useEvent } from "#/src/context/useEvent";
import {
    createAttendance,
    deleteAttendance,
    getAllAttendancesByEventId,
    getRegistrationUserByEventId,
} from "#/src/services/attendance";
import useAlert from "#/src/store/useAlert";
import { useRouter } from "expo-router";

const toDayDate = `${new Date().getUTCDate()} ${new Date().toLocaleString(
    "en-GB",
    {
        month: "short",
    }
)} ${new Date().getUTCFullYear()}`;

const getAttendanceDatesFromPresentUsers = (List: AttendanceType[],end_time:string) => {
    const dateSet = new Set<string>();
    if(new Date() < new Date(end_time))
        dateSet.add(toDayDate);
    List.forEach((user) => {
        if (user.attendance_time) {
            const date = new Date(user.attendance_time);
            const formattedDate = `${date.getUTCDate()} ${date.toLocaleString(
                "en-GB",
                {
                    month: "short",
                }
            )} ${date.getUTCFullYear()}`;
            dateSet.add(formattedDate);
        }
    });
    
    const dateArray = Array.from(dateSet);
    return dateArray.reverse();
};

const Attendance = () => {
    const { event } = useEvent();
    const { setAlert } = useAlert();
    const router = useRouter();
    const [registerUsers, setRegisterUsers] = useState<UserType[]>([]);
    const [presentUsers, setPresentUsers] = useState<AttendanceType[]>([]);
    const [filter, setFilter] = useState<"register" | "present" | "absent">("register");
    const [dates, setDates] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);

        if (event?.id) {
            await getRegistrationUserByEventId(event?.id).then(
                setRegisterUsers
            ).finally(()=>{
                setRefreshing(false);
            });
            await getAllAttendancesByEventId(event?.id).then((data) => {
                setPresentUsers(data);
                const attendanceDates =
                    getAttendanceDatesFromPresentUsers(data,event.end_time);
                setDates(attendanceDates);
                if (attendanceDates.length > 0) {
                    setSelectedDate(
                        attendanceDates[attendanceDates.length - 1]
                    );
                }
            }).finally(()=>{
                setRefreshing(false);
            });
        }

        setRefreshing(false);
    };
    useEffect(() => {
        onRefresh();
    }, []);
    const toggleStatus = (user: UserType) => {
        const userIndex = presentUsers.findIndex((presentUser) => {
            const date = new Date(presentUser.attendance_time);
            const formattedDate = `${date.getUTCDate()} ${date.toLocaleString(
                "en-GB",
                {
                    month: "short",
                }
            )} ${date.getUTCFullYear()}`;
            return (
                presentUser.user_id === user.user_id &&
                formattedDate == selectedDate
            );
        });
        if (userIndex !== -1) {
            deleteAttendance(presentUsers[userIndex].id)
                .then((value) => {
                    const updatedPresentUsers = [...presentUsers];
                    updatedPresentUsers.splice(userIndex, 1);
                    setPresentUsers(updatedPresentUsers);
                })
                .catch((error) => {
                    setAlert(error.response?.data.message || error.message || "Server Error","error");
                });
        } else {
            if (event)
                createAttendance({ user_id: user.user_id, event_id: event?.id })
                    .then((value) => {
                        const newAttendance: AttendanceType = {
                            id: value.id,
                            user_id: user.user_id,
                            name: user.name,
                            email: user.email,
                            img: user.img,
                            attendance_time: new Date().toISOString(),
                        };
                        setPresentUsers([...presentUsers, newAttendance]);
                    })
                    .catch((error) => {
                        setAlert(error.response?.data.message || error.message || "Server Error","error");
                    });
            else return;
        }
    };

    const getStatus = (user_id: number) => {
        let flag = false;
        presentUsers.forEach((user) => {
            const date = new Date(user.attendance_time);
            const formattedDate = `${date.getUTCDate()} ${date.toLocaleString(
                "en-GB",
                {
                    month: "short",
                }
            )} ${date.getUTCFullYear()}`;

            if (user.user_id == user_id && formattedDate == selectedDate)
                flag = true;
        });
        return flag ? "present" : "absent";
    };

    const checkDate = (user_id: number): Boolean => {
        let flag = false;
        presentUsers.forEach((user) => {
            if (user.user_id === user_id) {
                const date = new Date(user.attendance_time);
                const formattedDate = `${date.getUTCDate()} ${date.toLocaleString(
                    "en-GB",
                    {
                        month: "short",
                    }
                )} ${date.getUTCFullYear()}`;
                if (formattedDate == selectedDate) {
                    flag = true;
                }
            }
        });
        return flag;
    };

    const filteredUsers =
        filter === "register"
            ? registerUsers
            : filter === "present"
            ? registerUsers.filter(
                  (user) =>
                      getStatus(user.user_id) === filter &&
                      checkDate(user.user_id)
              )
            : registerUsers.filter(
                  (user) => getStatus(user.user_id) === filter
              );

    let counter = 0;

    registerUsers.forEach((user) => {
        if (getStatus(user.user_id) === "present" && checkDate(user.user_id))
            counter++;
    });

    const presentCount = counter;
    const allCount = registerUsers.length;
    const absentCount = allCount - presentCount;

    const renderItem = ({ item }: { item: (typeof registerUsers)[0] }) => {
        const status = getStatus(item.user_id);
        return (
            <TouchableOpacity
                disabled={selectedDate !== toDayDate}
                onPress={() => toggleStatus(item)}
                className="flex-row items-center border-b border-gray-200 px-4 py-3"
            >
                <Image
                    source={{
                        uri:
                            item.img ??
                            `https://xsgames.co/randomusers/avatar.php?g=male&key=${item.user_id}`,
                    }}
                    className="w-12 h-12 rounded-full mr-4 bg-gray-200"
                />
                <View className="flex-1">
                    <Text className="text-base font-semibold text-[--text-color]">
                        {item.name}
                    </Text>
                    <Text className="text-xs text-gray-400">{item.email}</Text>
                </View>
                <View
                    className={`px-3 py-1 rounded-full ${
                        status === "absent" ? "bg-green-100" : "bg-red-100"
                    }`}
                >
                    <Text
                        className={`text-sm font-medium ${
                            status === "absent"
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {status === "absent" ? "Present" : "Absent"}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={Theme} className="bg-[--bg-color]">
            {/* Header */}
            <View className="bg-[--main-color] pt-12 pb-4 px-4 flex-row items-center justify-between">
                <TouchableOpacity onPress={()=>{
                    router.back();
                }}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <View>
                    <Text className="text-white font-semibold text-base text-center">
                        {selectedDate}
                    </Text>
                    <Text className="text-white text-sm text-center">
                        Basic of Geometry Class
                    </Text>
                </View>
                <View className="w-6" />
            </View>

            {/* Date Selector */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="py-2 px-4 bg-white"
            >
                {dates.map((date) => (
                    <TouchableOpacity
                        key={date}
                        onPress={() => setSelectedDate(date)}
                        className={`p-3 mr-3 rounded-full border ${
                            selectedDate === date
                                ? "bg-[--main-color] border-[--main-color]"
                                : "border-gray-300"
                        }`}
                    >
                        <Text
                            className={`text-sm ${
                                selectedDate === date
                                    ? "text-white"
                                    : "text-[--text-color]"
                            }`}
                        >
                            {date}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Counts */}
            <View className="flex-row justify-center gap-6 py-4">
                <View className="bg-white rounded-xl px-4 py-2 items-center shadow-md">
                    <Text className="text-[--text-color] text-xl font-bold">
                        {allCount}
                    </Text>
                    <Text className="text-xs text-gray-500">Total</Text>
                </View>
                <View className="bg-white rounded-xl px-4 py-2 items-center shadow-md">
                    <Text className="text-[--main-color] text-xl font-bold">
                        {presentCount}
                    </Text>
                    <Text className="text-xs text-gray-500">Present</Text>
                </View>
                <View className="bg-white rounded-xl px-4 py-2 items-center shadow-md">
                    <Text className="text-[--second-color] text-xl font-bold">
                        {absentCount}
                    </Text>
                    <Text className="text-xs text-gray-500">Absent</Text>
                </View>
            </View>

            {/* Filter Buttons */}
            <View className="flex-row justify-center gap-4 px-4 mb-3">
                {["register", "present", "absent"].map((type) => (
                    <TouchableOpacity
                        key={type}
                        className={`px-4 py-1 rounded-full border ${
                            filter === type
                                ? "bg-[--main-color] border-[--main-color]"
                                : "border-gray-300"
                        }`}
                        onPress={() => setFilter(type as any)}
                    >
                        <Text
                            className={`text-sm ${
                                filter === type
                                    ? "text-white"
                                    : "text-[--text-color]"
                            }`}
                        >
                            {type === "all"
                                ? "All"
                                : type.charAt(0).toUpperCase() + type.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Student List */}
            <View style={{ height: height / 1.5 }}>
                <FlatList
                    data={filteredUsers}
                    keyExtractor={(item) => item.user_id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 80, flexGrow: 1 }}
                    ListEmptyComponent={
                        <View className="flex-1 items-center justify-center mt-10 px-4">
                            <Ionicons
                                name="person-outline"
                                size={64}
                                color="#CBD5E1" // Tailwind: slate-300
                                style={{ marginBottom: 12 }}
                            />
                            <Text className="text-lg text-[--text-color] font-semibold mb-1">
                                No{" "}
                                {filter.charAt(0).toUpperCase() +
                                    filter.slice(1)}{" "}
                                Users
                            </Text>
                            <Text className="text-sm text-gray-400 text-center">
                                There are no users marked as {filter} for this
                                date.
                            </Text>
                        </View>
                    }
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            </View>
        </View>
    );
};

export default Attendance;
