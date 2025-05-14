import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
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

const CreditScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Credit</Text>
          <Text style={styles.headerSubtitle}>Quick access to funds</Text>
        </View>

        <CreditCard
          title="Instant credit for your personal needs"
          amount="Up to ₵280"
          description="Get the funds to your wallet instantly!"
          buttonText="Draw now"
        />

        <View style={styles.businessSection}>
          <CreditCard
            title="Business loan"
            amount="Up to ₵8,000"
            description="Grow your business with flexible financing"
            buttonText="Apply now"
          />
          
          <View style={styles.benefitsCard}>
            <Text style={styles.benefitsTitle}>Benefits</Text>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitText}>• Quick approval process</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitText}>• No collateral required</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitText}>• Flexible repayment terms</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitText}>• Competitive interest rates</Text>
            </View>
          </View>
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
    borderBottomColor: '#F0F0F0',
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
    color: '#000000',
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
    color: '#000000',
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
});

export default CreditScreen; 