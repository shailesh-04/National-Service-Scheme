import { Tabs } from "expo-router";
import { FontAwesome, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Color } from "@constants/Colors";
import MyTabBar from "@components/tabbar/MyTabBar";
export default function TabLayout() {
    return (
        <Tabs tabBar={(props) => <MyTabBar {...props} />}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                }}
            />
             <Tabs.Screen
                name="Users"
                options={{
                    title: "Users",
                    headerShown: false,
                }}
            />{/*
            <Tabs.Screen
                name="Explore"
                options={{
                    title: "Explore",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                }}
            /> */}
        </Tabs>
    );
}

