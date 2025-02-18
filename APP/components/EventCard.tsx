import { View, Text, Image } from "react-native";
import { Feather, EvilIcons } from "@expo/vector-icons";
import { Color } from "@/constants/Colors";
import { EventType } from "./service/event";
interface EventProps {
    data:EventType
}
const EventCard: React.FC<EventProps> = ({ data }) => {
const date = new Date("2025-06-23T03:00:00.000Z").toLocaleDateString("en-US", { month: "short", day: "numeric" }).split(' ');
    return (
        <View className="w-[260px] gap-3 bg-[#fff] p-3 rounded-xl pb-4">
            <View className=" ovserflow-hidden rounded-[20px] h-40 w-full relative">
                <Image
                    src={data.image}
                    className="w-full h-full rounded-[20px]"
                    resizeMode="contain"
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
                <Text numberOfLines={1} ellipsizeMode="tail" className="ps-1 text-[17px] font-bold" style={{color:`${Color['text-color']}dd`}}>
                {data.name.length > 18 ? data.name.substring(0, 18) + "..." : data.name}
                </Text>
                <View className="flex-row items-center gap-2">
                    <Feather
                        name="users"
                        size={20}
                        color={Color["bg-color"]}
                        className="bg-[#00000033] rounded-full p-2"
                    />
                    <Text className=" font-semibold text-[12px]" style={{color:`${Color['main-color']}66`}}>
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
                    {data.location.length > 18 ? data.location.substring(0, 30) + "..." : data.location}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default EventCard;
