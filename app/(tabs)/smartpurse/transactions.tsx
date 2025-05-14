import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

type Transaction = {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: string;
  type: 'income' | 'expense';
};

export default function TransactionsScreen() {
  const transactions: Transaction[] = [
    {
      id: '1',
      title: 'Monthly salary',
      category: 'Salary',
      date: '14/05/2025',
      amount: '+GH₵2,500',
      type: 'income',
    },
    {
      id: '2',
      title: 'Grocery shopping',
      category: 'Food',
      date: '14/05/2025',
      amount: '-GH₵50',
      type: 'expense',
    },
    {
      id: '3',
      title: 'Taxi fare',
      category: 'Transport',
      date: '14/05/2025',
      amount: '-GH₵30',
      type: 'expense',
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
              <Text style={styles.activeTab}>Transactions</Text>
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
              <Text style={styles.tab}>Reports</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Financial Summary</Text>
          <View style={styles.summaryCards}>
            <View style={[styles.summaryCard, styles.incomeCard]}>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={styles.summaryAmount}>GH₵2,500</Text>
            </View>
            <View style={[styles.summaryCard, styles.expenseCard]}>
              <Text style={styles.summaryLabel}>Expenses</Text>
              <Text style={styles.summaryAmount}>GH₵80</Text>
            </View>
            <View style={[styles.summaryCard, styles.balanceCard]}>
              <Text style={styles.summaryLabel}>Balance</Text>
              <Text style={styles.summaryAmount}>GH₵2,420</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transactions</Text>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add-circle" size={20} color="#fff" />
              <Text style={styles.addButtonText}>Add Transaction</Text>
            </TouchableOpacity>
          </View>

          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>{transaction.title}</Text>
                <View style={styles.transactionMeta}>
                  <Text style={styles.transactionCategory}>{transaction.category}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  transaction.type === 'income' ? styles.incomeText : styles.expenseText,
                ]}>
                {transaction.amount}
              </Text>
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
  section: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  summaryCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCard: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  incomeCard: {
    backgroundColor: '#FFF0F7',
  },
  expenseCard: {
    backgroundColor: '#F5F5F5',
  },
  balanceCard: {
    backgroundColor: '#FCF3F7',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: '600',
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
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  transactionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionCategory: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
  transactionDate: {
    fontSize: 14,
    color: '#999999',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  incomeText: {
    color: '#00C853',
  },
  expenseText: {
    color: '#FF3B30',
  },
}); 