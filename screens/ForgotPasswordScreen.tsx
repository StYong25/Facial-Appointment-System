import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth } from '../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert('Please enter a valid email address');
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert('Password reset email sent');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={28} color="#777777" />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#777777"
          keyboardType="email-address"
        />
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
        <Text style={styles.backButtonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FAF9F6', // Baby powder
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333', // Jet
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F0FA', // Magnolia
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    color: '#333333',
  },
  resetButton: {
    backgroundColor: '#FFB3AB', // Melon
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#A7C7E7', // Powder blue
    fontSize: 16,
    fontWeight: '600',
  },
});
