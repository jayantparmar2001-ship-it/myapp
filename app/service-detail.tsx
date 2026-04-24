import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { services } from '@/data/services';

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Service not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.iconContainer}>
          <IconSymbol name={service.icon as any} size={48} color="#1a73e8" />
        </View>

        <Text style={styles.name}>{service.name}</Text>
        <Text style={styles.category}>{service.category}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <IconSymbol name="dollarsign.circle.fill" size={24} color="#1a73e8" />
            <Text style={styles.infoLabel}>Price Range</Text>
            <Text style={styles.infoValue}>{service.price}</Text>
          </View>
          <View style={styles.infoCard}>
            <IconSymbol name="clock.fill" size={24} color="#1a73e8" />
            <Text style={styles.infoLabel}>Duration</Text>
            <Text style={styles.infoValue}>{service.duration}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{service.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's Included</Text>
          <View style={styles.bulletItem}>
            <IconSymbol name="checkmark.circle.fill" size={20} color="#34a853" />
            <Text style={styles.bulletText}>Professional & vetted service providers</Text>
          </View>
          <View style={styles.bulletItem}>
            <IconSymbol name="checkmark.circle.fill" size={20} color="#34a853" />
            <Text style={styles.bulletText}>Satisfaction guarantee</Text>
          </View>
          <View style={styles.bulletItem}>
            <IconSymbol name="checkmark.circle.fill" size={20} color="#34a853" />
            <Text style={styles.bulletText}>Flexible scheduling</Text>
          </View>
          <View style={styles.bulletItem}>
            <IconSymbol name="checkmark.circle.fill" size={20} color="#34a853" />
            <Text style={styles.bulletText}>Transparent pricing</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.requestButton}
          onPress={() => router.push({ pathname: '/request-service' as any, params: { id: service.id } })}
        >
          <Text style={styles.requestButtonText}>Request This Service</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 24,
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 24,
    backgroundColor: '#e8f0fe',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  category: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    marginTop: 6,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
  },
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  bulletText: {
    fontSize: 15,
    color: '#555',
  },
  footer: {
    padding: 20,
    paddingBottom: 34,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  requestButton: {
    backgroundColor: '#1a73e8',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  errorText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 60,
  },
});
