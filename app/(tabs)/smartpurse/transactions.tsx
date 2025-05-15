import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Modal, TextInput, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useState, useEffect } from 'react';

type Transaction = {
  id: string;
  provider: string;
  date: string;
  amount: string;
  type: 'income' | 'expense';
};

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [displayedTransactions, setDisplayedTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [page, setPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    provider: '',
    amount: '',
    type: 'expense' as 'income' | 'expense',
    date: new Date()
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const today = new Date();
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      
      const startDate = firstDay.toISOString().split('T')[0];
      const endDate = lastDay.toISOString().split('T')[0];
      
      const response = await fetch(
        `https://3vmzeeor55.execute-api.eu-west-1.amazonaws.com/Prod/transactions?client_id=24021055&transaction_date_start=${startDate}&transaction_date_end=${endDate}`
      );
      const data = await response.json();
      
      // Calculate totals directly from API data
      const income = data
        .filter((item: any) => item.trans_type === 'CREDIT')
        .reduce((sum: number, item: any) => sum + parseFloat(item.amount), 0);
      
      const expenses = data
        .filter((item: any) => item.trans_type === 'DEBIT')
        .reduce((sum: number, item: any) => sum + parseFloat(item.amount), 0);
      
      setTotalIncome(income);
      setTotalExpenses(expenses);

      const formattedTransactions = data.map((item: any) => ({
        id: item.id || String(Math.random()),
        provider: item.provider,
        date: new Date(item.transaction_date).toLocaleDateString(),
        amount: `${item.trans_type === 'CREDIT' ? '+' : '-'}GH₵${parseFloat(item.amount).toFixed(2)}`,
        type: item.trans_type === 'CREDIT' ? 'income' : 'expense'
      }));

      setTransactions(formattedTransactions);
      setDisplayedTransactions(formattedTransactions.slice(0, ITEMS_PER_PAGE));
      setError(null);
    } catch (err) {
      setError('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const loadMoreTransactions = () => {
    if (loadingMore || displayedTransactions.length >= transactions.length) return;
    
    setLoadingMore(true);
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    setDisplayedTransactions(prev => [
      ...prev,
      ...transactions.slice(startIndex, endIndex)
    ]);
    setPage(nextPage);
    setLoadingMore(false);
  };

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    
    if (layoutMeasurement.height + contentOffset.y >= 
        contentSize.height - paddingToBottom) {
      loadMoreTransactions();
    }
  };

  const handleAddTransaction = () => {
    const formattedTransaction: Transaction = {
      id: String(Math.random()),
      provider: newTransaction.provider,
      date: newTransaction.date.toLocaleDateString(),
      amount: `${newTransaction.type === 'income' ? '+' : '-'}GH₵${parseFloat(newTransaction.amount).toFixed(2)}`,
      type: newTransaction.type
    };

    setTransactions([formattedTransaction, ...transactions]);
    setDisplayedTransactions([formattedTransaction, ...displayedTransactions]);
    setModalVisible(false);
    setNewTransaction({ provider: '', amount: '', type: 'expense', date: new Date() });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SmartPurse</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Transaction</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Provider"
              value={newTransaction.provider}
              onChangeText={(text) => setNewTransaction(prev => ({ ...prev, provider: text }))}
            />
            
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[styles.dateText, !newTransaction.date && styles.placeholderText]}>
                {newTransaction.date ? newTransaction.date.toLocaleDateString() : 'Select Date'}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={newTransaction.date}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setNewTransaction(prev => ({ ...prev, date: selectedDate }));
                  }
                }}
              />
            )}
            
            <TextInput
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              value={newTransaction.amount}
              onChangeText={(text) => setNewTransaction(prev => ({ ...prev, amount: text }))}
            />
            
            <View style={styles.typeSelector}>
              <TouchableOpacity
                style={[styles.typeButton, newTransaction.type === 'expense' && styles.selectedType]}
                onPress={() => setNewTransaction(prev => ({ ...prev, type: 'expense' }))}
              >
                <Text style={[styles.typeButtonText, newTransaction.type === 'expense' && styles.selectedTypeText]}>Expense</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeButton, newTransaction.type === 'income' && styles.selectedType]}
                onPress={() => setNewTransaction(prev => ({ ...prev, type: 'income' }))}
              >
                <Text style={[styles.typeButtonText, newTransaction.type === 'income' && styles.selectedTypeText]}>Income</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddTransaction}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => {
          router.replace('../smartpurse/transactions');
        }}>
          <Text style={styles.activeTab}>Transactions</Text>
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
          <Text style={styles.tab}>Reports</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summarySection}>
        <Text style={styles.sectionTitle}>Financial Summary</Text>
        <View style={styles.summaryCards}>
          <View style={[styles.summaryCard, styles.incomeCard]}>
            <Text style={styles.summaryLabel}>Income</Text>
            <Text style={styles.summaryAmount}>GH₵{totalIncome.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryCard, styles.expenseCard]}>
            <Text style={styles.summaryLabel}>Expenses</Text>
            <Text style={styles.summaryAmount}>GH₵{totalExpenses.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryCard, styles.balanceCard]}>
            <Text style={styles.summaryLabel}>Balance</Text>
            <Text style={[styles.summaryAmount, (totalIncome - totalExpenses) < 0 ? styles.expenseText : styles.incomeText]}>
              {(totalIncome - totalExpenses) >= 0 ? '+' : ''}
              GH₵{(totalIncome - totalExpenses).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.transactionsHeader}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Transactions</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add Transaction</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={400}>
        <View style={styles.transactionsList}>

          {loading ? (
            <ActivityIndicator size="large" color="#E6007E" style={styles.loader} />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : displayedTransactions.length === 0 ? (
            <Text style={styles.emptyText}>No transactions found</Text>
          ) : (
            <>
              {displayedTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionTitle}>{transaction.provider}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
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
              {loadingMore && (
                <ActivityIndicator 
                  size="small" 
                  color="#E6007E" 
                  style={styles.loadingMore} 
                />
              )}
              {!loadingMore && displayedTransactions.length < transactions.length && (
                <TouchableOpacity 
                  style={styles.loadMoreButton} 
                  onPress={loadMoreTransactions}
                >
                  <Text style={styles.loadMoreText}>Load More</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dateText: {
    fontSize: 16,
    color: '#000000',
  },
  placeholderText: {
    color: '#666666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedType: {
    backgroundColor: '#E6007E',
    borderColor: '#E6007E',
  },
  typeButtonText: {
    color: '#666666',
    fontSize: 16,
  },
  selectedTypeText: {
    color: '#FFFFFF',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
  saveButton: {
    backgroundColor: '#E6007E',
  },
  cancelButtonText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  transactionsHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  transactionsList: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingHorizontal: 16,
  },
  summarySection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    zIndex: 1,
  },
  loadingMore: {
    marginVertical: 10,
  },
  loadMoreButton: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  loadMoreText: {
    color: '#E6007E',
    fontWeight: '500',
  },
  loader: {
    marginVertical: 20,
  },
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    marginVertical: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666666',
    marginVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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