import { View, Platform, StyleSheet } from "react-native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
    FontAwesome,
    AntDesign,
    MaterialIcons,
    SimpleLineIcons,
} from "@expo/vector-icons";
import React from "react";

const MyTabBar: React.FC<BottomTabBarProps> = ({
    state,
    descriptors,
    navigation,
}) => {
    const icons: Record<
        string,
        (size?: number, color?: string) => JSX.Element
    > = {
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
    };

    return (
        <View style={styles.tabbar}>
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
                        onPress={() =>
                            !isFocused && navigation.navigate(route.name)
                        }
                        className="flex-1 items-center"
                    >
                        {isFocused
                            ? icons[route.name](30,'blue') || (
                                  <SimpleLineIcons
                                      name="question"
                                      size={24}
                                      color="black"
                                  />
                              )
                            : icons[route.name](24,'#666') || (
                                  <SimpleLineIcons
                                      name="question"
                                      size={24}
                                      color="black"
                                  />
                              )}
                        <Text style={{ color: isFocused ? "blue" : "#666",fontSize:12 }} >
                            {label}
                        </Text>
                    </PlatformPressable>
                );
            })}
        </View>
    );
};
const styles = StyleSheet.create({
    tabbar: {
        position: "absolute",
        bottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 25,
        borderCurve: "continuous",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
    },
});
export default MyTabBar;
