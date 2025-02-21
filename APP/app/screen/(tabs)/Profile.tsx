import { SafeAreaView, Text, View } from "react-native";
import Header from "@/components/Header";
import { Theme } from "@/constants/Colors";
import { useEffect } from "react";
import { useRouter } from "expo-router";
const Profile = ()=>{
    const router = useRouter();
    useEffect(()=>{
        router.push('/auth/signIn');
    },[]);
    return(
        <SafeAreaView style={Theme} className="gap-8 flex-1">
             <Header />
        <View className="flex-1 items-center justify-center">
            <Text>
                Heare Show All Eventa
            </Text>
        </View>
        </SafeAreaView>
    );
};

export default Profile;