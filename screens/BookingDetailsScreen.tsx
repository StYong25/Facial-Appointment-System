import React, { useState } from 'react';
import { View, Alert, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { insertBookingData } from '../database';
const BookingDetailsUI = ({routes, navigation}) => {
  // Example list of services
  const services = [
    { id: '1', service: 'Haircut', duration: '30 Minutes', price: 20.0 },
    { id: '2', service: 'Shampoo', duration: '15 Minutes', price: 10.0 },
    { id: '3', service: 'Beard Trim', duration: '20 Minutes', price: 15.0 },
  ];

  const BookingScreen = () => {
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [pax, setPax] = useState(1);
  const [selectedTreatment, setSelectedTreatment] = useState('Facial Treatment');

  const handleBooking = async () => {
    if (!date || !timeSlot || !selectedTreatment) {
      Alert.alert('Please fill in all fields');
      return;
    }

    // Store booking details in SQLite
    await insertBookingData(date, timeSlot, pax, selectedTreatment);

    Alert.alert('Booking Confirmed', `Your booking for ${selectedTreatment} has been confirmed!`);
  };

  // State to toggle between showing total and full list
  const [showFullSummary, setShowFullSummary] = useState(false);

  // Calculate total price
  const totalPrice = services.reduce((sum, item) => sum + item.price, 0);

  // Render each service
  const renderService = ({ item }) => (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryText}>{item.service}</Text>
      <Text style={styles.summaryText}>{item.duration}</Text>
      <Text style={styles.summaryText}>${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('BookingOverviewScreen')}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
      </View>

      {/* Top Section: Status and Reference */}
      <View style={styles.topSection}>
        <View style={styles.statusContainer}>
          <Text style={styles.status}>Confirmed</Text>
        </View>
        <Text style={styles.reference}>Booking Reference: #12345</Text>
      </View>

      {/* Details Section */}
      <View style={styles.detailsSection}>
        {/* Day/Time Section */}
        <View style={styles.detailBox}>
          <Text style={styles.detailTitle}>Day & Time</Text>
          <Text style={styles.detailText}>April 30, 2025 - 10:00 AM</Text>
        </View>

        {/* Customer Info Section */}
        <View style={styles.detailBox}>
          <Text style={styles.detailTitle}>Customer Info</Text>
          <Text style={styles.detailText}>John Doe</Text>
          <Text style={styles.detailText}>+1 234 567 890</Text>
        </View>

        {/* Payment Details Section */}
        <View style={styles.detailBox}>
          <Text style={styles.detailTitle}>Payment Method</Text>
          <Text style={styles.detailText}>Credit Card (**** **** **** 1234)</Text>
        </View>
      </View>

      {/* Bottom Section: Booking Summary */}
      <TouchableOpacity
        style={styles.bookingSummaryContainer}
        onPress={() => setShowFullSummary(!showFullSummary)}
      >
        <Text style={styles.summaryTitle}>Booking Summary</Text>

        {/* Hint for users */}
        <Text style={styles.hintText}>
          {showFullSummary ? 'Tap to collapse' : 'Tap to view details'}
        </Text>
        
        {showFullSummary && (
          <>
            {/* Table Headers */}
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryText, styles.boldText]}>Service</Text>
              <Text style={[styles.summaryText, styles.boldText]}>Duration</Text>
              <Text style={[styles.summaryText, styles.boldText]}>Price</Text>
            </View>
            {/* List of Services */}
            <FlatList
              data={services}
              renderItem={renderService}
              keyExtractor={(item) => item.id}
            />
          </>
        )}

          {/* Summary Row: Service, Duration, Price */}
        {/* Always show the total */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>${totalPrice.toFixed(2)}</Text>
        </View>

        {/* Conditionally show full summary */}
      </TouchableOpacity>
    </ScrollView>
  );
};}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 15,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  topSection: {
    padding: 20,
    backgroundColor: '#D7C6E6',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  statusContainer: {
    marginBottom: 10,
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5B8C5A',
  },
  reference: {
    fontSize: 16,
    color: '#333',
  },
  detailsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  detailBox: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3, // For Android shadow
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  bookingSummaryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FAF9F6',
    borderTopWidth: 1,
    borderColor: '#D3D3D3',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  hintText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
    flex: 1, // Ensures equal spacing for each column
    textAlign: 'center', // Center aligns each column
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#D3D3D3',
    marginBottom: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default BookingDetailsUI;