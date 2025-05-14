import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ProgressBar } from 'react-native-paper';

interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
}

const BudgetOverview: React.FC = () => {
  // Mock data - replace with actual data from your backend
  const budgetCategories: BudgetCategory[] = [
    {
      id: '1',
      name: 'Housing',
      allocated: 2000,
      spent: 1800,
      color: '#FF6B6B',
    },
    {
      id: '2',
      name: 'Food',
      allocated: 1000,
      spent: 750,
      color: '#4ECDC4',
    },
    {
      id: '3',
      name: 'Transportation',
      allocated: 500,
      spent: 300,
      color: '#45B7D1',
    },
    {
      id: '4',
      name: 'Utilities',
      allocated: 300,
      spent: 280,
      color: '#96CEB4',
    },
  ];

  const calculateProgress = (spent: number, allocated: number) => {
    return Math.min(spent / allocated, 1);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 0.9) return '#FF6B6B';
    if (progress >= 0.7) return '#FFD93D';
    return '#4ECDC4';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget Overview</Text>
      <ScrollView style={styles.categoriesContainer}>
        {budgetCategories.map((category) => (
          <View key={category.id} style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryAmount}>
                ₵{category.spent.toLocaleString()} / ₵{category.allocated.toLocaleString()}
              </Text>
            </View>
            <ProgressBar
              progress={calculateProgress(category.spent, category.allocated)}
              color={getProgressColor(calculateProgress(category.spent, category.allocated))}
              style={styles.progressBar}
            />
            <Text style={styles.remainingText}>
              Remaining: ₵{(category.allocated - category.spent).toLocaleString()}
            </Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  categoriesContainer: {
    maxHeight: 400,
  },
  categoryCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  categoryAmount: {
    fontSize: 14,
    color: '#6c757d',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  remainingText: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'right',
  },
});

export default BudgetOverview; 