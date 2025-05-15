import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';

type SavingGoal = {
  id: string;
  title: string;
  current: number;
  target: number;
  deadline: string;
  progress: number;
};

export default function GoalsScreen() {
  const params = useLocalSearchParams<{ updatedGoalId: string; newBalance: string; shouldRefresh?: string }>();
  const { updatedGoalId, newBalance, shouldRefresh } = params;
  
  const [goals, setGoals] = useState<SavingGoal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  interface ApiGoal {
    goal_id: number;
    client_id: string;
    goal_name: string;
    current_amount: string;
    target_amount: string;
    deadline: string;
    created: string;
  }

  const fetchGoals = async () => {
    try {
      console.log('Fetching goals...');
      const response = await fetch(
        'https://3vmzeeor55.execute-api.eu-west-1.amazonaws.com/Prod/saving-goal/24021055'
      );
      const data = await response.json();
      console.log('Raw API Response:', data);
      
      // Handle error response (no goals found)
      if (data.error === 'Saving goal not found') {
        console.log('No goals found');
        setGoals([]);
        return;
      }

      // Handle the response as a single goal
      if (data.goal_id) {
        console.log('Single goal found:', data);
        const goal = {
          id: data.goal_id.toString(),
          title: data.goal_name,
          current: parseFloat(data.current_amount) || 0,
          target: parseFloat(data.target_amount) || 1,
          deadline: new Date(data.deadline).toLocaleDateString('en-GB'),
          progress: parseFloat(data.current_amount) / parseFloat(data.target_amount)
        };
        console.log('Transformed single goal:', goal);
        setGoals([goal]);
        return;
      }

      // Handle array response
      if (Array.isArray(data)) {
        console.log('Multiple goals found:', data);
        const transformedGoals = data.map((goal: ApiGoal) => ({
          id: goal.goal_id.toString(),
          title: goal.goal_name,
          current: parseFloat(goal.current_amount) || 0,
          target: parseFloat(goal.target_amount) || 1,
          deadline: new Date(goal.deadline).toLocaleDateString('en-GB'),
          progress: parseFloat(goal.current_amount) / parseFloat(goal.target_amount)
        }));
        console.log('Transformed goals array:', transformedGoals);
        setGoals(transformedGoals);
        return;
      }

      console.log('Unhandled response format');
      setGoals([]);
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // Refresh goals when returning from deposit
  useEffect(() => {
    if (updatedGoalId && newBalance) {
      fetchGoals(); // Refresh after deposit
    }
  }, [updatedGoalId, newBalance]);

  // Refresh when returning from add-goal screen
  useEffect(() => {
    if (shouldRefresh === 'true') {
      fetchGoals();
    }
  }, [shouldRefresh]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#D6086B" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>SmartPurse</Text>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => {
            router.replace('../smartpurse/transactions');
          }}>
            <Text style={styles.tab}>Transactions</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            router.replace('../smartpurse/budget');
          }}>
            <Text style={styles.tab}>Budgets</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            router.replace('../smartpurse/goals');
          }}>
            <Text style={styles.activeTab}>SavingGoals</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            router.replace('../smartpurse/reports');
          }}>
            <Text style={styles.tab}>Reports</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Saving Goals</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => router.push('/smartpurse/add-goal?shouldRefresh=true')}
            >
              <Ionicons name="add-circle" size={20} color="#fff" />
              <Text style={styles.addButtonText}>Add Goal</Text>
            </TouchableOpacity>
          </View>

          {goals.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="wallet-outline" size={48} color="#D6086B" />
              <Text style={styles.emptyStateTitle}>No Saving Goals Yet</Text>
              <Text style={styles.emptyStateText}>Tap the 'Add Goal' button above to create your first saving goal.</Text>
            </View>
          ) : (
            <View>

              {goals.map((goal: SavingGoal) => (
                <View key={goal.id} style={styles.goalCard}>
                  <View style={styles.goalHeader}>
                    <Text style={styles.goalTitle}>{goal.title}</Text>
                    <View style={styles.piggyIconContainer}>
                      <Ionicons name="wallet-outline" size={20} color="#D6086B" />
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

                  <TouchableOpacity 
                    style={styles.addMoneyButton}
                    onPress={() => router.push({
                      pathname: '../smartpurse/add-money',
                      params: {
                        goalId: goal.id,
                        goalTitle: goal.title,
                        currentBalance: goal.current
                      }
                    })}
                  >
                    <Text style={styles.addMoneyButtonText}>Add Money</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 32,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    color: '#D6086B',
    borderBottomWidth: 2,
    borderBottomColor: '#D6086B',
  },
  content: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D6086B',
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
    backgroundColor: '#D6086B',
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
    backgroundColor: '#D6086B',
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