import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

const colors = {
  main: "#4A43EC",
  background: "#F5F7FA",
  text: "#212121",
  lightDark: "#888",
  second: "#F0635A",
  cardBackground: "#FFFFFF",
};

const events = [
  {
    id: 1,
    name: "Tech Conference 2025",
    description: "A leading tech event with industry experts.",
    location: "New York, NY",
    start_time: "2025-06-15T09:00:00Z",
    end_time: "2025-06-15T18:00:00Z",
    numOFUser: 200,
    image: "https://source.unsplash.com/random/300x200",
    created_by: 1,
    is_deleted: false,
  },
  {
    id: 2,
    name: "Startup Pitch Night",
    description: "Showcase your startup to investors.",
    location: "San Francisco, CA",
    start_time: "2025-07-10T17:00:00Z",
    end_time: "2025-07-10T21:00:00Z",
    numOFUser: 150,
    image: "https://source.unsplash.com/random/300x201",
    created_by: 2,
    is_deleted: false,
  },
];

const EventScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: colors.main }}>
        Events
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {events.map((event, index) => (
          <Animated.View
            entering={FadeInUp.delay(index * 200).springify()}
            key={event.id}
            style={{
              backgroundColor: colors.cardBackground,
              padding: 16,
              borderRadius: 12,
              marginVertical: 10,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 3 },
              shadowRadius: 5,
            }}
          >
            <Image
              source={{ uri: event.image }}
              style={{ width: "100%", height: 150, borderRadius: 10 }}
            />
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: colors.text, marginTop: 10 }}
            >
              {event.name}
            </Text>
            <Text style={{ color: colors.lightDark }}>{event.description}</Text>
            <Text style={{ fontSize: 14, color: colors.second, marginTop: 5 }}>
              📍 {event.location}
            </Text>
            <Text style={{ fontSize: 14, color: colors.lightDark, marginTop: 5 }}>
              🕒 {new Date(event.start_time).toLocaleString()} - {new Date(event.end_time).toLocaleString()}
            </Text>
            <Text style={{ fontSize: 14, color: colors.main, marginTop: 5 }}>
              👥 {event.numOFUser} Attendees
            </Text>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
};

export default EventScreen;
