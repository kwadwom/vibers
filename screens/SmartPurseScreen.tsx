import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransactionList from '../components/TransactionList';
import SavingsGoals from '../components/SavingsGoals';
import BudgetOverview from '../components/BudgetOverview';

const SmartPurseScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <BudgetOverview />
        </View>
        
        <View style={styles.section}>
          <TransactionList />
        </View>
        
        <View style={styles.section}>
          <SavingsGoals />
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
  section: {
    marginBottom: 16,
  },
});

export default SmartPurseScreen; 