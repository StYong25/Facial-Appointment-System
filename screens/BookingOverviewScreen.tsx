import React, { useState } from 'react';
import { Text, StyleSheet, View, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { auth } from '../firebaseConfig';
import { fetchBookingData } from '../database';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const BookingOverviewScreen = () => {
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);

 
  useFocusEffect(
    useCallback(() => {
      const loadBookings = async () => {
        const userEmail = auth.currentUser?.email;
        if (!userEmail) return;

        const bookingHistory = await fetchBookingData(userEmail);
        console.log('Fetched Bookings:', bookingHistory); 

        const now = new Date();
        const upcoming = bookingHistory.filter((b) => new Date(b.date) > now);
        const past = bookingHistory.filter((b) => new Date(b.date) <= now);

        setUpcomingBookings(upcoming);
        setPastBookings(past);
      };

      loadBookings();
    }, [])
  );

  const renderBookingItem = ({ item }) => {
    const bookingDate = new Date(item.date);
    const now = new Date();

    const isUpcoming = bookingDate > now;
    const statusText = isUpcoming ? 'Confirmed' : 'Successful';
    const statusColor = isUpcoming ? '#65DEF1' : 'red';

    return (
      <View style={styles.bookingCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.bookingIdText}>Booking ID: {item.id}</Text>
          <Text style={[styles.bookingStatusText, { color: statusColor }]}>
            {statusText}
          </Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.treatmentName}>{item.treatment}</Text>
          <Text style={styles.bookingDate}>{bookingDate.toLocaleString()}</Text>
          <View style={styles.paxContainer}>
            <Icon name="person" size={16} color="#333" />
            <Text style={styles.paxText}>{item.pax}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Upcoming Bookings</Text>
      {upcomingBookings.length === 0 ? (
        <Text style={styles.emptyMessage}>No upcoming bookings found.</Text>
      ) : (
        <FlatList
          data={upcomingBookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBookingItem}
          scrollEnabled={false}
        />
      )}

      <Text style={styles.sectionTitle}>Past Bookings</Text>
      {pastBookings.length === 0 ? (
        <Text style={styles.emptyMessage}>No past bookings found.</Text>
      ) : (
        <FlatList
          data={pastBookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBookingItem}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6', paddingHorizontal: 15 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  bookingCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10
   },
  bookingIdText: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  bookingStatusText: { 
    fontSize: 14, 
    fontWeight: 'bold' 
  },
  cardBody: { 
    flexDirection: 'column' 
  },
  treatmentName: { 
    fontSize: 16, 
    color: '#555', 
    marginBottom: 5 
  },
  bookingDate: { 
    fontSize: 14, 
    color: '#777', 
    marginBottom: 5 
  },
  paxContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  paxText: { 
    fontSize: 14, 
    color: '#333', 
    marginLeft: 5 
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 20,
    fontSize: 16,
  },
});

export default BookingOverviewScreen;
