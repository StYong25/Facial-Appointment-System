import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  const CardButton = ({ title, screen }: { title: string; screen: string }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(screen)}
    >
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <Image
        source={require("../assets/Logo.png")} 
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome to Éclat</Text>

      <CardButton title="About Us" screen="AboutUs" />
      <CardButton title="Meet Our Team" screen="MeetTeam" />
      <CardButton title="Location and Contact" screen="Location" />
      <CardButton title="FAQ" screen="FAQ" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
    shadowColor: '#333333',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333333',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#333333',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333333',
  },
});

export default HomeScreen;
