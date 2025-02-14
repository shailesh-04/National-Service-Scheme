import { View, Platform } from "react-native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
    FontAwesome,
    AntDesign,
    MaterialIcons,
    SimpleLineIcons,
} from "@expo/vector-icons";
import React from "react";

const MyTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const icons: Record<string, JSX.Element> = {
        index: <SimpleLineIcons name="home" size={24} color="black" />,
        Events: <AntDesign name="calendar" size={24} color="black" />,
        Explore: <MaterialIcons name="explore" size={24} color="black" />,
        Profile: <FontAwesome name="user-circle-o" size={24} color="black" />,
    };

    return (
        <View className="flex-row bg-white py-2 shadow-md border-t border-gray-200">
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const { options } = descriptors[route.key];
                const label: string =
                    options.tabBarLabel !== undefined
                        ? (options.tabBarLabel as string)
                        : options.title !== undefined
                        ? (options.title as string)
                        : route.name;

                return (
                    <PlatformPressable
                        key={route.key}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        onPress={() => !isFocused && navigation.navigate(route.name)}
                        className="flex-1 items-center"
                    >
                        {icons[route.name] || <SimpleLineIcons name="question" size={24} color="black" />}
                        <Text style={{ color: isFocused ? 'black' : 'red' }}>{label}</Text>
                    </PlatformPressable>
                );
            })}
        </View>
    );
};

export default MyTabBar;
