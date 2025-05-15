import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState, useEffect } from 'react';

type SmartPursePath = 
  | '../smartpurse/transactions'
  | '../smartpurse/budget'
  | '../smartpurse/goals'
  | '../smartpurse/reports';

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  href: SmartPursePath;
  amount?: string;
  metric?: string;
}

export default function SmartPurseScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalBalance, setTotalBalance] = useState(0);
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [savingsRate, setSavingsRate] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch transactions
      const today = new Date();
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      const startDate = firstDay.toISOString().split('T')[0];
      const endDate = lastDay.toISOString().split('T')[0];
      
      const transResponse = await fetch(
        `https://3vmzeeor55.execute-api.eu-west-1.amazonaws.com/Prod/transactions?client_id=24021055&transaction_date_start=${startDate}&transaction_date_end=${endDate}`
      );
      const transData = await transResponse.json();
      
      // Calculate balance from transactions
      const income = transData
        .filter((item: any) => item.trans_type === 'CREDIT')
        .reduce((sum: number, item: any) => sum + parseFloat(item.amount), 0);
      
      const expenses = transData
        .filter((item: any) => item.trans_type === 'DEBIT')
        .reduce((sum: number, item: any) => sum + parseFloat(item.amount), 0);
      
      setTotalBalance(income - expenses);

      // Fetch budgets
      const budgetResponse = await fetch(
        'https://3vmzeeor55.execute-api.eu-west-1.amazonaws.com/Prod/budgets/24021055'
      );
      const budgetData = await budgetResponse.json();
      
      // Calculate total monthly budget
      const totalBudget = budgetData
        .filter((budget: any) => budget.cycle === 'monthly')
        .reduce((sum: number, budget: any) => sum + parseFloat(budget.amount), 0);
      
      setMonthlyBudget(totalBudget);

      // Fetch savings goals
      const goalsResponse = await fetch(
        'https://3vmzeeor55.execute-api.eu-west-1.amazonaws.com/Prod/saving-goal/24021055'
      );
      const goalsData = await goalsResponse.json();
      
      // Calculate total savings
      let totalSaved = 0;
      if (Array.isArray(goalsData)) {
        totalSaved = goalsData.reduce((sum: number, goal: any) => 
          sum + parseFloat(goal.current_amount || '0'), 0);
      } else if (goalsData.goal_id) {
        totalSaved = parseFloat(goalsData.current_amount || '0');
      }
      
      setTotalSavings(totalSaved);

      // Calculate savings rate
      if (income > 0) {
        setSavingsRate((totalSaved / income) * 100);
      }

    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const features: FeatureCard[] = [
    {
      id: 'transactions',
      title: 'Transactions',
      description: 'View and manage your recent transactions',
      icon: 'swap-horizontal',
      href: '../smartpurse/transactions',
      amount: `GH₵${totalBalance.toFixed(2)}`,
      metric: 'Current Balance'
    },
    {
      id: 'budget',
      title: 'Budget',
      description: 'Track your monthly budget and expenses',
      icon: 'pie-chart',
      href: '../smartpurse/budget',
      amount: `GH₵${monthlyBudget.toFixed(2)}`,
      metric: 'Monthly Budget'
    },
    {
      id: 'goals',
      title: 'Saving Goals',
      description: 'Set and achieve your financial goals',
      icon: 'flag',
      href: '../smartpurse/goals',
      amount: `GH₵${totalSavings.toFixed(2)}`,
      metric: 'Total Savings'
    },
    {
      id: 'reports',
      title: 'Reports',
      description: 'Analyze your spending patterns',
      icon: 'bar-chart',
      href: '../smartpurse/reports',
      amount: `${savingsRate.toFixed(1)}%`,
      metric: 'Monthly Savings Rate'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#E6007E" />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>SmartPurse</Text>
              <TouchableOpacity style={styles.notificationButton}>
                <Ionicons name="notifications-outline" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
              <Text style={styles.welcomeText}>Welcome back!</Text>
              <Text style={styles.subtitleText}>Manage your finances with ease</Text>

              <View style={styles.featureGrid}>
                {features.map((feature) => (
                  <Link key={feature.id} href={feature.href} asChild>
                    <TouchableOpacity style={styles.featureCard}>
                      <View style={styles.featureIconContainer}>
                        <Ionicons name={feature.icon} size={24} color="#E6007E" />
                      </View>
                      <Text style={styles.featureTitle}>{feature.title}</Text>
                      <Text style={styles.featureDescription}>{feature.description}</Text>
                      {feature.amount && (
                        <View style={styles.metricContainer}>
                          <Text style={styles.metricAmount}>{feature.amount}</Text>
                          <Text style={styles.metricLabel}>{feature.metric}</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  </Link>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  errorText: {
    color: '#E6007E',
    fontSize: 16,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  notificationButton: {
    padding: 8,
  },
  content: {
    padding: 16,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF0F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  metricContainer: {
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  metricAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E6007E',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666666',
  },
}); 