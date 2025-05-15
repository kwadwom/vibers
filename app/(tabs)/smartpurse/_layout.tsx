import { Stack } from 'expo-router';
import { useCallback } from 'react';

export default function SmartPurseLayout() {
  const screenOptions = useCallback(() => ({
    headerStyle: {
      backgroundColor: '#D6086B',
    },
    headerTintColor: '#fff',
    headerBackTitleVisible: false,
    gestureEnabled: true,
  }), []);

  return (
    <Stack
      screenOptions={screenOptions}
      initialRouteName="index"
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="transactions"
        options={{
          title: 'Transactions',
        }}
      />
      <Stack.Screen
        name="goals"
        options={{
          title: 'Financial Goals',
        }}
      />
      <Stack.Screen
        name="budget"
        options={{
          title: 'Budget',
        }}
      />
      <Stack.Screen
        name="reports"
        options={{
          title: 'Reports',
        }}
      />
      <Stack.Screen
        name="insights"
        options={{
          title: 'Financial Insights',
        }}
      />
    </Stack>
  );
}