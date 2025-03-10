import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Switch,
    ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons"; // Icons
import { api } from "#/src/services/apiinterceptors";
import { useUserStore, UserType } from "@store/dashbord/useUserStore";
import { Color, Theme } from "#/src/constants/Colors";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Header from "#/src/components/Header";
import HeaderAdmin from "./HeaderAdmin";
import UploadProfileImage from "#/src/components/UploadProfileImahe";
import { StatusBar } from "expo-status-bar";
import { EditProfileImage } from "#/src/services/user";

// Validation Schema
const profileSchema = yup.object().shape({
    name: yup.string().required("Please enter your full name"),
    email: yup
        .string()
        .email("Enter a valid email address")
        .required("Email is required"),
    phone: yup
        .string()
        .matches(/^(?:[0-9]{10,15})?$/, "Enter a valid phone number"),
    password: yup
        .string()
        .matches(
            /^$|^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
            "Password must be at least 6 characters and include both letters and numbers"
        ),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords do not match"),
    role: yup
        .string()
        .oneOf(["1", "2", "3", "a"], "Invalid role")
        .required("Role is required"),

    is_deleted: yup.boolean(),
});

const UpdateUserScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userId } = route.params as { userId: number }; // Get user ID from navigation
    const { updateUser, users, getUser } = useUserStore();
    const [loading, setLoading] = useState<boolean>(false);
    const [image, setImage] = useState<string | null>("");
    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            role: "1",
            is_deleted: false,
        },
    });

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const user = getUser(Number(userId));
        if (user) {
            setValue("name", user.name);
            setValue("email", user.email);
            setValue("phone", user.phone);
            setValue("is_deleted", user.is_deleted);
            setValue("role", user.role ? user.role : "1");
            setImage(user.img ? user.img : null);
        }
    };
    async function Edit(data: any) {
        try {
            setLoading(true);
            await api.put(`/user/dashbord/${userId}`, {
                name: data.name,
                email: data.email,
                phone: data.phone,
                is_deleted: data.is_deleted,
                password: data.password,
                role: data.role,
            });
            setLoading(false);
            updateUser(userId, "name", data.name);
            updateUser(userId, "email", data.email);
            updateUser(userId, "phone", data.phone);
            updateUser(userId, "password", data.password);
            updateUser(userId, "is_deleted", data.is_deleted);
            updateUser(userId, "role", data.role);
            Alert.alert("Success", "User updated successfully!", [
                { text: "OK", onPress: () => navigation.goBack() },
            ]);
        } catch (error) {
            setLoading(false);
            Alert.alert("Error", "Failed to update user.");
        }
    }

    const onSubmit = async (data: any) => {
        const user = getUser(Number(userId));
        if (image === user?.img) {
            await Edit(data);
        } else {
            const formData = new FormData();
            formData.append("image", {
                uri: image,
                type: "image/jpeg",
                name: "upload.jpg",
            } as any);
            setLoading(true);
            await EditProfileImage(formData, user?.id, async (res, err) => {
                setLoading(false);
                if (err) {
                    Alert.alert("Error", "Failed to update user. : Re Try...");
                    return;
                }
               await  Edit(data);
            });
        }
    };
    return (
        <ScrollView style={Theme} className="flex-1 bg-[--bg-color] pt-10">
            <StatusBar backgroundColor={Color["bg-color"]} />
            <View className=" mt-5 px-6 pb-32">
                <View className="flex-row  justify-between items-center mb-5">
                    <TouchableOpacity
                        className="flex-row items-center justify-center"
                        onPress={() => navigation.goBack()}
                    >
                        <Feather name="arrow-left" size={30} color="#000" />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-left w-[65%]">
                        Edit User
                    </Text>
                </View>
                <UploadProfileImage image={image} setImage={setImage} />
                {/* Name Input */}
                <Text className="ml-3 mt-5">Name</Text>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="bg-[--card-background] text-[--text-color] rounded-xl p-4 mb-2 border"
                            placeholder="Name"
                            placeholderTextColor="#888"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.name && (
                    <Text className="text-red-500">{errors.name.message}</Text>
                )}
                {/* Email Input */}
                <Text className="ml-3 mt-5">Email</Text>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="bg-[--card-background] text-[--text-color] rounded-xl p-4 mb-2 border"
                            placeholder="Email"
                            placeholderTextColor="#888"
                            keyboardType="email-address"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.email && (
                    <Text className="text-red-500">{errors.email.message}</Text>
                )}
                {/* Phone Input */}
                <Text className="ml-3 mt-5">Phone</Text>
                <Controller
                    control={control}
                    name="phone"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="bg-[--card-background] text-[--text-color] rounded-xl p-4 mb-2 border"
                            placeholder="Phone"
                            placeholderTextColor="#888"
                            keyboardType="phone-pad"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.phone && (
                    <Text className="text-red-500">{errors.phone.message}</Text>
                )}
                {/* Password Input */}
                <View className="flex-row w-full justify-around">
                    <View className="w-[45%]">
                        <Text className="ml-3 mt-5">Password</Text>
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    className="bg-[--card-background] text-[--text-color] rounded-xl p-4 mb-2 border"
                                    placeholder="Password"
                                    placeholderTextColor="#888"
                                    secureTextEntry
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.password && (
                            <Text className="text-red-500">
                                {errors.password.message}
                            </Text>
                        )}
                    </View>
                    {/* Confirm Password Input */}
                    <View className="w-[45%]">
                        <Text className="ml-3 mt-5">Confirm Password</Text>
                        <Controller
                            control={control}
                            name="confirmPassword"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    className="bg-[--card-background] text-[--text-color] rounded-xl p-4 mb-4 border"
                                    placeholder="Confirm Password"
                                    placeholderTextColor="#888"
                                    secureTextEntry
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.confirmPassword && (
                            <Text className="text-red-500">
                                {errors.confirmPassword.message}
                            </Text>
                        )}
                    </View>
                </View>
                {/* Role Selection */}
                <Text className="ml-3 mt-5 font-bold">User Role</Text>
                <View className="flex-row justify-evenly">
                    {["1", "a"].map((role) => {
                        const roleName =
                            role == "a"
                                ? "ADMIN"
                                : role == "1"
                                ? "STUDENT"
                                : "";
                        return (
                            <Controller
                                key={role}
                                control={control}
                                name="role"
                                render={({ field: { onChange, value } }) => (
                                    <View className="flex-row items-center mt-2">
                                        <Checkbox
                                            value={value === role}
                                            onValueChange={() => onChange(role)}
                                            color={
                                                value === role
                                                    ? "#4630EB"
                                                    : undefined
                                            }
                                        />
                                        <Text className="text-[--text-color] ml-2">
                                            {roleName}
                                        </Text>
                                    </View>
                                )}
                            />
                        );
                    })}
                </View>
                {errors.role && (
                    <Text className="text-red-500">{errors.role.message}</Text>
                )}
                <Controller
                    control={control}
                    name="is_deleted"
                    render={({ field: { onChange, value } }) => (
                        <View className="flex-row items-center justify-center mt-7">
                            <Checkbox
                                value={Boolean(value)}
                                onValueChange={onChange}
                                color={value ? "#4630EB" : undefined}
                            />
                            <Text className="text-[--text-color] mr-2 font-bold">
                                IsDeleted
                            </Text>
                        </View>
                    )}
                />
                {errors.is_deleted && (
                    <Text className="text-red-500">
                        {errors.is_deleted.message}
                    </Text>
                )}
                {/* Update Button */}
                {loading ? (
                    <View className="flex-1 justify-center items-center bg-[--bg-color]">
                        <ActivityIndicator size="large" color="blue" />
                    </View>
                ) : (
                    <TouchableOpacity
                        className="bg-[--main-color] py-4 rounded-xl flex items-center justify-center mt-10"
                        onPress={handleSubmit(onSubmit)}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text className="text-white text-lg font-semibold">
                                Update
                            </Text>
                        )}
                    </TouchableOpacity>
                )}
                {/* Back Button */}
            </View>
        </ScrollView>
    );
};

export default UpdateUserScreen;
