import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import * as Icons from "@expo/vector-icons";
import { Color } from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
interface EditProfileHeaderProps{
    updates:boolean;
}
const EditProfileHeader:React.FC<EditProfileHeaderProps> = ({updates}) => {
    const navigation = useNavigation();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleBackPress = () => {
        if(!updates)
            setShowConfirm(true);
        else
            handleConfirm(true);
    };

    const handleConfirm = (confirm: boolean) => {
        setShowConfirm(false);
        if (confirm) {
            navigation.goBack();
        }
    };

    return (
        <View
            className=" p-4 flex-row items-center"
            style={{ backgroundColor: Color["bg-color"] }}
        >
            {/* Back Button */}
            <TouchableOpacity onPress={handleBackPress} className="p-2">
                <Icons.AntDesign
                    name="arrowleft"
                    size={24}
                    color={Color["main-color"]}
                />
            </TouchableOpacity>

            {/* Title */}
            <Text
                className=" text-lg font-bold ml-4"
                style={{ color: Color["text-color"] }}
            >
                Edit Profile
            </Text>

            {/* Confirmation Box */}
            {showConfirm && (
                <Modal transparent animationType="fade" visible={showConfirm}>
                    <LinearGradient
                        colors={[
                            "transparent",
                            `${Color["bg-color"]}cc`,
                            `${Color["bg-color"]}cc`,
                            `${Color["bg-color"]}cc`,
                            "transparent",
                        ]}
                        className="flex-1 justify-center items-center"
                    >
                        <Animated.View
                            entering={FadeIn}
                            exiting={FadeOut}
                            className="p-6 rounded-lg w-80" 
                            style={{backgroundColor:Color['main-color']}}
                        >
                            <Text className="text-white text-lg mb-4">
                                Are you sure you want to go back?
                            </Text>
                            <View className="flex-row justify-center gap-10">
                                <TouchableOpacity
                                    onPress={() => handleConfirm(true)}
                                    className="px-4 py-2 rounded-lg"
                                    style={{backgroundColor:Color['second-color']}}
                                >
                                    <Text className="text-black font-bold">
                                        Yes
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleConfirm(false)}
                                    className="px-4 py-2 rounded-lg"
                                    style={{backgroundColor:Color['bg-color']}}
                                >
                                    <Text style={{color:Color['text-color']}}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </LinearGradient>
                </Modal>
            )}
        </View>
    );
};

export default EditProfileHeader;
