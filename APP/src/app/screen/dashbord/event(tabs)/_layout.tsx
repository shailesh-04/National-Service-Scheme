import { EventProvider } from '#/src/context/useEvent';
import { Tabs } from 'expo-router';
import Icons from '#/src/components/Icons';

function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Event',
          tabBarIcon: ({ color }: { color: string }) => (
            <Icons.FontAwesome size={28} name="home" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Registration"
        options={{
          title: 'Registration',
          tabBarIcon: ({ color }: { color: string }) => (
            <Icons.FontAwesome size={28} name="user" color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

export default function Layout() {
  return (
    <EventProvider>
      <TabLayout />
    </EventProvider>
  );
}
