import React, { useEffect, useState } from "react";
import { View, Image, ScrollView, TextInput, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { BASE_URL } from "#/src/services/config";
import { useLocalSearchParams } from "expo-router";
import Button from "#/src/components/ui/button";

const MultiImageUpload = () => {
    const { eventID } = useLocalSearchParams();
    const [images, setImages] = useState<string[]>([]);
    const [Id, setId] = useState<string>(eventID ? String(eventID) : "");
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"], // Correct media type
            allowsMultipleSelection: false, // Pick one at a time
            quality: 1,
        });
        if (!result.canceled) {
            setImages([...images, result.assets[0].uri]); // Store selected images
        }
    };

    const uploadImages = async () => {
        if (!Id) {
            Alert.alert("Error", "Please enter an Event ID.");
            return;
        }

        const formData = new FormData();
        formData.append("E_id", Id); // Match web form's "E_id"

        images.forEach((imageUri, index) => {
            formData.append("images", {
                uri: imageUri,
                name: `image_${index}.jpg`,
                type: "image/jpeg",
            } as any);
        });

        try {
            const response = await axios.post(`${BASE_URL}images`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            Alert.alert("Success", "Images uploaded successfully!");
            console.log("Upload successful:", response.data);
            setImages([]); // Clear images after upload
        } catch (error) {
            console.error("Upload failed:", error);
            Alert.alert("Upload Error", "Failed to upload images.");
        }
    };

    useEffect(() => {
        console.log(eventID);
    }, []);

    return (
        <View className="mt-10 p-4">
            {/* Input for Event ID */}
            <TextInput
                placeholder="Enter Event ID"
                value={Id}
                onChangeText={setId}
                keyboardType="numeric"
                className="border p-2 mb-4 text-black bg-white rounded"
            />

            {/* Pick Image Button */}
            <Button onPress={pickImage}>Pick Image</Button>

            {/* Display Selected Images */}
            <ScrollView horizontal className="mt-4">
                {images.map((uri, index) => (
                    <Image
                        key={index}
                        source={{ uri }}
                        style={{ width: 100, height: 100, margin: 5 }}
                    />
                ))}
            </ScrollView>

            {/* Upload Button */}
            <Button onPress={uploadImages}>Upload Images</Button>
        </View>
    );
};

export default MultiImageUpload;
