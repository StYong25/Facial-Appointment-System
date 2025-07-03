import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const UserHomeScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Éclat</Text>
      <Image
        source={require('../assets/Logo.png')}
        style={styles.logo}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'CinzelDecorative-Black',
    fontSize: 80,
    marginVertical: 50,
    color: '#333333',
  },
  logo: {
    height: 300,
    width: 300,
    borderRadius: 50,
    marginBottom: 40,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#333333',
    width: '80%',
    height: 60,
    borderRadius: 100,
    overflow: 'hidden',
  },
  loginButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFB3AB',
  },
  signupButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F0FA',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButtonText: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
