import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRequests } from '@/context/requests-context';

const statusColors: Record<string, { bg: string; text: string }> = {
  pending: { bg: '#fff3cd', text: '#856404' },
  confirmed: { bg: '#d4edda', text: '#155724' },
  'in-progress': { bg: '#cce5ff', text: '#004085' },
  completed: { bg: '#d1e7dd', text: '#0f5132' },
  cancelled: { bg: '#f8d7da', text: '#721c24' },
};

export default function MyRequestsScreen() {
  const { requests, cancelRequest } = useRequests();

  const handleCancel = (id: string) => {
    Alert.alert('Cancel Request', 'Are you sure you want to cancel this request?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes, Cancel', style: 'destructive', onPress: () => cancelRequest(id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Requests</Text>

      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const colors = statusColors[item.status] || statusColors.pending;
          return (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.serviceName}>{item.serviceName}</Text>
                <View style={[styles.statusBadge, { backgroundColor: colors.bg }]}>
                  <Text style={[styles.statusText, { color: colors.text }]}>
                    {item.status.replace('-', ' ').toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.detail}>
                <Text style={styles.detailLabel}>Date:</Text>
                <Text style={styles.detailValue}>{item.date}</Text>
              </View>
              <View style={styles.detail}>
                <Text style={styles.detailLabel}>Time:</Text>
                <Text style={styles.detailValue}>{item.time}</Text>
              </View>
              <View style={styles.detail}>
                <Text style={styles.detailLabel}>Address:</Text>
                <Text style={styles.detailValue}>{item.address}</Text>
              </View>
              {item.notes ? (
                <View style={styles.detail}>
                  <Text style={styles.detailLabel}>Notes:</Text>
                  <Text style={styles.detailValue}>{item.notes}</Text>
                </View>
              ) : null}

              {item.status === 'pending' && (
                <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancel(item.id)}>
                  <Text style={styles.cancelText}>Cancel Request</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No requests yet</Text>
            <Text style={styles.emptySubtitle}>
              Browse services and submit your first request!
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  listContent: {
    padding: 20,
    gap: 14,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  detail: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: '#888',
    width: 70,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  cancelButton: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dc3545',
    alignItems: 'center',
  },
  cancelText: {
    color: '#dc3545',
    fontWeight: '600',
    fontSize: 14,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
});
