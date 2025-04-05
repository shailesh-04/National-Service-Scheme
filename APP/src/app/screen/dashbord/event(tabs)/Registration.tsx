import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    ScrollView,
    Animated,
    Image,
} from "react-native";
import { useUserStore } from "#/src/store/dashbord/useUserStore";
import { Theme } from "#/src/constants/Colors";
import { api } from "#/src/services/apiinterceptors";
import { Ionicons } from "@expo/vector-icons";
import { setAlert } from "#/src/components/Alert";
import { useEvent } from '#/src/context/useEvent';

const AcceptRejectScreen = () => {
    const { eventId } = useEvent();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { users, setUsers } = useUserStore();
    const [loading, setLoading] = useState(false);
    const [eventUsers, setEventUsers] = useState<any[]>([]);
    const fadeAnim = useState(new Animated.Value(1))[0];
    
    const router = useRouter();

    useEffect(() => {
        if (id||eventId) {
            fetchUsersInEvent(id?id:eventId?eventId:''  );
        }
    }, [id]);

    const fetchUsersInEvent = async (eventId: string) => {
        setLoading(true);
        try {
            const response = await api.get(
                `event-registration/inEventfindUsers/${eventId}`
            );
            setEventUsers(response.data);

            if (users.length === 0) {
                await fetchAllUsers();
            }
        } catch (error) {
            setAlert("Not Fetching Any Data", "error");
        } finally {
            setLoading(false);
        }
    };
    const fetchUsersInEventAfter = async (eventId: string) => {
        try {
            const response = await api.get(
                `event-registration/inEventfindUsers/${eventId}`
            );
            setEventUsers(response.data);

            if (users.length === 0) {
                await fetchAllUsers();
            }
        } catch (error) {
            Alert.alert("Error", "Failed to fetch users");
        }
    };

    const fetchAllUsers = async () => {
        try {
            const response = await api.get(`/user/dashbord/`);
            setUsers(response.data);
        } catch (error) {
            Alert.alert("Error", "Check Your Network");
        }
    };

    const changeStatus = async (
        userId: number,
        status: "confirmed" | "cancelled"
    ) => {
        try {
            await api.put(`event-registration/${userId}`, { status });
            fetchUsersInEventAfter(id?id:eventId?eventId:'');
        } catch (error) {
            console.error("Failed to update status", error);
        } finally {
        }
    };

    return (
        <ScrollView style={Theme} className="flex-1 bg-[--bg-color]">
            {/* Custom Header */}
            <View className="flex-row items-center px-4 pb-5 pt-10 shadow-lg bg-[--main-color]">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text className="text-white text-xl ml-4">Event Users</Text>
            </View>
            <View className="px-5 mt-10">
                {loading ? (
                    <ActivityIndicator
                        size="large"
                        color={Theme["--main-color"]}
                    />
                ) : eventUsers.length > 0 ? (
                    eventUsers.map((user: any) => {
                        const eventUser = users.find(
                            (u) => u.id === user.user_id
                        );
                        return (
                            <Animated.View
                                key={user.id}
                                style={{ opacity: fadeAnim }}
                                className="bg-[--bg-color] flex-row justify-between items-center p-4 mb-3 rounded-lg shadow-md border border-[--light-dark-color]"
                            >
                                <View>
                                    {eventUser?.img ? (
                                        <Image
                                            source={{
                                                uri: eventUser.img,
                                            }}
                                            className="w-16 h-16 rounded-full"
                                        />
                                    ) : (
                                        <View className="w-12 h-12 bg-[--second-color] rounded-full flex items-center justify-center">
                                            <Text className="text-white text-lg font-semibold">
                                                {eventUser?.name[0]}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                <View>
                                    <Text className="text-[--text-color] text-lg">
                                        {eventUser?.name || "Unknown"}
                                    </Text>
                                    <Text className="text-[--light-dark-color] font-bold">
                                        {user.status}
                                    </Text>
                                </View>
                                <View className=" space-x-2 gap-2">
                                    <TouchableOpacity
                                        className="bg-[--main-color] px-4 py-2 rounded-lg shadow"
                                        onPress={() =>
                                            changeStatus(user.id, "confirmed")
                                        }
                                    >
                                        <Text className="text-white">
                                            ✅ Accept
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className="bg-[--second-color] px-4 py-2 rounded-lg shadow"
                                        onPress={() =>
                                            changeStatus(user.id, "cancelled")
                                        }
                                    >
                                        <Text className="text-white">
                                            ❌ Reject
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </Animated.View>
                        );
                    })
                ) : (
                    <Text className="text-[--light-dark-color] text-center mt-5">
                        No users found for this event 😞
                    </Text>
                )}
            </View>
        </ScrollView>
    );
};

export default AcceptRejectScreen;
