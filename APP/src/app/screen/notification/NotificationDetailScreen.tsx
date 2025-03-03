import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const NotificationDetailScreen: React.FC = () => {
  const { title, message } = useLocalSearchParams();

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-xl font-bold text-main-color mb-3">{title}</Text>
      <Text className="text-lg text-gray-600">{message}</Text>
    </View>
  );
};

export default NotificationDetailScreen;
