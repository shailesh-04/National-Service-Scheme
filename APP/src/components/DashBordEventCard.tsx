import { View, Text, Image, TouchableOpacity } from "react-native";
import { Feather, EvilIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Color } from "@/constants/Colors";
import { EventType } from "@services/event";
import Button from "./ui/button";
interface EventProps {
    data: EventType;
}
const EventCard: React.FC<EventProps> = ({ data }) => {
    const router = useRouter();
    const date = new Date(data.start_time)
        .toLocaleDateString("en-US", { month: "short", day: "numeric" })
        .split(" ");
    return (
        <TouchableOpacity
            onPress={() => {
                router.push({
                    pathname: "/screen/FullEvent",
                    params: { data: JSON.stringify(data) },
                });
            }}
            className="w-[260px] gap-3 bg-[#fff] p-3 rounded-xl pb-4"
        >
            <View className=" ovserflow-hidden rounded-[20px] h-40 w-full relative">
                <Image
                    source={{ uri: `${data.image}?random=${data.id}` }}
                    className="w-full h-full rounded-[20px]"
                    resizeMode="cover"
                />
                <View className=" p-2 bg-[#ffffffdd] absolute top-2 left-2 rounded-xl  justify-center items-center">
                    <Text className="text-[--second-color] text-[18px] font-bold">
                        {date[1]}
                    </Text>
                    <Text className="text-[--second-color] text-[12px] font-semibold">
                        {date[0].toLocaleUpperCase()}
                    </Text>
                </View>
            </View>
            <View className="gap-2 ps-2">
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    className="ps-1 text-[17px] font-bold"
                    style={{ color: `${Color["text-color"]}dd` }}
                >
                    {data.name.length > 18
                        ? data.name.substring(0, 18) + "..."
                        : data.name}
                </Text>
                <View className="flex-row gap-3 px-3">
                    <Button className="bg-transparent border border-[--main-color] "
                    onPress={()=>{
                        router.push({
                            pathname:"/screen/dashbord/EditEvent",
                            params:{eventId:data.id}
                        })
                    }}
                    >
                        <Text className="text-[--main-color]">Edit</Text>
                    </Button>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default EventCard;
