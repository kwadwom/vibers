import { View, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type UpdateGoalFunction = (goalId: string, newAmount: number) => void;

export default function AddMoneyScreen() {
  const params = useLocalSearchParams<{ goalId: string; goalTitle: string; currentBalance: string }>();
  const { goalId, goalTitle, currentBalance } = params;
  const [amount, setAmount] = useState('');
  const router = useRouter();

  const handleDeposit = async () => {
    if (!amount) {
      Alert.alert('Error', 'Please enter an amount');
      return;
    }

    try {
      // Calculate new total by adding deposit to current balance
      const currentAmount = parseFloat(currentBalance || '0');
      const depositAmount = parseFloat(amount);
      const newTotal = (currentAmount + depositAmount).toFixed(2);
      console.log('Current amount:', currentAmount, 'Deposit:', depositAmount, 'New total:', newTotal);

      console.log('Updating goal with new amount:', newTotal);
      const response = await fetch(
        `https://3vmzeeor55.execute-api.eu-west-1.amazonaws.com/Prod/saving-goal/${goalId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            current_amount: newTotal.toString()
          })
        }
      );

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (!response.ok) {
        throw new Error(`Failed to update goal: ${response.status} ${responseText}`);
      }

      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Goal updated:', data);
      } catch (e) {
        console.log('Response was not JSON, but update might have succeeded');
      }

      // Navigate to success screen
      router.push({
        pathname: '/smartpurse/deposit-success',
        params: { 
          amount,
          goalId,
          newBalance: newTotal
        }
      });
    } catch (error) {
      console.error('Error updating goal:', error);
      Alert.alert('Error', 'Failed to process deposit. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="help-circle-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Amount to deposit</Text>
        <Text style={styles.balance}>Current balance ₵{currentBalance}</Text>

        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>₵</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={(text) => {
              // Remove any non-numeric characters
              const numericValue = text.replace(/[^0-9]/g, '');
              setAmount(numericValue);
            }}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#000"
            autoFocus={true}
          />
        </View>

        <TouchableOpacity 
          style={[styles.depositButton, !amount ? styles.depositButtonDisabled : null]}
          onPress={handleDeposit}
        >
          <Text style={styles.depositButtonText}>Deposit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomIndicator} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 4,
  },
  helpButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  balance: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  currencySymbol: {
    fontSize: 40,
    color: '#000000',
    marginRight: 8,
  },
  amountInput: {
    fontSize: 72,
    fontWeight: '300',
    color: '#000000',
    padding: 0,
    minWidth: 100,
    textAlign: 'center',
  },
  depositButton: {
    backgroundColor: '#D6086B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  depositButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  depositButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  bottomIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 8,
    opacity: 0.2,
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
});
