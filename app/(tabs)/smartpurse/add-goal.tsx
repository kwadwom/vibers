import { View, StyleSheet, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { router } from 'expo-router';

export default function AddGoalScreen() {
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [deadline, setDeadline] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleSubmit = async () => {
    if (!title || !targetAmount || !deadline) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const formattedDeadline = deadline.toISOString().split('T')[0] + ' 00:00:00';
      
      const response = await fetch('https://3vmzeeor55.execute-api.eu-west-1.amazonaws.com/Prod/saving-goal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: '24021055',
          goal_name: title,
          current_amount: '0.00', // Start with 0
          target_amount: targetAmount.toFixed(2),
          deadline: formattedDeadline
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create goal');
      }

      const data = await response.json();
      console.log('Goal created:', data);
      
      // Navigate back with refresh parameter
      router.push({
        pathname: '/smartpurse/goals',
        params: { shouldRefresh: 'true' }
      });
    } catch (error) {
      console.error('Error creating goal:', error);
      Alert.alert('Error', 'Failed to create saving goal. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Add New Goal</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Goal Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="e.g., Emergency Fund"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Target Amount (GH₵)</Text>
          <TextInput
            style={styles.input}
            value={targetAmount.toString()}
            onChangeText={(text) => setTargetAmount(parseFloat(text) || 0)}
            placeholder="0.00"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Deadline</Text>
          <TouchableOpacity 
            style={[styles.input, styles.dateInput]} 
            onPress={() => setDatePickerVisible(true)}
          >
            <Text style={styles.dateText}>
              {deadline.toLocaleDateString('en-GB')}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={(date) => {
              setDatePickerVisible(false);
              setDeadline(date);
            }}
            onCancel={() => setDatePickerVisible(false)}
            minimumDate={new Date()}
            date={deadline}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Create Goal</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dateInput: {
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    fontSize: 16,
    color: '#D6086B',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#D6086B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});
