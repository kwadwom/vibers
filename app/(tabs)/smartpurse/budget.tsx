import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

type Budget = {
  id: string;
  category: string;
  spent: number;
  total: number;
  frequency: string;
  progress: number;
};

export default function BudgetScreen() {
  const budgets: Budget[] = [
    {
      id: '1',
      category: 'Food',
      spent: 120,
      total: 300,
      frequency: 'Monthly',
      progress: 0.4,
    },
    {
      id: '2',
      category: 'Transport',
      spent: 75,
      total: 150,
      frequency: 'Monthly',
      progress: 0.5,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>SmartPurse</Text>
        </View>

        <View style={styles.tabs}>
          <Link href="/smartpurse/transactions" asChild>
            <TouchableOpacity>
              <Text style={styles.tab}>Transactions</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/smartpurse/budget" asChild>
            <TouchableOpacity>
              <Text style={styles.activeTab}>Budgets</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/smartpurse/goals" asChild>
            <TouchableOpacity>
              <Text style={styles.tab}>SavingGoals</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/smartpurse/reports" asChild>
            <TouchableOpacity>
              <Text style={styles.tab}>Reports</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Budgets</Text>
            <TouchableOpacity style={styles.createButton}>
              <Ionicons name="add-circle" size={20} color="#fff" />
              <Text style={styles.createButtonText}>Create Budget</Text>
            </TouchableOpacity>
          </View>

          {budgets.map((budget) => (
            <View key={budget.id} style={styles.budgetCard}>
              <View style={styles.budgetHeader}>
                <View>
                  <Text style={styles.budgetCategory}>{budget.category}</Text>
                  <Text style={styles.budgetFrequency}>{budget.frequency}</Text>
                </View>
                <Text style={styles.budgetAmount}>
                  GH₵{budget.spent} of GH₵{budget.total}
                </Text>
              </View>
              <View style={styles.progressContainer}>
                <View style={styles.progressBarBg}>
                  <View
                    style={[styles.progressBar, { width: `${budget.progress * 100}%` }]}
                  />
                </View>
                <Text style={styles.progressText}>{Math.round(budget.progress * 100)}% used</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
    color: '#666666',
  },
  activeTab: {
    paddingVertical: 12,
    marginRight: 24,
    color: '#E6007E',
    borderBottomWidth: 2,
    borderBottomColor: '#E6007E',
  },
  content: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6007E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  createButtonText: {
    color: '#FFFFFF',
    marginLeft: 4,
    fontSize: 14,
  },
  budgetCard: {
    backgroundColor: '#F8FBFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  budgetCategory: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  budgetFrequency: {
    fontSize: 14,
    color: '#666666',
  },
  budgetAmount: {
    fontSize: 16,
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#E6007E',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666666',
    width: 70,
  },
}); 