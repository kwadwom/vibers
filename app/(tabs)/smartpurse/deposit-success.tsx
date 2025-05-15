import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function DepositSuccessScreen() {
  const params = useLocalSearchParams<{ amount: string }>();
  const { amount } = params;

  const formattedAmount = new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2
  }).format(Number(amount || 0));

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={styles.closeButton}
        onPress={() => router.push('../smartpurse/goals')}
      >
        <Ionicons name="close" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>You are officially{'\n'}an EasySaver!</Text>
        
        <Text style={styles.message}>
          Your deposit of {formattedAmount}{'\n'}
          was successfully received.
        </Text>

        <View style={styles.imageContainer}>
          <Ionicons 
            name="wallet-outline" 
            size={100} 
            color="#D6086B" 
            style={styles.walletIcon}
          />
          <View style={styles.coinsContainer}>
            <Ionicons name="logo-usd" size={24} color="#FFD700" style={styles.coin} />
            <Ionicons name="logo-usd" size={24} color="#FFD700" style={styles.coin} />
            <Ionicons name="logo-usd" size={24} color="#FFD700" style={styles.coin} />
          </View>
        </View>

        <TouchableOpacity 
          style={styles.viewSavingsButton}
          onPress={() => router.push('../smartpurse/goals')}
        >
          <Text style={styles.viewSavingsButtonText}>View my savings</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.backHomeButton}
          onPress={() => router.push('../smartpurse/transactions')}
        >
          <Text style={styles.backHomeButtonText}>Back home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomIndicator} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#000000',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
    marginBottom: 40,
  },
  imageContainer: {
    width: 200,
    height: 200,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletIcon: {
    marginBottom: 16,
  },
  coinsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
  },
  coin: {
    marginHorizontal: 4,
  },
  viewSavingsButton: {
    backgroundColor: '#D6086B',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    marginBottom: 16,
  },
  viewSavingsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  backHomeButton: {
    paddingVertical: 16,
  },
  backHomeButtonText: {
    color: '#D6086B',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  bottomIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 8,
    opacity: 0.2,
  },
});
