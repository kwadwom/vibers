import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  color?: string;
}

const MenuSection = ({ title, items }: { title: string; items: MenuItem[] }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {items.map((item) => (
      <TouchableOpacity key={item.id} style={styles.menuItem}>
        <View style={styles.menuItemContent}>
          <View style={[styles.iconContainer, item.color ? { backgroundColor: item.color } : {}]}>
            <Ionicons name={item.icon as any} size={24} color={item.color ? '#FFFFFF' : '#666666'} />
          </View>
          <Text style={styles.menuItemText}>{item.title}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#666666" />
      </TouchableOpacity>
    ))}
  </View>
);

const MenuScreen = () => {
  const quickActions: MenuItem[] = [
    { id: '1', title: 'Send Money', icon: 'paper-plane', color: '#E6007E' },
    { id: '2', title: 'Request Money', icon: 'cash', color: '#00C853' },
    { id: '3', title: 'Pay Bills', icon: 'receipt', color: '#2196F3' },
  ];

  const settings: MenuItem[] = [
    { id: '1', title: 'Account Settings', icon: 'settings-outline' },
    { id: '2', title: 'Security', icon: 'shield-outline' },
    { id: '3', title: 'Notifications', icon: 'notifications-outline' },
    { id: '4', title: 'Help & Support', icon: 'help-circle-outline' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Menu</Text>
        </View>

        <MenuSection title="Quick Actions" items={quickActions} />
        <MenuSection title="Settings" items={settings} />

        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#E6007E" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
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
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#000000',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    padding: 16,
  },
  logoutText: {
    fontSize: 16,
    color: '#E6007E',
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default MenuScreen; 