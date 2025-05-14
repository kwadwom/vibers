import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

type SmartPursePath = 
  | '/smartpurse/transactions'
  | '/smartpurse/budget'
  | '/smartpurse/goals'
  | '/smartpurse/reports';

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
  const features: FeatureCard[] = [
    {
      id: 'transactions',
      title: 'Transactions',
      description: 'View and manage your recent transactions',
      icon: 'swap-horizontal',
      href: '/smartpurse/transactions',
      amount: '$5,200.00',
      metric: 'Current Balance'
    },
    {
      id: 'budget',
      title: 'Budget',
      description: 'Track your monthly budget and expenses',
      icon: 'pie-chart',
      href: '/smartpurse/budget',
      amount: '$2,100.00',
      metric: 'Monthly Budget'
    },
    {
      id: 'goals',
      title: 'Saving Goals',
      description: 'Set and achieve your financial goals',
      icon: 'flag',
      href: '/smartpurse/goals',
      amount: '$1,500.00',
      metric: 'Total Savings'
    },
    {
      id: 'reports',
      title: 'Reports',
      description: 'Analyze your spending patterns',
      icon: 'bar-chart',
      href: '/smartpurse/reports',
      amount: '15%',
      metric: 'Monthly Savings Rate'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
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