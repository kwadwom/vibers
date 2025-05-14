import { Stack } from 'expo-router';

export default function SmartPurseLayout() {
  return (
    <Stack>
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
          headerStyle: {
            backgroundColor: '#E6007E',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="goals"
        options={{
          title: 'Financial Goals',
          headerStyle: {
            backgroundColor: '#E6007E',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="budget"
        options={{
          title: 'Budget',
          headerStyle: {
            backgroundColor: '#E6007E',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="insights"
        options={{
          title: 'Financial Insights',
          headerStyle: {
            backgroundColor: '#E6007E',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack>
  );
} 