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
      className={`w-full bg-[--primary-color] p-3 rounded-lg ${className}`}
      onPress={onPress}
    >
      <Text className="text-center text-[--bg-color] font-semibold">
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;