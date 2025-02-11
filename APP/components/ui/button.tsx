import React from "react";
import { TouchableOpacity, Text } from "react-native";

type ButtonProps = {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, onPress, className }) => {
  return (
    <TouchableOpacity
      className={`w-[80%] align-middle  bg-[--primary-color] p-4 ${className}`}
      style={{
        borderRadius:15
      }}
      onPress={onPress}
    >
      <Text className="text-center text-[12px] text-[--bg-color] font-semibold">
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;