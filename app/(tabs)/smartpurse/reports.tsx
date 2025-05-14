import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { LineChart, BarChart } from 'react-native-chart-kit';

export default function ReportsScreen() {
  const screenWidth = Dimensions.get('window').width;

  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        data: [2100, 2400, 2000, 2500, 2300],
      },
    ],
  };

  const spendingData = {
    labels: ['Food', 'Transport', 'Bills', 'Shopping', 'Others'],
    datasets: [
      {
        data: [300, 150, 200, 100, 250],
      },
    ],
  };

  const newsItems = [
    {
      id: '1',
      title: 'Tips for Better Budgeting',
      description: 'Learn how to manage your money more effectively with these simple tips.',
      date: '2 hours ago',
      icon: 'newspaper-outline',
    },
    {
      id: '2',
      title: 'Understanding Savings',
      description: 'Why starting to save early can make a big difference in your financial future.',
      date: '5 hours ago',
      icon: 'bar-chart-outline',
    },
    {
      id: '3',
      title: 'Smart Money Moves',
      description: 'Financial habits that can help you build wealth over time.',
      date: '1 day ago',
      icon: 'trending-up-outline',
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
              <Text style={styles.tab}>SavingGoals</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/smartpurse/reports" asChild>
            <TouchableOpacity>
              <Text style={styles.activeTab}>Reports</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.content}>
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Monthly Overview</Text>
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
            <Text style={styles.chartTitle}>Spending Categories</Text>
            <BarChart
              data={spendingData}
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
              }}
              style={styles.chart}
            />
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
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
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