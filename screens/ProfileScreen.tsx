import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface ProfileStat {
  label: string;
  value: string;
}

const ProfileStatItem = ({ label, value }: ProfileStat) => (
  <View style={styles.statItem}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const ProfileSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const ProfileScreen = () => {
  const stats: ProfileStat[] = [
    { label: 'Credit Score', value: '750' },
    { label: 'Total Loans', value: '3' },
    { label: 'Active Savings', value: '2' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>FK</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>Fido Kwadwo</Text>
              <Text style={styles.email}>fido@example.com</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={20} color="#E6007E" />
            </TouchableOpacity>
          </View>
        </View>

        <ProfileSection title="Account Overview">
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <ProfileStatItem key={index} {...stat} />
            ))}
          </View>
        </ProfileSection>

        <ProfileSection title="Account Details">
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Phone</Text>
            <Text style={styles.detailValue}>+233 20 123 4567</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>ID Type</Text>
            <Text style={styles.detailValue}>Ghana Card</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>ID Number</Text>
            <Text style={styles.detailValue}>GHA-123456789-0</Text>
          </View>
        </ProfileSection>

        <ProfileSection title="Verification Status">
          <View style={styles.verificationContainer}>
            <View style={styles.verificationStatus}>
              <Ionicons name="checkmark-circle" size={24} color="#00C853" />
              <Text style={styles.verificationText}>Account Verified</Text>
            </View>
            <Text style={styles.verificationDate}>Verified on: 14/05/2023</Text>
          </View>
        </ProfileSection>
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
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E6007E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
  nameContainer: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  email: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  editButton: {
    padding: 8,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666666',
  },
  detailValue: {
    fontSize: 16,
    color: '#000000',
  },
  verificationContainer: {
    alignItems: 'center',
  },
  verificationStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  verificationText: {
    fontSize: 16,
    color: '#00C853',
    marginLeft: 8,
    fontWeight: '500',
  },
  verificationDate: {
    fontSize: 14,
    color: '#666666',
  },
});

export default ProfileScreen; 