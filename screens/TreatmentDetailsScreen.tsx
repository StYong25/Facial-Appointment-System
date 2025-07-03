import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import YIcon from 'react-native-vector-icons/MaterialIcons';

const imageMap = {
  'Facials_Spa1.jpg': require('../assets/Facials_Spa1.jpg'),
  'Facials_Spa2.jpg': require('../assets/Facials_Spa2.jpg'),
  'Facials_Spa3.jpg': require('../assets/Facials_Spa3.jpg'),
  'Facials_Spa4.jpg': require('../assets/Facials_Spa4.jpg'),
};

const TreatmentDetailsScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const imageSource = imageMap[item.image];

  return (
    <View style={styles.container}>
      <View style={styles.imageSection}>
        <Image style={styles.productImage} source={imageSource} />
      </View>

      <ScrollView style={styles.textSection} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.productDetailsRow}>
          <YIcon name="attach-money" size={20} color="#333" />
          <Text style={styles.productPrice}>{item.price}</Text>
          <Icon name="hourglass-outline" size={20} color="#333" />
          <Text style={styles.productPeriod}>{item.period}</Text>
        </View>
        <Text style={styles.productDescription}>{item.description}</Text>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate('makeBooking', { item })}
        >
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#faf9f6', 
  },
  imageSection: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 20,
  },
  productImage: { 
    width: 300, 
    height: 200, 
    borderRadius: 15, 
  },
  textSection: { 
    marginTop: 20, 
    paddingHorizontal: 20, 
  },
  scrollContent: { 
    paddingBottom: 20,
  },
  productName: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 10, 
  },
  productDetailsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
     width: '100%', 
     marginVertical: 10 ,
    },
  productPrice: { 
    fontSize: 18, 
    color: '#65DEF1', 
    fontWeight: '600',
   },
  productPeriod: { 
    fontSize: 18, 
    color: '#A8DCD1', 
    fontWeight: '600', 
  },
  productDescription: { 
    fontSize: 16, 
    color: '#666', 
    textAlign: 'center', 
    marginVertical: 15, 
    lineHeight: 24, 
    alignSelf: 'stretch',
   },
  bookButton: { 
    backgroundColor: '#65DEF1',
     paddingVertical: 15, 
     paddingHorizontal: 30, 
     borderRadius: 25, 
     marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default TreatmentDetailsScreen;
