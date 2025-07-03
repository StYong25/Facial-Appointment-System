import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { insertMultipleData, fetchTreatmentDetails, createTreatmentTable } from '../database';

const imageMap = {
  'Facials_Spa1.jpg': require('../assets/Facials_Spa1.jpg'),
  'Facials_Spa2.jpg': require('../assets/Facials_Spa2.jpg'),
  'Facials_Spa3.jpg': require('../assets/Facials_Spa3.jpg'),
  'Facials_Spa4.jpg': require('../assets/Facials_Spa4.jpg'),
};

const TreatmentScreen = () => {
  const [treatments, setTreatments] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadTreatments = async () => {
      await createTreatmentTable();
      await insertMultipleData();
      const storedTreatments = await fetchTreatmentDetails();
      setTreatments(storedTreatments);
      setFilteredData(storedTreatments);
    };
    loadTreatments();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = text === ''
      ? treatments
      : treatments.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
    setFilteredData(filtered);
  };

  const renderItem = ({ item }) => {
    const imageSource = imageMap[item.image];
    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Image source={imageSource} style={styles.productImage} />
          <Text style={styles.productName}>{item.name}</Text>
          <View style={styles.productComponent}>
            <Text style={styles.productPrice}>Price: {item.price}</Text>
            <Text style={styles.productPeriod}>Duration: {item.period}</Text>
          </View>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.Mainbutton}
            onPress={() => navigation.navigate('makeBooking', { item })}
          >
            <Text style={styles.buttonText}>Make Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Detailbutton}
            onPress={() => navigation.navigate('TreatmentDetails', { item })}
          >
            <Text style={styles.buttonText}>More Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="#333333" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Treatments"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf9f6' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 3,
    margin: 10,
    marginTop: 60,
  },
  searchInput: { fontSize: 16, color: '#333333', marginLeft: 10, flex: 1 },
  card: { backgroundColor: '#F5F0FA', margin: 10, padding: 15, borderRadius: 10 },
  cardContent: { alignItems: 'center' },
  productImage: { width: 300, height: 150, margin: 10, borderRadius: 10 },
  productComponent: { flexDirection: 'row', justifyContent: 'center', padding: 10 },
  productName: { fontSize: 20, fontWeight: 'bold', color: '#333333' },
  productPrice: { fontSize: 16, color: '#777777', marginRight: 20 },
  productPeriod: { fontSize: 16, color: '#777777', marginLeft: 10 },
  cardActions: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 25, marginBottom: 5 },
  Mainbutton: { backgroundColor: '#65DEF1', padding: 10, borderRadius: 19 },
  Detailbutton: { backgroundColor: '#A8DCD1', padding: 10, borderRadius: 19 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default TreatmentScreen;
