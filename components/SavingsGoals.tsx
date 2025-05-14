import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  color: string;
}

const SavingsGoals: React.FC = () => {
  // Mock data - replace with actual data from your backend
  const goals: SavingsGoal[] = [
    {
      id: '1',
      name: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 7500,
      deadline: '2024-12-31',
      color: '#FF6B6B',
    },
    {
      id: '2',
      name: 'New Car',
      targetAmount: 25000,
      currentAmount: 15000,
      deadline: '2025-06-30',
      color: '#4ECDC4',
    },
    {
      id: '3',
      name: 'House Down Payment',
      targetAmount: 50000,
      currentAmount: 20000,
      deadline: '2026-01-31',
      color: '#45B7D1',
    },
  ];

  const calculateProgress = (current: number, target: number) => {
    return Math.min(current / target, 1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Savings Goals</Text>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="plus" size={24} color="#2c3e50" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.goalsContainer}>
        {goals.map((goal) => (
          <View key={goal.id} style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <Text style={styles.goalName}>{goal.name}</Text>
              <Text style={styles.deadline}>
                Target: {formatDate(goal.deadline)}
              </Text>
            </View>

            <View style={styles.amountContainer}>
              <Text style={styles.currentAmount}>
                ₵{goal.currentAmount.toLocaleString()}
              </Text>
              <Text style={styles.targetAmount}>
                / ₵{goal.targetAmount.toLocaleString()}
              </Text>
            </View>

            <ProgressBar
              progress={calculateProgress(goal.currentAmount, goal.targetAmount)}
              color={goal.color}
              style={styles.progressBar}
            />

            <View style={styles.goalFooter}>
              <Text style={styles.remainingText}>
                ₵{(goal.targetAmount - goal.currentAmount).toLocaleString()} remaining
              </Text>
              <TouchableOpacity style={styles.addFundsButton}>
                <Text style={styles.addFundsText}>Add Funds</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  addButton: {
    padding: 8,
  },
  goalsContainer: {
    maxHeight: 400,
  },
  goalCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  deadline: {
    fontSize: 12,
    color: '#6c757d',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  currentAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  targetAmount: {
    fontSize: 16,
    color: '#6c757d',
    marginLeft: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  goalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  remainingText: {
    fontSize: 12,
    color: '#6c757d',
  },
  addFundsButton: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  addFundsText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default SavingsGoals; 