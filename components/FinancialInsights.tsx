import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface FinancialNews {
  id: string;
  title: string;
  source: string;
  date: string;
  imageUrl: string;
}

interface FinancialInsight {
  id: string;
  type: 'warning' | 'success' | 'info';
  message: string;
  action?: string;
}

const FinancialInsights: React.FC = () => {
  // Mock data - replace with actual data from your backend
  const insights: FinancialInsight[] = [
    {
      id: '1',
      type: 'warning',
      message: 'Your food expenses are 20% higher than last month',
      action: 'View Budget',
    },
    {
      id: '2',
      type: 'success',
      message: "You've saved ₵500 more than your monthly goal!",
      action: 'View Goals',
    },
    {
      id: '3',
      type: 'info',
      message: 'New feature: Connect your bank account for automatic tracking',
      action: 'Connect Now',
    },
  ];

  const news: FinancialNews[] = [
    {
      id: '1',
      title: 'Top 5 Money-Saving Tips for Young Professionals',
      source: 'Financial Times',
      date: '2024-03-15',
      imageUrl: 'https://placeholder.com/300x200',
    },
    {
      id: '2',
      title: 'Understanding Mobile Money Services in Ghana',
      source: 'Local Finance',
      date: '2024-03-14',
      imageUrl: 'https://placeholder.com/300x200',
    },
  ];

  const getInsightIcon = (type: FinancialInsight['type']) => {
    switch (type) {
      case 'warning':
        return { name: 'alert', color: '#FFD93D' };
      case 'success':
        return { name: 'check-circle', color: '#4ECDC4' };
      case 'info':
        return { name: 'information', color: '#45B7D1' };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GH', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Insights & News</Text>

      <View style={styles.insightsContainer}>
        {insights.map((insight) => {
          const icon = getInsightIcon(insight.type);
          return (
            <View key={insight.id} style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <Icon name={icon.name} size={24} color={icon.color} />
                <Text style={styles.insightMessage}>{insight.message}</Text>
              </View>
              {insight.action && (
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionText}>{insight.action}</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>

      <Text style={styles.sectionTitle}>Financial News</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.newsContainer}
      >
        {news.map((item) => (
          <TouchableOpacity key={item.id} style={styles.newsCard}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.newsImage}
              resizeMode="cover"
            />
            <View style={styles.newsContent}>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <View style={styles.newsFooter}>
                <Text style={styles.newsSource}>{item.source}</Text>
                <Text style={styles.newsDate}>{formatDate(item.date)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  insightsContainer: {
    marginBottom: 20,
  },
  insightCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  insightMessage: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#2c3e50',
  },
  actionButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#4ECDC4',
  },
  actionText: {
    color: '#4ECDC4',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
  },
  newsContainer: {
    flexGrow: 0,
  },
  newsCard: {
    width: 280,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginRight: 15,
    overflow: 'hidden',
  },
  newsImage: {
    width: '100%',
    height: 140,
  },
  newsContent: {
    padding: 15,
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsSource: {
    fontSize: 12,
    color: '#6c757d',
  },
  newsDate: {
    fontSize: 12,
    color: '#6c757d',
  },
});

export default FinancialInsights; 