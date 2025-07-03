import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const AboutUsScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Image source={require("../assets/Logo.png")} style={styles.image} />

      <Text style={styles.title}>About Us</Text>

      <Text style={styles.description}>
        Welcome to Éclat! We are dedicated to providing the best services and products to our customers. 
        Our mission is to innovate and deliver high-quality solutions that meet the needs of our clients. 
        With a team of passionate professionals, we strive to exceed expectations and create a positive impact in the industry.
      </Text>

      <Text style={styles.description}>
        Founded in 2019, Éclat has grown to become a trusted name in the beauty industry. 
        We believe in integrity, excellence, and customer satisfaction as the core values of our organization.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5FCFF",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75,
    marginTop: 60, 
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    color: "black",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
    color: "gray",
    lineHeight: 22,
  },
});

export default AboutUsScreen;
