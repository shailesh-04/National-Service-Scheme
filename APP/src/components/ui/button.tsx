import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Theme } from "@/constants/Colors";
type ButtonProps = {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, onPress, className }) => {
  return (
    <TouchableOpacity 
      style={[Theme,{borderRadius:10}]}
      className={` ${className} w-full align-middle p-4 items-center  bg-[--main-color]`}
      onPress={onPress}
    >
      <Text className=" text-[--bg-color] text-[12px] font-bold">
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;