import React, { useEffect } from "react";
import { View, Dimensions, Image, Text } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
} from "react-native-reanimated";
import { Color } from "@/constants/Colors";
import { StorageImagesType } from "../services/storage";
import { height } from "../constants/Dimention";
const { width } = Dimensions.get("window");
interface EmagisProps {
    images: StorageImagesType[];
    title: string;
}
const ImageSlider: React.FC<EmagisProps> = ({ images, title }) => {
    const scrollX = useSharedValue(0);
    const scrollRef = React.useRef<Animated.ScrollView>(null);
    let currentIndex = 0;

    const loopImages = [...images, images[0]];

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x;
    });

    useEffect(() => {
        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % loopImages.length;
            scrollRef.current?.scrollTo({
                x: currentIndex * width,
                animated: true,
            });

            if (currentIndex === loopImages.length - 1) {
                setTimeout(() => {
                    scrollRef.current?.scrollTo({ x: 0, animated: false });
                    currentIndex = 0;
                }, 500);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View>
            <View className="px-10 my-2 mt-10">
                <Text
                    className="text-[20px] font-bold"
                    style={{ color: `${Color["main-color"]}dd` }}
                >
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
                    {loopImages.map((image, index) => (
                        <View
                            key={index}
                            style={{
                                width,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Image
                                source={{ uri:image.imageurl }}
                                
                                style={{
                                    width: "90%",
                                    height: height/3.5,
                                    borderRadius: 15,
                                }}
                                resizeMode="cover"
                            />
                        </View>
                    ))}
                </Animated.ScrollView>
            </View>
        </View>
    );
};

export default ImageSlider;
