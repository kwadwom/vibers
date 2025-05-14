import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList } from '../navigation/types';

type Section = RootStackParamList['SmartPurse']['initialSection'];

const SmartPurseHomeCard = () => {
  const navigation = useNavigation();

  const navigateToSmartPurse = (section?: Section) => {
    navigation.navigate('SmartPurse', { initialSection: section });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={() => navigateToSmartPurse()}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Smart Purse</Text>
            <Text style={styles.subtitle}>Track expenses, save & budget</Text>
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <Text style={styles.balanceAmount}>₵25,000</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <Icon name="wallet-outline" size={48} color="#E6007E" />
          </View>
        </View>
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigateToSmartPurse('budget')}
          >
            <Icon name="chart-line" size={20} color="#E6007E" />
            <Text style={styles.actionText}>Budget</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigateToSmartPurse('savings')}
          >
            <Icon name="piggy-bank" size={20} color="#E6007E" />
            <Text style={styles.actionText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigateToSmartPurse('transactions')}
          >
            <Icon name="bank-transfer" size={20} color="#E6007E" />
            <Text style={styles.actionText}>Transfer</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 16,
    marginTop: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  balanceContainer: {
    marginTop: 8,
  },
  balanceLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  iconContainer: {
    backgroundColor: '#FFF0F8',
    padding: 12,
    borderRadius: 12,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f3f5',
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionText: {
    fontSize: 12,
    color: '#E6007E',
    marginTop: 4,
    fontWeight: '500',
  },
});

export default SmartPurseHomeCard; 