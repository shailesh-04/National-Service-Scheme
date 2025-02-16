import { SafeAreaView, Text, View } from "react-native";
import Header from "@/components/Header";
import { Theme } from "@/constants/Colors";
const Explore = ()=>{
    return(
        <SafeAreaView style={Theme} className="gap-8">

        
             <Header />
        <View className="flex-1 items-center justify-center">
            <Text>
                Heare Show All Eventa
            </Text>
        </View>
        </SafeAreaView>
    );
};

export default Explore;