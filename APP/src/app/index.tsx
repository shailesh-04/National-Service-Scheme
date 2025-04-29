import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    Easing,
    ActivityIndicator
} from "react-native";
import { useEffect ,useState} from "react";
import { Color, Theme } from "@constants/Colors";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { verifyUser } from "@services/auth";
import { useUserStore } from "@store/useUserStore";
import useAlert from "@store/useAlert";
import { setAlert } from "../components/Alert";
export default function HomeScreen() {
    const setUser = useUserStore((state) => state.setUserOnly);
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const callingApi = ()=>{
        verifyUser((res, err,status) => {
        setLoading(false);
            if (err) {
                (status==401||status==403)?'':setAlert(err,"error");
                setTimeout(()=>{
                    err != "Network Error"?
                    router.replace("/auth/signIn"):'';
                },1500);
                
            } else if (res) {
                setUser({
                    id: res[0].id,
                    name: res[0].name,
                    email: res[0].email,
                    phone: res[0].phone,
                    role: res[0].role,
                    about: res[0].about,
                    img: res[0].img,
                });
                router.replace("/screen/(tabs)");
            }
        });
    }
    useEffect(() => {
            callingApi();
    }, []);
    return (
        <View
            style={Theme}
            className="bg-[--main-color] flex-1 items-center justify-center "
        >
            <StatusBar backgroundColor="transparent" />
            <View className=" w-96 h-96 rounded-full  overflow-hidden items-center justify-center bg-red-50">
                <Image
                    source={require("@assets/img/logo.png")}
                    resizeMode="contain"
                    className="w-full h-full "
                />
            </View>
            <View className=" w-full px-10 mt-10">
                <Text className=" text-[--bg-color] text-4xl font-black">
                    Welcome to NSS
                </Text>
                <Text className="text-[--accent-color] font-bold">
                    Join hands for social service and national development.
                </Text>
                <ActivityIndicator size={50} color={'#fff'}/>
            </View>
        </View>
    );
}
