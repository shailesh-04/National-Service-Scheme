import { useEffect } from "react";
import Animated, { 
  useSharedValue, 
  withSpring, 
  useAnimatedStyle, 
  runOnJS 
} from "react-native-reanimated";
import { View, Text, Pressable } from "react-native";

interface NotificationProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: (value: string | null) => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type = "info", onClose }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-50);

  useEffect(() => {
    opacity.value = withSpring(1);
    translateY.value = withSpring(0);

    const timer = setTimeout(() => {
      opacity.value = withSpring(0, {}, () => runOnJS(onClose)(null));
      translateY.value = withSpring(-50);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const getColor = () => {
    switch (type) {
      case "success": return "bg-green-500 border-green-700";
      case "error": return "bg-red-500 border-red-700";
      default: return "bg-blue-500 border-blue-700";
    }
  };

  return (
    <Animated.View style={animatedStyle} 
      className={"absolute top-10 left-5 right-5 p-4 rounded-lg border z-[100] " + getColor()}>
      <View className="flex-row justify-between items-center">
        <Text className="text-white font-semibold">{message}</Text>
        <Pressable onPress={() => onClose(null)} className="ml-3 px-2 py-1 bg-white/20 rounded">
          <Text className="text-white">X</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default Notification;
