import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { useState, useEffect } from 'react';

type ChartData = {
  labels: string[];
  datasets: Array<{
    data: number[];
    color?: (opacity: number) => string;
  }>;
};

type Transaction = {
  transaction_date: string;
  amount: string;
  trans_type: 'CREDIT' | 'DEBIT';
  category?: string;
};

export default function ReportsScreen() {
  const screenWidth = Dimensions.get('window').width;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthlyData, setMonthlyData] = useState<ChartData>({
    labels: [],
    datasets: [{ data: [] }]
  });
  const [spendingData, setSpendingData] = useState<ChartData>({
    labels: [],
    datasets: [{ data: [] }]
  });
  const [expenseStats, setExpenseStats] = useState({
    total: 0,
    average: 0,
    peak: 0
  });

  useEffect(() => {
    fetchTransactionData();
  }, []);

  const fetchTransactionData = async () => {
    try {
      setLoading(true);
      setError(null);

      const currentDay = new Date(currentDate);
      currentDay.setHours(0, 0, 0, 0);

      // Calculate date range for monthly data
      const startOfMonth = new Date(currentDay);
      startOfMonth.setDate(1); // Start of current month
      const sixMonthsAgo = new Date(startOfMonth);
      sixMonthsAgo.setMonth(startOfMonth.getMonth() - 5); // Go back 6 months

      const response = await fetch(
        `https://3vmzeeor55.execute-api.eu-west-1.amazonaws.com/Prod/transactions?client_id=24021055&transaction_date_start=${sixMonthsAgo.toISOString().split('T')[0]}&transaction_date_end=${currentDay.toISOString().split('T')[0]}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch transaction data');
      }

      const data = await response.json();

      // Process monthly data
      const monthlyIncome = new Map<number, number>();
      
      // Calculate date range for the last 14 days
      const fourteenDaysAgo = new Date(currentDay);
      fourteenDaysAgo.setDate(currentDay.getDate() - 13);
      
      // Initialize daily expenses map for the last 14 days
      const dailyExpenses = new Map<string, number>();

      data.forEach((transaction: Transaction) => {
        const date = new Date(transaction.transaction_date);
        const amount = parseFloat(transaction.amount);

        // Calculate monthly income
        if (transaction.trans_type === 'CREDIT') {
          const monthKey = date.getFullYear() * 100 + date.getMonth();
          const currentAmount = monthlyIncome.get(monthKey) || 0;
          monthlyIncome.set(monthKey, currentAmount + amount);
        }

        // Calculate daily expenses for last 14 days
        if (transaction.trans_type === 'DEBIT') {
          const transactionDate = new Date(date);
          transactionDate.setHours(0, 0, 0, 0);
          
          // Only include transactions from the last 14 days
          if (transactionDate >= fourteenDaysAgo && transactionDate <= currentDay) {
            const dateKey = transactionDate.toISOString().split('T')[0];
            const currentAmount = dailyExpenses.get(dateKey) || 0;
            dailyExpenses.set(dateKey, currentAmount + amount);
          }
        }
      });

      // Process monthly income data
      const monthKeys = Array.from(monthlyIncome.keys()).sort();
      const monthLabels = monthKeys.map(key => {
        const year = Math.floor(key / 100);
        const month = key % 100;
        const date = new Date(year, month);
        return date.toLocaleString('default', { month: 'short' });
      });

      setMonthlyData({
        labels: monthLabels,
        datasets: [{
          data: monthKeys.map(key => monthlyIncome.get(key) || 0),
          color: (opacity = 1) => `rgba(0, 150, 136, ${opacity})`
        }]
      });

      // Fill in any missing dates with zero expenses
      for (let d = 0; d < 14; d++) {
        const date = new Date(currentDay);
        date.setDate(currentDay.getDate() - (13 - d));
        const dateKey = date.toISOString().split('T')[0];
        if (!dailyExpenses.has(dateKey)) {
          dailyExpenses.set(dateKey, 0);
        }
      }

      // Convert daily expenses to chart data, maintaining chronological order
      const sortedDates = Array.from(dailyExpenses.keys()).sort();
      const expenseData = sortedDates.map(dateKey => dailyExpenses.get(dateKey) || 0);
      
      // Calculate and update statistics
      setExpenseStats({
        total: expenseData.reduce((sum, amount) => sum + amount, 0),
        average: expenseData.reduce((sum, amount) => sum + amount, 0) / 14,
        peak: Math.max(...expenseData)
      });
      
      setSpendingData({
        labels: sortedDates.map(dateKey => {
          const date = new Date(dateKey);
          return date.toLocaleString('default', { day: 'numeric', month: 'short' });
        }),
        datasets: [{
          data: expenseData,
          color: (opacity = 1) => {
            // Highlight today's bar in a different color
            const todayKey = currentDay.toISOString().split('T')[0];
            const currentDateKey = sortedDates[sortedDates.length - 1];
            return currentDateKey === todayKey ? `rgba(0, 150, 136, ${opacity})` : `rgba(230, 0, 126, ${opacity})`;
          }
        }]
      });

    } catch (err) {
      console.error('Error fetching transaction data:', err);
      setError('Failed to load transaction data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E6007E" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }



  const newsItems = [
    {
      id: '1',
      title: 'Tips for Better Budgeting',
      description: 'Learn how to manage your money more effectively with these simple tips.',
      date: '2 hours ago',
      icon: 'newspaper' as const,
    },
    {
      id: '2',
      title: 'Understanding Savings',
      description: 'Why starting to save early can make a big difference in your financial future.',
      date: '5 hours ago',
      icon: 'bar-chart' as const,
    },
    {
      id: '3',
      title: 'Smart Money Moves',
      description: 'Financial habits that can help you build wealth over time.',
      date: '1 day ago',
      icon: 'trending-up' as const,
    },
  ];

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
            <Text style={styles.tab}>SavingGoals</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            router.replace('../smartpurse/reports');
          }}>
            <Text style={styles.activeTab}>Reports</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Monthly Income</Text>
              <Text style={styles.chartSubtitle}>Last 6 months of income</Text>
            </View>
            <LineChart
              data={monthlyData}
              width={screenWidth - 32}
              height={220}
              chartConfig={{
                backgroundColor: '#FFFFFF',
                backgroundGradientFrom: '#FFFFFF',
                backgroundGradientTo: '#FFFFFF',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(230, 0, 126, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#E6007E',
                },
              }}
              bezier
              style={styles.chart}
            />
          </View>

          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Daily Expenses - Last 14 Days</Text>
              <View style={styles.chartStats}>
                <Text style={styles.chartStat}>Total: GH₵{expenseStats.total.toFixed(2)}</Text>
                <Text style={styles.chartStat}>Average: GH₵{expenseStats.average.toFixed(2)}</Text>
                <Text style={styles.chartStat}>Peak: GH₵{expenseStats.peak.toFixed(2)}</Text>
              </View>
              <Text style={styles.chartSubtitle}>Today's spending is highlighted in green</Text>
            </View>
            <View style={styles.chartWrapper}>
              <BarChart
                data={spendingData}
                width={screenWidth - 48}
                height={220}
                yAxisLabel="GH₵"
                yAxisSuffix=""
                showValuesOnTopOfBars={true}
                fromZero={true}
                withInnerLines={false}
                chartConfig={{
                  backgroundColor: '#FFFFFF',
                  backgroundGradientFrom: '#FFFFFF',
                  backgroundGradientTo: '#FFFFFF',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(230, 0, 126, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  barPercentage: 0.6,
                  propsForLabels: {
                    fontSize: 10,
                    rotation: -45
                  },
                  propsForVerticalLabels: {
                    fontSize: 10
                  },
                  style: {
                    borderRadius: 16,
                    paddingRight: 0
                  },
                }}
                style={styles.chart}
              />
            </View>
          </View>

          <View style={styles.newsSection}>
            <Text style={styles.sectionTitle}>Financial Insights</Text>
            {newsItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.newsCard}>
                <View style={styles.newsIconContainer}>
                  <Ionicons name={item.icon} size={24} color="#E6007E" />
                </View>
                <View style={styles.newsContent}>
                  <Text style={styles.newsTitle}>{item.title}</Text>
                  <Text style={styles.newsDescription}>{item.description}</Text>
                  <Text style={styles.newsDate}>{item.date}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  chartHeader: {
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  chartStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  chartStat: {
    fontSize: 12,
    color: '#333333',
    fontWeight: '500',
    flex: 1,
    textAlign: 'center',
  },
  chartSubtitle: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 12,
  },
  chartWrapper: {
    marginHorizontal: -16,
  },
  chart: {
    marginVertical: 0,
    borderRadius: 16,
  },
  newsSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  newsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF0F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  newsDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  newsDate: {
    fontSize: 12,
    color: '#999999',
  },
}); 