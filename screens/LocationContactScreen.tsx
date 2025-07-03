import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const UTAR_LOCATION = {
  latitude: 3.045197,
  longitude: 101.789652,
};

const LocationContactScreen = () => {
  const navigation = useNavigation();

  const actions = [
    { icon: 'phone', label: 'Call Us', onPress: () => Linking.openURL('tel:+601137531085') },
    { icon: 'email', label: 'Email', onPress: () => Linking.openURL('seahzy1@gmail.com') },
    { icon: 'whatsapp', label: 'WhatsApp', onPress: () => Linking.openURL('https://wa.me/601137531085') },
    { icon: 'facebook', label: 'Facebook', onPress: () => Linking.openURL('https://web.facebook.com/soo.kokleang') },
    { icon: 'instagram', label: 'Instagram', onPress: () => Linking.openURL('https://instagram.com/seahzy1') },
    { icon: 'map-marker', label: 'Google Maps', onPress: () => {
      const { latitude, longitude } = UTAR_LOCATION;
      const url = `geo:${latitude},${longitude}?q=${latitude},${longitude}(UTAR+Sungai+Long+Campus)`;
      Linking.openURL(url).catch(err => console.error('Error opening Google Maps:', err));
    }},
  ];

  return (
    <View style={styles.container}>

      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Get in Touch with Us</Text>
        <Text style={styles.heroSubtitle}>We’re here to assist you with all your beauty needs.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {actions.map((action, idx) => (
          <TouchableOpacity key={idx} style={styles.card} onPress={action.onPress}>
            <Icon name={action.icon} size={30} color="#A7C7E7" />
            <Text style={styles.cardText}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, 
    backgroundColor: '#FAF9F6', 
  }, 
  
heroSection: {
  backgroundColor: '#FFB3AB',
  paddingVertical: 60, 
  paddingHorizontal: 20,
  alignItems: 'center',
},
heroTitle: {
  color: '#FFFFFF',
  fontSize: 24, 
  fontWeight: 'bold',
  marginBottom: 8,
  textAlign: 'center',
},
heroSubtitle: {
  color: '#FFFFFF',
  fontSize: 14, 
  textAlign: 'center',
},
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  card: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#333333',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardText: {
    fontSize: 18,
    color: '#333333', 
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LocationContactScreen;
