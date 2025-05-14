import { Stack } from 'expo-router';

export default function SmartPurseLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="credit"
        options={{
          title: 'Credit & Loans',
          headerStyle: {
            backgroundColor: '#E6007E',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="savings"
        options={{
          title: 'Smart Savings',
          headerStyle: {
            backgroundColor: '#E6007E',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="bills"
        options={{
          title: 'Bill Payments',
          headerStyle: {
            backgroundColor: '#E6007E',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack>
  );
} 