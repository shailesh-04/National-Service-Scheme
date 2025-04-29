import React, { useEffect, useState } from "react";
import {
    View,
    Image,
    ScrollView,
    TextInput,
    Alert,
    TouchableOpacity,
    FlatList,
    Text,
    ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Button from "#/src/components/ui/button";
import { height, width } from "#/src/constants/Dimention";
import useAlert from "#/src/store/useAlert";
const BASE_URL = process.env.EXPO_PUBLIC_URL;

const MultiImageUpload = () => {
    const { eventID, eventName } = useLocalSearchParams();
    const router = useRouter();
    const setAlert = useAlert((s) => s.setAlert);
    const [images, setImages] = useState<string[]>([]);
    const [Id, setId] = useState<string>(eventID ? String(eventID) : "");
    const [loading, setLoading] = useState(false);
    const [eName, setEName] = useState<string>(eventName?String(eventName):"");

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImages = result.assets.map((asset) => asset.uri);
            setImages([...images, ...selectedImages]); // Append new images
        }
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const uploadImages = async () => {
        if (!Id) {
            Alert.alert("Error", "Please enter an Event ID.");
            return;
        }
        if(!images.length){
            Alert.alert("Error", "You Cant Select Any Image For Upload!");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("E_id", Id);

        images.forEach((imageUri, index) => {
            formData.append("images", {
                uri: imageUri,
                name: `image_${index}.jpg`,
                type: "image/jpeg",
            } as any);
        });

        try {

            const response = await axios.post(`${BASE_URL}images`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setAlert("Successfuly Update Event!", "success");
            router.back();
            setImages([]);
        } catch (error) {
            console.error("Upload failed:", error);
            Alert.alert("Upload Error", "Failed to upload images.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log(eventID);
    }, []);

    return (
        <View className="flex-1 p-4 pt-10 bg-white ">
            {/* Custom Header */}
            <View className="flex-row items-center p-4 rounded-3xl bg-gray-100 border-b border-gray-300">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text className="ml-4 text-lg font-bold">Upload Images</Text>
            </View>

            <View className="p-4">
                {/* Event ID Input */}
                <TextInput
                    placeholder="Enter Event ID"
                    value={eName}
                    editable={false} // Makes the input read-only
                    keyboardType="numeric"
                    className="border p-2 mb-4 text-black bg-white rounded"
                />

                {/* Pick Image Button */}
                <Button onPress={pickImage} >Pick Images</Button>

                {/* Display Selected Images in Grid Format */}
                <FlatList
                    data={images}
                    numColumns={3}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View className="relative m-2">
                            <Image
                                source={{ uri: item }}
                                className="rounded"
                                style={{
                                    width:width/3.8,
                                    height:width/3.8
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                            >
                                <Ionicons name="close" size={16} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    )}
                />

                {/* Upload Button or Loading Indicator */}
                {loading ? (
                    <ActivityIndicator size="large" color="#4A43EC" className="mt-5" />
                ) : (
                    <Button className="mt-5" onPress={uploadImages}>Upload Images</Button>
                )}
            </View>
        </View>
    );
};

export default MultiImageUpload;
