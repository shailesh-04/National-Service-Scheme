import { Tabs } from "expo-router";
import { FontAwesome, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Color } from "@/constants/Colors";
import MyTabBar from "@/components/tabbar/MyTabBar";
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
                name="Events"
                options={{
                    title: "Events",
                    headerShown: false,
                }}
            />
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
            />
        </Tabs>
    );
}

// import { Tabs } from 'expo-router';
// import {FontAwesome,AntDesign,MaterialIcons} from '@expo/vector-icons';
// import { Color } from '@/constants/Colors';
// export default function TabLayout() {
//   return (
//     <Tabs screenOptions={{ tabBarActiveTintColor: Color['main-color'] }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           headerShown:false,
//           tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="Events"
//         options={{
//           title: 'Events',
//           headerShown:false,
//           tabBarIcon: ({ color }) => <AntDesign name="calendar" size={24} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="Explore"
//         options={{
//           title: 'Explore',
//           headerShown:false,
//           tabBarIcon: ({ color }) => <MaterialIcons name="explore" size={24} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="Profile"
//         options={{
//           title: 'Profile',
//           headerShown:false,
//           tabBarIcon: ({ color }) =><FontAwesome name="user-circle-o" size={24} color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }
