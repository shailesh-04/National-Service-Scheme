import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    ScrollView,
    Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Color, Theme } from "#/src/constants/Colors";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { StatusBar } from "expo-status-bar";
import { createEvent, editEvent } from "@services/dashbord/event";
import { useEventStore } from "@store/dashbord/useEventStore";
import { useUserStore } from "#/src/store/useUserStore";
import Icons from "#/src/components/Icons";
import { useRouter, useLocalSearchParams } from "expo-router";
// ✅ **Validation Schema**
const eventSchema = yup.object().shape({
    name: yup
        .string()
        .min(3, "Minimum 3 characters")
        .required("Event name is required"),
    description: yup
        .string()
        .min(10, "Minimum 10 characters")
        .required("Event description is required"),
    location: yup.string().required("Location is required"),
    start_time: yup
        .string()
        .matches(
            /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/,
            "Start time must be in format YYYY-MM-DD HH:MM"
        )
        .required("Start time is required"),
    end_time: yup
        .string()
        .matches(
            /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/,
            "End time must be in format YYYY-MM-DD HH:MM"
        )
        .required("End time is required"),
    image: yup.string().nullable(),
    created_by: yup.number(),
    is_delete: yup.boolean(),
});

const AddEventScreen = () => {
    const navigation = useNavigation();
    const { userId } = useLocalSearchParams();
    const { user } = useUserStore();
    const { addEvent, updateEvent, getEvent } = useEventStore();
    const [loading, setLoading] = useState<boolean>(false);
    const [deleted, setDeleted] = useState<boolean>(false);
    const [image, setImage] = useState<string | null>(null);
    const [id, setId] = useState<number>(0);
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(eventSchema),
        defaultValues: {
            name: "",
            description: "",
            location: "",
            start_time: "",
            end_time: "",
            created_by: user?.id ? user.id : 0, // ✅ Not editable but stored
            is_delete: false,
            image: "",
        },
    });
    function todate(isoDate: string): string {
        const date = new Date(isoDate);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
    useEffect(() => {
        const parsedEvent = getEvent(Number(userId));
        if (parsedEvent) {
            setValue("name", parsedEvent.name);
            setValue("description", parsedEvent.description?parsedEvent.description:'');
            setValue("location", parsedEvent.location?parsedEvent.location:'');
            setValue("start_time", todate(parsedEvent.start_time));
            setValue("end_time", todate(parsedEvent.end_time));
            setValue("is_delete", parsedEvent.is_deleted);
            setValue("image", parsedEvent.image);
            setImage(parsedEvent.image?parsedEvent.image:'');
            setId(parsedEvent.id);
        }
        else
        Alert.alert("Error", "No Data Found", [
            {
                text: "OK",
                onPress: () => {
                    navigation.goBack();
                },
            },
        ]);   
    }, []);
    const onSubmit = async (form: any) => {
        const formData = new FormData();
        Object.keys(form).forEach((key) => {
            if (key == "image" && form.image != image) {
                formData.append("image", {
                    uri: image,
                    type: "image/jpeg",
                    name: "upload.jpg",
                } as any);
            } else formData.append(`${key}`, `${form[key]}`);
        });
        formData.append("is_deleted", `${deleted}`);
        setLoading(true);
        editEvent(id, formData, (res, err) => {
            setLoading(false);
            if (err) {
                Alert.alert("Add Event Error! ReTry.", err);
                return;
            }
            Alert.alert("Success", "Event added successfully!", [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.goBack();
                    },
                },
            ]);
        });
    };
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled && result.assets.length > 0) {
            setImage(result.assets[0].uri);
        }
    };
    return (
        <ScrollView style={Theme} className="flex-1 bg-[--bg-color] py-10">
            <StatusBar backgroundColor={Color["bg-color"]} />
            <View className="mt-5 px-6">
                {/* Header */}
                <View className="flex-row justify-between items-center mb-5 relative">
                    <Text className="text-2xl font-bold text-center w-full">
                        Add New Event
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className=" absolute"
                    >
                        <Feather name="arrow-left" size={30} color="#000" />
                    </TouchableOpacity>
                </View>
                {/* Image Upload */}
                <View className="items-center">
                    <TouchableOpacity
                        className=" h-52 w-full border rounded  relative overflow-hidden"
                        onPress={pickImage}
                    >
                        {image ? (
                            <Image
                                source={{ uri: image }}
                                resizeMode="cover"
                                className="w-full h-full"
                            />
                        ) : (
                            <View className="w-full h-full bg-gray-300  items-center justify-center">
                                <Icons.AntDesign
                                    name="calendar"
                                    size={50}
                                    color="white"
                                />
                            </View>
                        )}
                        <View
                            className="absolute bottom-0 left-0 w-full items-center h-10"
                            style={{
                                backgroundColor: `${Color["text-color"]}22`,
                            }}
                        >
                            <Icons.AntDesign
                                name="edit"
                                size={24}
                                color="black"
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Event Name */}
                <Text className="ml-3 mt-5">Event Name</Text>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="bg-[--card-background] text-[--text-color] rounded-xl p-4 mb-2 border"
                            placeholder="Enter event name"
                            placeholderTextColor="#888"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.name && (
                    <Text className="text-red-500">{errors.name.message}</Text>
                )}

                {/* Description (Rich Text Box) */}
                <Text className="ml-3 mt-5">Description</Text>
                <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            multiline={true}
                            numberOfLines={5}
                            className="bg-[--card-background] text-[--text-color] rounded-xl p-4 mb-2 border"
                            placeholder="Enter event description"
                            placeholderTextColor="#888"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.description && (
                    <Text className="text-red-500">
                        {errors.description.message}
                    </Text>
                )}

                {/* Location */}
                <Text className="ml-3 mt-5">Location</Text>
                <Controller
                    control={control}
                    name="location"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="bg-[--card-background] text-[--text-color] rounded-xl p-4 mb-2 border"
                            placeholder="Enter event location"
                            placeholderTextColor="#888"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.location && (
                    <Text className="text-red-500">
                        {errors.location.message}
                    </Text>
                )}

                {/* Start Time */}
                <Text className="ml-3 mt-5">Start Time</Text>
                <Controller
                    control={control}
                    name="start_time"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="bg-[--card-background] text-[--text-color] rounded-xl p-4 mb-2 border"
                            placeholder="YYYY-MM-DD HH:MM:SS"
                            placeholderTextColor="#888"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.start_time && (
                    <Text className="text-red-500">
                        {errors.start_time.message}
                    </Text>
                )}

                {/* End Time */}
                <Text className="ml-3 mt-5">End Time</Text>
                <Controller
                    control={control}
                    name="end_time"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="bg-[--card-background] text-[--text-color] rounded-xl p-4 mb-2 border"
                            placeholder="YYYY-MM-DD HH:MM:SS"
                            placeholderTextColor="#888"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.end_time && (
                    <Text className="text-red-500">
                        {errors.end_time.message}
                    </Text>
                )}

                {/* End Time */}

                <Controller
                    control={control}
                    name="is_delete"
                    render={({ field: { onChange, value } }) => (
                        <TouchableOpacity
                            className="flex-row items-center justify-center mt-5"
                            onPress={() => {
                                onChange(!value);
                                setDeleted(!deleted);
                            }}
                        >
                            <Text className="font-bold">Delete</Text>
                            {value ? (
                                <Icons.AntDesign
                                    name="delete"
                                    size={25}
                                    color="red"
                                />
                            ) : (
                                <Icons.AntDesign
                                    name="delete"
                                    size={25}
                                    color="green"
                                />
                            )}
                        </TouchableOpacity>
                    )}
                />
                {errors.is_delete && (
                    <Text className="text-red-500">
                        {errors.is_delete.message}
                    </Text>
                )}
                {/* Submit Button */}
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
                                Submit
                            </Text>
                        )}
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
};

export default AddEventScreen;
