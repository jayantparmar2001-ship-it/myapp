import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { services } from '@/data/services';
import { useRequests } from '@/context/requests-context';

export default function RequestServiceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addRequest } = useRequests();
  const service = services.find((s) => s.id === id);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  if (!service) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Service not found</Text>
      </View>
    );
  }

  const handleSubmit = () => {
    if (!date.trim() || !time.trim() || !address.trim()) {
      Alert.alert('Error', 'Please fill in date, time, and address');
      return;
    }

    addRequest({
      serviceId: service.id,
      serviceName: service.name,
      date: date.trim(),
      time: time.trim(),
      address: address.trim(),
      notes: notes.trim(),
    });

    Alert.alert('Request Submitted!', 'Your service request has been submitted successfully.', [
      { text: 'OK', onPress: () => router.dismiss() },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.serviceHeader}>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text style={styles.servicePrice}>{service.price}</Text>
        </View>

        <Text style={styles.label}>Preferred Date</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., April 25, 2026"
          placeholderTextColor="#999"
          value={date}
          onChangeText={setDate}
        />

        <Text style={styles.label}>Preferred Time</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 10:00 AM"
          placeholderTextColor="#999"
          value={time}
          onChangeText={setTime}
        />

        <Text style={styles.label}>Service Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full address"
          placeholderTextColor="#999"
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Additional Notes (Optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Any special instructions or details..."
          placeholderTextColor="#999"
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  serviceHeader: {
    backgroundColor: '#e8f0fe',
    borderRadius: 14,
    padding: 18,
    marginBottom: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a73e8',
  },
  servicePrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 4,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 18,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  textArea: {
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: '#1a73e8',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  submitText: {
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
