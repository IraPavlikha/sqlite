import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { insertUser } from './database';

export default function CreateUserScreen({ navigation }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.email) {
      Alert.alert('Error', 'First name and email are required');
      return;
    }

    try {
      await insertUser(formData);
      Alert.alert('Success', 'User created successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to create user. Email might already exist.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={formData.firstName}
        onChangeText={(text) => handleInputChange('firstName', text)}
        placeholder="First Name"
        required
      />
      <TextInput
        style={styles.input}
        value={formData.lastName}
        onChangeText={(text) => handleInputChange('lastName', text)}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        value={formData.phone}
        onChangeText={(text) => handleInputChange('phone', text)}
        placeholder="Phone"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        value={formData.email}
        onChangeText={(text) => handleInputChange('email', text)}
        placeholder="Email"
        keyboardType="email-address"
        required
      />
      <Button title="Create User" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});