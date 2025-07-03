import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogInScreen = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async () => {
  // Validate email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    Alert.alert('Invalid Email', 'Please enter a valid email address.');
    return;
  }

  // Validate password (ensure it's not empty)
  if (!password) {
    Alert.alert('Password Required', 'Please enter your password.');
    return;
  }

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res);

    // Store the user session or token using AsyncStorage
    const idToken = await res.user.getIdToken();
    await AsyncStorage.setItem('userToken', idToken);

    // Navigate to Profile screen
    Alert.alert('Logged In Successfully');
    navigation.navigate('Profile');
  } catch (err) {
    console.log(err.message);
    let errorMessage = "";

    // Handle Firebase authentication errors
    switch (err.code) {
      case 'auth/invalid-email':
        errorMessage = "The email address is invalid. Please check and try again.";
        break;
      case 'auth/user-not-found':
        errorMessage = "No account found with this email. Please sign up or check the email address.";
        break;
      case 'auth/wrong-password':
        errorMessage = "Incorrect password. Please try again or reset your password.";
        break;
      default:
        errorMessage = "Something went wrong. Please try again later.";
        break;
    }

    // Show error alert with the specific message
    Alert.alert('Login Error', errorMessage);
  }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hey, Welcome Back!</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={24} color="#777777" />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#777777"
          keyboardType="email-address"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="#777777" />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#777777"
          secureTextEntry={secureEntry}
        />
        <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
          <Ionicons
            name={secureEntry ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#777777"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.normalText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FAF9F6',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F0FA',
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
  forgotText: {
    textAlign: 'right',
    color: '#A7C7E7',
    fontWeight: '600',
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: '#FFB3AB',
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
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  normalText: {
    color: '#333333',
  },
  signupText: {
    color: '#A7C7E7',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
