import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Picker } from '@react-native-picker/picker';
import { createUserTable, insertUserData } from '../database';

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [secureEntry, setSecureEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [userName, setUserName] = useState('');

  const SignUp = async () => {
    if (!userName || !email || !password) {
      Alert.alert('Missing Fields', 'Please fill in all the fields.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long.');
      return;
    } else if (!passwordRegex.test(password)) {
      Alert.alert('Weak Password', 'Password must include letters, numbers, and special characters.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  // Store user data locally
      await createUserTable();
      await insertUserData(userName, email, gender, password);

  // Sign out the user immediately after signup
      await auth.signOut();

      Alert.alert('Success', 'Account created successfully. Please log in.');
      navigation.navigate('Login'); // Navigate only after user is signed out

  // Clear input fields
      setEmail('');
      setPassword('');
      setUserName('');
      setGender('');
      
    } catch (err) {
      console.log(err);
      let errorMessage = '';

      switch (err.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already associated with an existing account.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'The email address is invalid.';
          break;
        case 'auth/weak-password':
          errorMessage = 'The password is too weak.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error, please try again.';
          break;
        default:
          errorMessage = err.message || 'Something went wrong. Please try again later.';
          break;
      }

      Alert.alert('Sign Up Error', errorMessage);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Let's get started</Text>

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

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={24} color="#777777" />
        <TextInput
          style={styles.input}
          placeholder="Enter your user name"
          value={userName}
          onChangeText={setUserName}
          placeholderTextColor="#777777"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="male-female-outline" size={24} color="#777777" />
        <Picker
          selectedValue={gender}
          style={{ flex: 1 }}
          onValueChange={(value) => setGender(value)}
        >
          <Picker.Item label="Select your gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={SignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.loginRedirect}>
        <Text style={styles.normalText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

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
  signupButton: {
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
  loginRedirect: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  normalText: {
    color: '#333333',
  },
  linkText: {
    color: '#A7C7E7',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

