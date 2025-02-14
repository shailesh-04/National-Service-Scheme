import { View, Text, Image } from "react-native";
import { Feather, EvilIcons } from "@expo/vector-icons";
import { Color } from "@/constants/Colors";

interface EventProps {
    data: {
        imagesrc: string;
        date: [string, string, string]; // [day, month, year]
        name: string;
        numOfUser: number;
        address: string;
    };
}

const EventCard: React.FC<EventProps> = ({ data }) => {
    return (
        <View className="w-[260px] gap-3 bg-[#fff] p-3 rounded-xl pb-4">
            <View className=" overflow-hidden rounded-[20px] w-full relative">
                <Image
                    src={data.imagesrc}
                    className="w-full h-[120px]"
                    resizeMode="contain"
                />
                <View className=" p-2 bg-[#ffffffdd] absolute top-2 left-2 rounded-xl  justify-center items-center">
                    <Text className="text-[--second-color] text-[18px] font-bold">
                        {data.date[0]}
                    </Text>
                    <Text className="text-[--second-color] text-[12px] font-semibold">
                        {data.date[1]}
                    </Text>
                </View>
            </View>
            <View className="gap-2 ps-2">
                <Text className="ps-1 text-[17px] font-bold" style={{color:`${Color['text-color']}dd`}}>
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
                        +{data.numOfUser} Going
                    </Text>
                </View>
                <View className="flex-row items-center">
                    <EvilIcons
                        name="location"
                        size={20}
                        color={Color["light-dark-color"]}
                    />
                    <Text className="text-[--light-dark-color] text-[10px]">
                        {data.address}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default EventCard;
