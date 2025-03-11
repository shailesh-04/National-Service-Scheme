import { useEffect } from "react";
import Animated, { 
  useSharedValue, 
  withSpring, 
  useAnimatedStyle, 
  runOnJS 
} from "react-native-reanimated";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Icon library

interface AlertProps {
  message: string;
  type?: "success" | "error" | "info" | "warn";
  onClose: (value: string | null) => void;
}

export const Alert: React.FC<AlertProps> = ({ message, type = "info", onClose }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-50);

  useEffect(() => {
    opacity.value = withSpring(1);
    translateY.value = withSpring(0);

    const timer = setTimeout(() => {
      opacity.value = withSpring(0, {}, () => runOnJS(onClose)(null));
      translateY.value = withSpring(-50);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const getAlertStyle = () => {
    switch (type) {
      case "success": return "bg-green-500 border-green-700";
      case "error": return "bg-red-500 border-red-700";
      case "warn": return "bg-yellow-500 border-yellow-700";
      default: return "bg-blue-500 border-blue-700";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success": return "checkmark-circle";
      case "error": return "close-circle";
      case "warn": return "warning";
      default: return "information-circle";
    }
  };

  return (
    <Animated.View style={animatedStyle} 
      className={`absolute top-12 left-5 right-5 p-4 rounded-lg border shadow-lg z-[100] flex-row items-center ${getAlertStyle()}`}>
      
      <Ionicons name={getIcon()} size={24} color="white" className="mr-3" />

      <Text className="text-white font-medium flex-1">{message}</Text>

      <Pressable onPress={() => onClose(null)} className="ml-3 px-2 py-1">
        <Ionicons name="close" size={20} color="white" />
      </Pressable>
    </Animated.View>
  );
};


import useAlert from "../store/useAlert";

export const  setAlert = (alert: string, type?: "success" | "error" | "info" | "warn")=>{

  const setAlerData = useAlert(state=>setAlert);
  setAlerData(alert,type);

}
