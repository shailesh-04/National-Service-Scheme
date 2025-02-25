import React from "react";
import { Text, View } from "react-native";
interface DataNotFoundProps{
    message?:string;
}
const DataNotFound:React.FC<DataNotFoundProps> = ({message})=>{
    return(
        <View className="items-center justify-center ">
            <Text className="text-4xl font-black text-[#999]">
                {message?message:'Data Not Found'} 
            </Text>
        </View>
    );
}

export default DataNotFound;