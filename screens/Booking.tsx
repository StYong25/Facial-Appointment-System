import React, { useState } from 'react';
import {
  View, Text, Alert, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomButton } from '../assets/customButton';
import { insertBookingData, createBookingTable } from '../database';
import { auth } from '../firebaseConfig';

const BookingScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState('');
  const [pax, setPax] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState('');

  const timeSlots = ['09:00', '11:00', '15:00'];
  const treatments = [
    'Hydrating Glow Facial',
    'Anti-Aging Rejuvenation Facial',
    'Acne Clarifying Facial',
    'Luxury Relaxation Facial',
  ];

  const handleSubmit = async () => {
    if (!selectedTreatment || !timeSlot) {
      Alert.alert('Missing Info', 'Please fill in all fields.');
      return;
    }

    const userEmail = auth.currentUser?.email;
    if (!userEmail) {
      Alert.alert('Error', 'User not logged in.');
      return;
    }

    try {
      await createBookingTable();

      const selectedDateTime = new Date(date);
      const [hours, minutes] = timeSlot.split(':');
      selectedDateTime.setHours(parseInt(hours), parseInt(minutes));

      Alert.alert(
        'Booking Summary',
        `Treatment: ${selectedTreatment}\nDate: ${selectedDateTime.toLocaleString()}\nPax: ${pax}`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Proceed to Payment',
            onPress: async () => {
              try {
                await insertBookingData(
                  selectedDateTime.toISOString(),
                  timeSlot,
                  pax,
                  selectedTreatment,
                  userEmail
                );
                navigation.navigate('BookingOverview');
              } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Failed to complete booking. Please try again.');
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to prepare booking. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Book Your Appointment</Text>

      <Text style={styles.label}>Select Treatment:</Text>
      <Picker
        selectedValue={selectedTreatment}
        onValueChange={(value) => setSelectedTreatment(value)}
        style={styles.picker}
      >
        <Picker.Item label="Select a treatment" value="" />
        {treatments.map((treatment) => (
          <Picker.Item key={treatment} label={treatment} value={treatment} />
        ))}
      </Picker>

      <Text style={styles.label}>Choose Appointment Date:</Text>
      <TouchableOpacity onPress={() => setOpen(true)} style={styles.dateButton}>
        <Text style={styles.dateButtonText}>{date.toDateString()}</Text>
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(selectedDate) => {
          setOpen(false);
          setDate(selectedDate);
        }}
        onCancel={() => setOpen(false)}
        mode="date"
      />

      <Text style={styles.label}>Select Time Slot:</Text>
      <View style={styles.timeSlotContainer}>
        {timeSlots.map((slot) => (
          <TouchableOpacity
            key={slot}
            style={[
              styles.timeSlotButton,
              timeSlot === slot && styles.timeSlotButtonSelected,
            ]}
            onPress={() => setTimeSlot(slot)}
          >
            <Text style={styles.timeSlotText}>{slot}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Number of Pax:</Text>
      <Picker
        selectedValue={pax}
        onValueChange={(value) => setPax(value)}
        style={styles.picker}
      >
        {[1, 2, 3, 4].map((num) => (
          <Picker.Item key={num} label={`${num}`} value={num} />
        ))}
      </Picker>

      <CustomButton title="Proceed to Payment" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#FAF9F6',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 20,
    color: '#333333',
  },
  dateButton: {
    backgroundColor: '#A7C7E7',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  dateButtonText: {
    color: '#333333',
    fontSize: 16,
  },
  timeSlotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  timeSlotButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#A7C7E7',
  },
  timeSlotButtonSelected: {
    backgroundColor: '#FFB3AB',
  },
  timeSlotText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
});

export default BookingScreen;
