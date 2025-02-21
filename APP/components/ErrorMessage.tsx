import React, { useState, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
interface ErrorMessageProps {
  message?: string;
  className?: string;
  children?: React.ReactNode;
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message,className,children}) => {
  const [visible, setErrorVisible] = useState(true);
  
  const translateY = new Animated.Value(-50);
  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(translateY, {
          toValue: -50,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setErrorVisible(false));
      }, 3000);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View className={`absolute top-0 left-0 right-0  rounded-b-xl p-4 items-center z-50 ${className}`} style={{ transform: [{ translateY }] }}> 
      {message&&<Text className="text-white font-bold">{message}</Text>}
      {children}
    </Animated.View>
  );
};

export default ErrorMessage;