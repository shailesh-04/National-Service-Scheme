import React, { useEffect } from "react";
import { View, Dimensions, Image, Text } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
} from "react-native-reanimated";
import { Color } from "@/constants/Colors";
const { width } = Dimensions.get("window");

interface ImageProps {
    url: string;
}

interface EmagisProps {
    images: ImageProps[];
    title:string;
}

const ImageSlider: React.FC<EmagisProps> = ({ images,title}) => {
    const scrollX = useSharedValue(0);
    const scrollRef = React.useRef<Animated.ScrollView>(null);
    let currentIndex = 0;

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x;
    });

    useEffect(() => {
        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            scrollRef.current?.scrollTo({
                x: currentIndex * width,
                animated: true,
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    return (
        <View>
            <View className="px-10 my-2">
                <Text className="text-[20px] font-bold" style={{color:`${Color['main-color']}aa`}}>
                    {title}
                </Text>
            </View>
            <View>
                <Animated.ScrollView
                    ref={scrollRef}
                    horizontal
                    pagingEnabled
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                >
                    {images.map((image, index) => {
                        const animatedStyle = useAnimatedStyle(() => {
                            const scale = interpolate(
                                scrollX.value / width,
                                [index - 1, index, index + 1],
                                [0.8, 1, 0.8]
                            );
                            return { transform: [{ scale }] };
                        });

                        return (
                            <Animated.View
                                key={index}
                                style={[
                                    {
                                        width,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    },
                                    animatedStyle,
                                ]}
                            >
                                <Image
                                    source={{ uri: image.url }}
                                    style={{
                                        width: "90%",
                                        height: 250,
                                        borderRadius: 15,
                                    }}
                                    resizeMode="cover"
                                />
                            </Animated.View>
                        );
                    })}
                </Animated.ScrollView>
            </View>
        </View>
    );
};
export default ImageSlider;
