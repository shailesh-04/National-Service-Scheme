import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal, Button } from "react-native";
import { Theme } from "#/src/constants/Colors";

const notifications = [
  { id: "1", title: "Event Reminder", message: "Your event is scheduled at 5 PM today." },
  { id: "2", title: "New Event Added", message: "A new seminar has been added to your calendar." },
  { id: "3", title: "Venue Changed", message: "The venue for your event has been updated." },
];

const NotificationScreen: React.FC = () => {
  const [selectedNotification, setSelectedNotification] = useState<null | { title: string; message: string }>(null);

  return (
    <View style={Theme} className="flex-1 bg-[--bg-color] p-4">
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="bg-white p-4 mb-3 rounded-lg shadow-md border border-gray-200"
              onPress={() => setSelectedNotification(item)}
            >
              <Text className="text-lg font-semibold text-[--text-color]">{item.title}</Text>
              <Text className="text-sm mt-1">{item.message}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-lg">No notifications available</Text>
        </View>
      )}

      {/* Notification Popup */}
      <Modal visible={!!selectedNotification} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="w-80 bg-white p-6 rounded-lg shadow-lg">
            <Text className="text-xl font-bold mb-2 text-[--text-color]">{selectedNotification?.title}</Text>
            <Text className="text-md mb-4 text-[--text-color]">{selectedNotification?.message}</Text>
            <Button title="Close" onPress={() => setSelectedNotification(null)} color={Theme["--main-color"]} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NotificationScreen;