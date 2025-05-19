import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserListScreen from './UserListScreen';
import UserDetailsScreen from './UserDetailsScreen';
import CreateUserScreen from './CreateUserScreen';
import { createTable } from './database';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    createTable();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserList">
        <Stack.Screen
          name="UserList"
          component={UserListScreen}
          options={{ title: 'Users List' }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetailsScreen}
          options={{ title: 'User Details' }}
        />
        <Stack.Screen
          name="CreateUser"
          component={CreateUserScreen}
          options={{ title: 'Create User' }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}