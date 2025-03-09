import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Theme } from "@/constants/Colors";
type ButtonProps = {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
  style?: React.CSSProperties|object;
};

const Button: React.FC<ButtonProps> = ({ children, onPress, className,style }) => {
  return (
    <TouchableOpacity 
      style={[Theme,{borderRadius:10},style]}
      className={`  w-full align-middle p-4 items-center  bg-[--main-color] ${className} `}
      
      onPress={onPress}
    >
      <Text className=" text-[--bg-color] text-[12px] font-bold">
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;