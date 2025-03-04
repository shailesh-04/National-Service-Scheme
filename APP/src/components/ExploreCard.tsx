import React, { useState, useEffect } from "react";
import {
    View,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    Modal,
} from "react-native";
import { ImageProps } from "@/services/images";
import * as Icon from "@expo/vector-icons";
import { Color } from "@/constants/Colors";
import { useRouter } from "expo-router";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

const ExploreCard: React.FC<{ event: ImageProps }> = ({ event }) => {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Animation for card entrance
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(10);

    useEffect(() => {
        opacity.value = withSpring(1, { damping: 10, stiffness: 100 });
        translateY.value = withSpring(0, { damping: 10, stiffness: 100 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <Animated.View 
            style={animatedStyle}
            className="mb-6 p-4 bg-white rounded-xl shadow-lg"
        >
            <View className="flex-row justify-between items-center py-2">
                <Text className="text-xl font-bold">
                    {event.name.length > 20 ? event.name.substring(0, 20) + "..." : event.name}
                </Text>
                <TouchableOpacity
                    className="flex-row justify-center items-center"
                    onPress={() => {
                        router.push({
                            pathname: "/screen/FullEvent",
                            params: {
                                data: JSON.stringify(event.id),
                            },
                        });
                    }}
                >
                    <Text style={{ color: `${Color["text-color"]}88` }} className="text-[14px]">
                        See Event
                    </Text>
                    <Icon.AntDesign name="caretright" size={15} color={`${Color["text-color"]}88`} />
                </TouchableOpacity>
            </View>

            {/* Image Grid */}
            <FlatList
                data={event.images}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                contentContainerStyle={{ gap: 12 }}
                scrollEnabled={false}
                renderItem={({ item }) => <AnimatedImage item={item} onPress={() => setSelectedImage(item.imageurl)} />}
            />

            {/* Image Modal Preview */}
            {selectedImage && (
                <Modal transparent visible={true} animationType="fade">
                    <View className="flex-1 bg-black/90 justify-center items-center">
                        <TouchableOpacity
                            className="absolute top-10 right-5"
                            onPress={() => setSelectedImage(null)}
                        >
                            <Icon.AntDesign name="closecircle" size={30} color="#fff" />
                        </TouchableOpacity>
                        <Image source={{ uri: selectedImage }} className="w-[90%] h-[70%] rounded-lg" />
                    </View>
                </Modal>
            )}
        </Animated.View>
    );
};

// Animated Image Component
const AnimatedImage: React.FC<{ item: any; onPress: () => void }> = ({ item, onPress }) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <TouchableOpacity
            className="w-[48%] aspect-square bg-white rounded-2xl shadow-md overflow-hidden mt-3"
            onPress={() => {
                scale.value = withSpring(0.95, { damping: 10, stiffness: 200 });
                onPress();
                scale.value = withSpring(1, { damping: 10, stiffness: 200 });
            }}
        >
            <Animated.View style={animatedStyle}>
                <Image source={{ uri: item.imageurl }} className="w-full h-full" />
            </Animated.View>
        </TouchableOpacity>
    );
};

export default ExploreCard;
