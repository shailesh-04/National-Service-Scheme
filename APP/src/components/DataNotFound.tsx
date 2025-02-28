import React from "react";
import { Text, View,Image } from "react-native";

import NoEventImage from '@assets/img/NotFoundEvent.png';
interface DataNotFoundProps {
    message?: string;
}
const DataNotFound: React.FC<DataNotFoundProps> = ({ message }) => {
    return (
        <View className=" flex-1 bg-white rounded-3xl p-5 items-center justify-center ">
            <View className="w-[100px] h-[100px]">
                <Image
                    source={NoEventImage}
                    resizeMode="cover"
                    className="w-full h-full border-blue-700 rounded-full"
                />
            </View>
            <Text className="text-[-bg-color] text-[13px] font-semibold">
                {message?message:"Not Found This Screen Data"}
            </Text>
        </View>
    );
};

export default DataNotFound;
