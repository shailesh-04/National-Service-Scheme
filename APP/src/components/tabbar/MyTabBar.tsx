import { View, StyleSheet } from "react-native";
import {PlatformPressable } from "@react-navigation/elements";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import React from "react";
import TabCard from "./TabCard";

const MyTabBar: React.FC<BottomTabBarProps> = ({
    state,
    descriptors,
    navigation,
}) => {
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
                       <TabCard name={route.name} isFocused={isFocused} label={label}/>
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
