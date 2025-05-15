import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreditCard = ({ title, amount, description, buttonText }: {
  title: string;
  amount: string;
  description: string;
  buttonText: string;
}) => (
  <View style={styles.creditCard}>
    <Text style={styles.creditTitle}>{title}</Text>
    <Text style={styles.creditAmount}>{amount}</Text>
    <Text style={styles.creditDescription}>{description}</Text>
    <TouchableOpacity style={styles.actionButton}>
      <Text style={styles.actionButtonText}>{buttonText}</Text>
    </TouchableOpacity>
  </View>
);

interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
}

interface FinancialSummary {
  income: number;
  expenses: number;
  balance: number;
}

const CreditScreen = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [summary, setSummary] = useState<FinancialSummary>({
    income: 0,
    expenses: 0,
    balance: 0
  });

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://3vmzeeor55.execute-api.eu-west-1.amazonaws.com/Prod/transactions?client_id=24021055&transaction_date_start=2025-05-01&transaction_date_end=2025-05-31'
      );
      const data = await response.json();
      
      // Sort transactions by date in descending order
      const sortedTransactions = data.sort((a: Transaction, b: Transaction) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      // Calculate financial summary
      const newSummary = sortedTransactions.reduce((acc: FinancialSummary, curr: Transaction) => {
        if (curr.type === 'income') {
          acc.income += curr.amount;
        } else {
          acc.expenses += curr.amount;
        }
        return acc;
      }, { income: 0, expenses: 0, balance: 0 });
      
      newSummary.balance = newSummary.income - newSummary.expenses;
      
      setTransactions(sortedTransactions);
      setSummary(newSummary);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const paginatedTransactions = transactions.slice((page - 1) * 10, page * 10);
  const totalPages = Math.ceil(transactions.length / 10);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Financial Summary</Text>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Income</Text>
            <Text style={[styles.summaryAmount, styles.incomeText]}>₵{summary.income.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Expenses</Text>
            <Text style={[styles.summaryAmount, styles.expenseText]}>₵{summary.expenses.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Balance</Text>
            <Text style={[styles.summaryAmount, styles.balanceText]}>₵{summary.balance.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.transactionsContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#E6007E" />
          ) : (
            <>
              {paginatedTransactions.map((transaction) => (
                <View key={transaction.id} style={styles.transactionItem}>
                  <View>
                    <Text style={styles.transactionDate}>
                      {new Date(transaction.date).toLocaleDateString()}
                    </Text>
                    <Text style={styles.transactionDescription}>{transaction.description}</Text>
                  </View>
                  <Text
                    style={[
                      styles.transactionAmount,
                      transaction.type === 'income' ? styles.incomeText : styles.expenseText
                    ]}
                  >
                    {transaction.type === 'income' ? '+' : '-'}₵{transaction.amount.toFixed(2)}
                  </Text>
                </View>
              ))}

              <View style={styles.pagination}>
                <TouchableOpacity
                  style={[styles.pageButton, page === 1 && styles.pageButtonDisabled]}
                  onPress={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <Text style={styles.pageButtonText}>Previous</Text>
                </TouchableOpacity>
                <Text style={styles.pageText}>Page {page} of {totalPages}</Text>
                <TouchableOpacity
                  style={[styles.pageButton, page === totalPages && styles.pageButtonDisabled]}
                  onPress={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  <Text style={styles.pageButtonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
  },
  creditCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  creditTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  creditAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#E6007E',
    marginBottom: 4,
  },
  creditDescription: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#E6007E',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  businessSection: {
    marginTop: 8,
    backgroundColor: '#FFF0F8',
    paddingVertical: 16,
  },
  benefitsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    marginTop: 8,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E6007E',
    marginBottom: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 16,
    color: '#666666',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: '600',
  },
  incomeText: {
    color: '#34C759',
  },
  expenseText: {
    color: '#FF3B30',
  },
  balanceText: {
    color: '#007AFF',
  },
  transactionsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  transactionDate: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  transactionDescription: {
    fontSize: 16,
    color: '#000000',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F1F1',
  },
  pageButton: {
    backgroundColor: '#E6007E',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  pageButtonDisabled: {
    backgroundColor: '#F1F1F1',
  },
  pageButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  pageText: {
    fontSize: 14,
    color: '#666666',
  },
});

export default CreditScreen; 