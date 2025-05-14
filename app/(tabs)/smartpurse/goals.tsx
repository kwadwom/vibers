import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

type SavingGoal = {
  id: string;
  title: string;
  current: number;
  target: number;
  deadline: string;
  progress: number;
};

export default function GoalsScreen() {
  const goals: SavingGoal[] = [
    {
      id: '1',
      title: 'Emergency Fund',
      current: 1500,
      target: 5000,
      deadline: '14/11/2025',
      progress: 0.3,
    },
    {
      id: '2',
      title: 'New Laptop',
      current: 400,
      target: 1200,
      deadline: '14/08/2025',
      progress: 0.33,
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
              <Text style={styles.tab}>Budgets</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/smartpurse/goals" asChild>
            <TouchableOpacity>
              <Text style={styles.activeTab}>SavingGoals</Text>
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
            <Text style={styles.sectionTitle}>Saving Goals</Text>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add-circle" size={20} color="#fff" />
              <Text style={styles.addButtonText}>Add Goal</Text>
            </TouchableOpacity>
          </View>

          {goals.map((goal) => (
            <View key={goal.id} style={styles.goalCard}>
              <View style={styles.goalHeader}>
                <Text style={styles.goalTitle}>{goal.title}</Text>
                <View style={styles.piggyIconContainer}>
                  <Ionicons name="wallet-outline" size={20} color="#E6007E" />
                </View>
              </View>

              <View style={styles.progressSection}>
                <Text style={styles.progressLabel}>Progress</Text>
                <Text style={styles.progressPercentage}>{Math.round(goal.progress * 100)}%</Text>
              </View>

              <View style={styles.progressBarBg}>
                <View
                  style={[styles.progressBar, { width: `${goal.progress * 100}%` }]}
                />
              </View>

              <View style={styles.amountContainer}>
                <View style={styles.amountSection}>
                  <Text style={styles.amountLabel}>Current</Text>
                  <Text style={styles.amount}>GH₵{goal.current}</Text>
                </View>
                <View style={styles.amountSection}>
                  <Text style={styles.amountLabel}>Target</Text>
                  <Text style={styles.amount}>GH₵{goal.target}</Text>
                </View>
              </View>

              <Text style={styles.deadline}>Deadline: {goal.deadline}</Text>

              <TouchableOpacity style={styles.addMoneyButton}>
                <Text style={styles.addMoneyButtonText}>Add Money</Text>
              </TouchableOpacity>
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6007E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    marginLeft: 4,
    fontSize: 14,
  },
  goalCard: {
    backgroundColor: '#F8FBFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  piggyIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF0F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#666666',
  },
  progressPercentage: {
    fontSize: 14,
    color: '#666666',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#E6007E',
    borderRadius: 4,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  amountSection: {
    flex: 1,
  },
  amountLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: '500',
  },
  deadline: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  addMoneyButton: {
    backgroundColor: '#E6007E',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addMoneyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
}); 