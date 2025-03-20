import { setAlert } from "#/src/components/Alert";
import { fetchImages, ImageData } from "#/src/services/images";
import { useEffect, useState } from "react";
import {
    FlatList,
    Text,
    SafeAreaView,
    View,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import Icons from "#/src/components/Icons";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import Button from "#/src/components/ui/button";
import { updateValue } from "#/src/services/storage";
import { Color } from "../EditProfile";
import useAlert from "#/src/store/useAlert";

const ManageImages = () => {
    const [gallery, setGallery] = useState<ImageData[]>([]);
    const navigation = useNavigation();
    const { imageId } = useLocalSearchParams();
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const setAlert = useAlert((s) => s.setAlert);
    useEffect(() => {
        fetchImages((res, err) => {
            if (err) setAlert(err, "error");
            setGallery(res);
        });
        setSelectedImages(imageId ? imageId.split(",") : []);
    }, []);
    const toggleSelection = (id: string) => {
        setSelectedImages((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };
    function handleSubmit() {
        setLoading(true);
        updateValue(selectedImages.join(), (res, err) => {
            setLoading(false);
            if (err) {
                Alert.alert(err);
                return;
            }
            setAlert("Home Gallery Updated Successfuly","success");
            navigation.goBack();
        });
    }
    return (
        <View className="px-5">
            <SafeAreaView className="py-10 h-[90%]">
                <View className="flex-row justify-between items-center mb-5 relative bg-white py-5 rounded-full">
                    <Text className="text-[10px] text-center w-full">
                        SELECT AND REMOVE IMAGE FOR HOME GALLERY
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="absolute left-4"
                    >
                        <Icons.Feather
                            name="arrow-left"
                            size={30}
                            color="#000"
                        />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={gallery}
                    numColumns={2}
                    keyExtractor={(item) => item.id.toString()}
                    columnWrapperStyle={{ justifyContent: "space-evenly" }}
                    contentContainerStyle={{ gap: 12 }}
                    scrollEnabled={true}
                    renderItem={({ item }) => {
                        const isSelected = selectedImages.includes(
                            item.id.toString()
                        );
                        return (
                            <TouchableOpacity
                                onPress={() =>
                                    toggleSelection(item.id.toString())
                                }
                                className="w-[40%] aspect-square rounded-2xl shadow-md overflow-hidden mt-3"
                                style={{
                                    borderWidth: 2,
                                    borderColor: isSelected
                                        ? `${Color["main-color"]}`
                                        : "transparent",
                                }}
                            >
                                <Image
                                    source={{ uri: item.imageurl }}
                                    className="w-full h-full"
                                />
                            </TouchableOpacity>
                        );
                    }}
                />
            </SafeAreaView>
            {loading ? (
                <ActivityIndicator />
            ) : (
                <Button
                    onPress={() => {
                        handleSubmit();
                    }}
                >
                    Submit
                </Button>
            )}
        </View>
    );
};

export default ManageImages;
