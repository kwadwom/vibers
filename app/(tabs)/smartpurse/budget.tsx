import { View, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, ActivityIndicator } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useState, useEffect } from 'react';
import { fetchBudgets, createBudget, Budget as ApiBudget } from '../../../services/api';

type Budget = {
  budget_id: number;
  category: string;
  amount: string;
  cycle: string;
  spent?: number;
  progress?: number;
};

export default function BudgetScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newBudget, setNewBudget] = useState<{
    category: string;
    amount: string;
    cycle: string;
  }>({
    category: '',
    amount: '',
    cycle: 'monthly'
  });
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const loadBudgets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchBudgets('24021055');
      // Add spent and progress properties for UI
      const enhancedBudgets = data.map(budget => ({
        ...budget,
        spent: 0, // This would need to come from a transactions API
        progress: 0 // This would need to be calculated from transactions
      }));
      setBudgets(enhancedBudgets);
    } catch (err) {
      setError('Failed to load budgets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBudgets();
  }, []);

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
            <Text style={styles.activeTab}>Budgets</Text>
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

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Budgets</Text>
            <TouchableOpacity 
              style={styles.createButton}
              onPress={() => setModalVisible(true)}
            >
              <Ionicons name="add-circle" size={20} color="#fff" />
              <Text style={styles.createButtonText}>Create Budget</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#E6007E" style={styles.loader} />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : budgets.length === 0 ? (
            <Text style={styles.emptyText}>No budgets found. Create your first budget!</Text>
          ) : budgets.map((budget: Budget) => (
            <View key={budget.budget_id} style={styles.budgetCard}>
              <View style={styles.budgetHeader}>
                <View>
                  <Text style={styles.budgetCategory}>{budget.category}</Text>
                  <Text style={styles.budgetFrequency}>{budget.cycle}</Text>
                </View>
                <Text style={styles.budgetAmount}>
                  GH₵{budget.spent || 0} of GH₵{budget.amount}
                </Text>
              </View>
              <View style={styles.progressContainer}>
                <View style={styles.progressBarBg}>
                  <View
                    style={[styles.progressBar, { width: `${(budget.progress || 0) * 100}%` }]}
                  />
                </View>
                <Text style={styles.progressText}>{Math.round((budget.progress || 0) * 100)}% used</Text>
              </View>
            </View>
          ))}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Create Budget</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Category (e.g., Food, Transport)"
                value={newBudget.category}
                onChangeText={(text) => setNewBudget(prev => ({ ...prev, category: text }))}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Amount (GH₵)"
                keyboardType="decimal-pad"
                value={newBudget.amount}
                onChangeText={(text) => setNewBudget(prev => ({ ...prev, amount: text }))}
              />
              
              <View style={styles.frequencySelector}>
                <TouchableOpacity
                  style={[styles.frequencyButton, newBudget.cycle === 'monthly' && styles.selectedFrequency]}
                  onPress={() => setNewBudget(prev => ({ ...prev, cycle: 'monthly' }))}
                >
                  <Text style={[styles.frequencyButtonText, newBudget.cycle === 'monthly' && styles.selectedFrequencyText]}>
                    Monthly
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => {
                    setModalVisible(false);
                    setNewBudget({ category: '', amount: '', cycle: 'monthly' });
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={async () => {
                    try {
                      await createBudget({
                        client_id: '24021055',
                        category: newBudget.category,
                        amount: newBudget.amount,
                        cycle: newBudget.cycle
                      });
                      // Reload budgets to get the new one
                      await loadBudgets();
                      setModalVisible(false);
                      setNewBudget({ category: '', amount: '', cycle: 'monthly' });
                    } catch (err) {
                      console.error('Failed to create budget:', err);
                      // You might want to show an error message to the user here
                    }
                  }}
                >
                  <Text style={styles.saveButtonText}>Create Budget</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: '#E6007E',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
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
  frequencySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  frequencyButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedFrequency: {
    backgroundColor: '#E6007E',
    borderColor: '#E6007E',
  },
  frequencyButtonText: {
    color: '#666666',
    fontSize: 14,
  },
  selectedFrequencyText: {
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