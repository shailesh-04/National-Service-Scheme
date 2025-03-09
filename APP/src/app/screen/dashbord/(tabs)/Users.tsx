import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator,
    RefreshControl,
    SafeAreaView,
} from "react-native";
import { useEffect, useState, useCallback, useRef } from "react";
import { AntDesign, Feather } from "@expo/vector-icons"; // Expo Icons
import { useRouter } from "expo-router";
import {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated"; // Reanimated
import { useUserStore, UserType } from "@store/dashbord/useUserStore";
import { Color, Theme } from "#/src/constants/Colors";
import { api } from "#/src/services/apiinterceptors";
import useAlert from "#/src/store/useAlert";
import HeaderAdmin from "../HeaderAdmin";
import Button from "#/src/components/ui/button";

const UserScreen = () => {
    const { users, removeUser, setUsers, updateUser, clearUsers } =
        useUserStore();
    const [loading, setLoading] = useState(false);
    const [isDeleted, setIsDelted] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedUsersForDeletion, setSelectedUsersForDeletion] = useState<
        number[]
    >([]);
    const flatListRef = useRef<FlatList>(null);
    const navigation = useRouter();
    const { setAlert } = useAlert();
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 300 });
        translateY.value = withTiming(0, { duration: 300 });
        const deletedUserIds = users
            .filter((user) => user.is_deleted)
            .map((user) => user.id);
        setSelectedUsersForDeletion(deletedUserIds);
    }, []);
    const loadUsers = async () => {
        setLoading(false);
        try {
            const response = await api.get<UserType[]>(`/user/dashbord/`);
            setUsers(response.data);
            const deletedUserIds = response.data
                .filter((user) => user.is_deleted)
                .map((user) => user.id);
            setSelectedUsersForDeletion(deletedUserIds);
        } catch (error) {
            setAlert("Check Your Network");
        }
        setLoading(false);
    };
    const onRefresh = useCallback(async () => {
        setRefreshing(true); // Start the refresh spinner
        await loadUsers();
        setRefreshing(false); // Stop the refresh spinner once data is loaded
    }, []);

    const handleToggleCheckbox = async (id: number) => {
        const user = users.find((u) => u.id === id);
        if (!user) {
            setAlert("User not found");
            return;
        }
        const newDeletedStatus = !user.is_deleted; // Toggle is_deleted status
        Alert.alert(
            "Delete User",
            `Are you sure you want to ${
                newDeletedStatus ? "delete" : "restore"
            } this user?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK",
                    onPress: async () => {
                        try {
                            // Send full user data with updated is_deleted status
                            await api.put(`/user/dashbord/${id}`, {
                                ...user, // Send all user data
                                is_deleted: newDeletedStatus, // Toggle the delete status
                            });

                            // Update store and check state
                            updateUser(id, "is_deleted", newDeletedStatus);
                            setSelectedUsersForDeletion((prev) =>
                                newDeletedStatus
                                    ? [...prev, id]
                                    : prev.filter((userId) => userId !== id)
                            );
                        } catch (error) {
                            setAlert("Failed to update user status");
                        }
                    },
                },
            ]
        );
    };

    const handleEdit = (id: number) => {
        navigation.push({
            pathname: "/screen/dashbord/EditUser",
            params: {
                userId: id,
            },
        }); // Navigate to Edit Page
    };

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));
    const filteredUsers = isDeleted
        ? users
        : users.filter((user) => !user.is_deleted);
    return (
        <SafeAreaView style={Theme} className="bg-[--bg-color] flex-1 relative">
            <HeaderAdmin />
            <View className="px-5 mt-3 h-[70%] ">
                <View className="flex-row justify-between mt-4 items-center">
                    <Text className="text-[--text-color] text-xl font-semibold mb-4">
                        User Dashboard
                    </Text>
                    <Text className=" w-auto flex-1 text-right ">
                        Show Deleted
                    </Text>
                    <TouchableOpacity
                        className=" ml-5 border items-center justify-center h-10 w-10 rounded-2xl mr-10"
                        onPress={() => {
                            setIsDelted(!isDeleted);
                            const temp = users;
                            clearUsers();
                            setUsers(temp);
                        }}
                    >
                        {isDeleted ? (
                            <Feather name="check" size={24} color="black" />
                        ) : (
                            <Feather name="x" size={24} color="black" />
                        )}
                    </TouchableOpacity>
                </View>
                <Button
                    className="w-[40%] mb-5"
                    style={{ width: "50%" }}
                    onPress={() => {
                        navigation.push("/screen/dashbord/NewUser");
                    }}
                >
                    AddUser
                </Button>
                {loading ? (
                    <ActivityIndicator
                        size="large"
                        color="blue"
                        className="mt-10"
                    />
                ) : (
                    <FlatList
                        className=""
                        ref={flatListRef}
                        data={filteredUsers}
                        keyExtractor={(item) => item.id.toString()}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        renderItem={({ item, index }) => {
                            return (
                                <Animated.View
                                    entering={FadeInDown.delay(index * 100)}
                                    exiting={FadeOutUp}
                                    className="mb-3"
                                >
                                    <TouchableOpacity onPress={()=>{
                                        navigation.push({
                                            pathname: "/screen/dashbord/ViewUser",
                                            params: { user: JSON.stringify(item) },
                                          })
                                    }}>
                                        <Animated.View
                                            className="bg-[--bg-color] p-4 rounded-xl flex-row items-center justify-between shadow-md"
                                            style={animatedStyle}
                                        >
                                            <View className="flex-row items-center gap-5">
                                                {item.img ? (
                                                    <Image
                                                        source={{
                                                            uri: item.img,
                                                        }}
                                                        className="w-12 h-12 rounded-full mr-3"
                                                    />
                                                ) : (
                                                    <View className="w-12 h-12 bg-[--second-color] rounded-full flex items-center justify-center">
                                                        <Text className="text-white text-lg font-semibold">
                                                            {item.name[0]}
                                                        </Text>
                                                    </View>
                                                )}
                                                <View>
                                                    <Text className="text-[--text-color] font-semibold">
                                                        {item.name}
                                                    </Text>
                                                    <Text className="text-[--light-dark-color]">
                                                        {item.email}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View className="flex-row gap-3">
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        handleEdit(item.id)
                                                    }
                                                >
                                                    <Feather
                                                        name="edit"
                                                        size={22}
                                                        color={
                                                            Color["main-color"]
                                                        }
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        handleToggleCheckbox(
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    {selectedUsersForDeletion.includes(
                                                        item.id
                                                    ) ? (
                                                        <AntDesign
                                                            name="checksquare"
                                                            size={22}
                                                            color="red"
                                                        />
                                                    ) : (
                                                        <AntDesign
                                                            name="checksquareo"
                                                            size={22}
                                                            color={
                                                                Color[
                                                                    "main-color"
                                                                ]
                                                            }
                                                        />
                                                    )}
                                                </TouchableOpacity>
                                            </View>
                                        </Animated.View>
                                    </TouchableOpacity>
                                </Animated.View>
                            );
                        }}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default UserScreen;
