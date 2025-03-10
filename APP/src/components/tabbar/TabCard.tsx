import React from "react";
import { View, Text,TouchableOpacity } from "react-native";
import {
    FontAwesome,
    AntDesign,
    MaterialIcons,
    SimpleLineIcons,
} from "@expo/vector-icons";

const icons: Record<string, (size?: number, color?: string) => JSX.Element> = {
    index: (size = 24, color = "black") => (
        <SimpleLineIcons name="home" size={size} color={color} />
    ),
    Events: (size = 24, color = "black") => (
        <AntDesign name="calendar" size={size} color={color} />
    ),
    Explore: (size = 24, color = "black") => (
        <MaterialIcons name="explore" size={size} color={color} />
    ),
    Profile: (size = 24, color = "black") => (
        <FontAwesome name="user-circle-o" size={size} color={color} />
    ),
    Users: (size = 24, color = "black") => (
        <FontAwesome name="user-circle-o" size={size} color={color} />
    ),
    Images: (size = 24, color = "black") => (
        <FontAwesome name="image" size={size} color={color} />
    ),
};
export interface TabCardProps {
    isFocused: boolean;
    name: string;
    label: string;
}
const TabCard: React.FC<TabCardProps> = ({ isFocused, name, label }) => {
     const noIcon =  <SimpleLineIcons name="question" size={24} color="black"/>;
    return (
        <View className="items-center">
            {isFocused
                ? icons[name](30, "blue") || (
                     {noIcon}
                  )
                : icons[name](24, "#666") || (
                    {noIcon} 
                  )}
            <Text
                style={{
                    color: isFocused ? "blue" : "#666",
                    fontSize: 12,
                }}
            >
                {label}
            </Text>
        </View>
    );
};
export default TabCard;
