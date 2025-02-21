import { View, Text, Image, TouchableOpacity } from "react-native";
import { Feather, EvilIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Color } from "@/constants/Colors";
import { EventType } from "@services/event";
interface EventProps {
    data: EventType;
}
const EventCard: React.FC<EventProps> = ({ data }) => {
    const router = useRouter();
    const date = new Date(data.start_time)
        .toLocaleDateString("en-US", { month: "short", day: "numeric" })
        .split(" ");
    return (
        <TouchableOpacity onPress={()=>{
            router.push({
                pathname: "/screen/FullEvent",
                params: { data: JSON.stringify(data) },
              });
        }} className="w-[260px] gap-3 bg-[#fff] p-3 rounded-xl pb-4">
            <View className=" ovserflow-hidden rounded-[20px] h-40 w-full relative">
                <Image
                    source={{uri:`${data.image}?random=${data.id}`}}
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
                <View className="flex-row items-center gap-2">
                    <Feather
                        name="users"
                        size={20}
                        color={Color["bg-color"]}
                        className="bg-[#00000033] rounded-full p-2"
                    />
                    <Text
                        className=" font-semibold text-[12px]"
                        style={{ color: `${Color["main-color"]}66` }}
                    >
                        +{data.numOFUser} Going
                    </Text>
                </View>
                <View className="flex-row items-center">
                    <EvilIcons
                        name="location"
                        size={20}
                        color={Color["light-dark-color"]}
                    />
                    <Text className="text-[--light-dark-color] text-[10px]">
                        {data.location.length > 18
                            ? data.location.substring(0, 30) + "..."
                            : data.location}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default EventCard;
