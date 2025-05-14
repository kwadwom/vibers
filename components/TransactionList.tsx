import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  icon: string;
}

const TransactionList: React.FC = () => {
  // Mock data - replace with actual data from your backend
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'expense',
      amount: 250,
      category: 'Food',
      description: 'Grocery Shopping',
      date: '2024-03-15',
      icon: 'food',
    },
    {
      id: '2',
      type: 'income',
      amount: 3000,
      category: 'Salary',
      description: 'Monthly Salary',
      date: '2024-03-01',
      icon: 'cash',
    },
    {
      id: '3',
      type: 'expense',
      amount: 50,
      category: 'Transportation',
      description: 'Uber Ride',
      date: '2024-03-14',
      icon: 'car',
    },
    {
      id: '4',
      type: 'expense',
      amount: 100,
      category: 'Utilities',
      description: 'Electricity Bill',
      date: '2024-03-10',
      icon: 'flash',
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GH', {
      month: 'short',
      day: 'numeric',
    });
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <TouchableOpacity style={styles.transactionCard}>
      <View style={styles.iconContainer}>
        <Icon
          name={item.icon}
          size={24}
          color={item.type === 'income' ? '#4ECDC4' : '#FF6B6B'}
        />
      </View>
      
      <View style={styles.transactionInfo}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text
          style={[
            styles.amount,
            { color: item.type === 'income' ? '#4ECDC4' : '#FF6B6B' },
          ]}
        >
          {item.type === 'income' ? '+' : '-'}₵{item.amount.toLocaleString()}
        </Text>
        <Text style={styles.date}>{formatDate(item.date)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Transactions</Text>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="plus" size={24} color="#2c3e50" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  addButton: {
    padding: 8,
  },
  list: {
    maxHeight: 400,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionInfo: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: '#6c757d',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#6c757d',
  },
});

export default TransactionList; 