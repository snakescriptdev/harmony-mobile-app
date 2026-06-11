import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="combine-orders" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="group-order" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="join-route" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="recommendations" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="scheduling" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="event-planner" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="route-map" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
      </Stack>
    </View>
  );
}
