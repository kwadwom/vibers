import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SmartPurseHomeCard from '../components/SmartPurseHomeCard';

const CreditOfferCard = () => (
  <View style={styles.creditCard}>
    <Text style={styles.creditTitle}>Instant credit for your personal needs</Text>
    <Text style={styles.creditAmount}>Up to ₵280</Text>
    <Text style={styles.creditDescription}>Get the funds to your wallet instantly!</Text>
    <TouchableOpacity style={styles.drawButton}>
      <Text style={styles.drawButtonText}>Draw now</Text>
    </TouchableOpacity>
  </View>
);

const BusinessLoanCard = () => (
  <View style={[styles.creditCard, styles.businessCard]}>
    <View style={styles.businessContent}>
      <View>
        <Text style={styles.businessTitle}>Get a bigger loan for your business</Text>
        <Text style={styles.businessDescription}>Start at ₵800 and grow up to ₵8,000!</Text>
        <View style={styles.businessButtons}>
          <TouchableOpacity>
            <Text style={styles.learnMoreText}>Learn more</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join FidoBiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <CreditOfferCard />
        <SmartPurseHomeCard />
        <BusinessLoanCard />
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
  creditCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    marginBottom: 8,
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
  drawButton: {
    backgroundColor: '#E6007E',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignSelf: 'flex-start',
  },
  drawButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  businessCard: {
    backgroundColor: '#F8FBFF',
    marginTop: 8,
  },
  businessContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  businessTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  businessDescription: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  businessButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  learnMoreText: {
    color: '#E6007E',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 16,
  },
  joinButton: {
    backgroundColor: '#E6007E',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default HomeScreen; 