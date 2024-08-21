import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feed from './screens/Feed';
import AddPhoto from './screens/AddPhoto';
import Profile from './screens/Profile';
import Login from './screens/Login';
import Register from './screens/Register';


const Stack = createStackNavigator();

const LoginOrProfileRouter = () =>
    <Stack.Navigator initialRouteName='Perfil'>
        <Stack.Screen name='Perfil' component={Profile} options={{headerShown: false}} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Registro' component={Register} />
    </Stack.Navigator>

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
          headerShown: false,
          //tabBarActiveTintColor: '#e91e63',
          tabBarShowLabel:false
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddPhoto"
        component={AddPhoto}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <Icon name="camera" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={LoginOrProfileRouter}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

/*
export default function MyStacks() {
  return(
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Feed">
              <Stack.Screen  name="Home" component={MyTabs} options={{headerShown: false}} />
              <Stack.Screen name="Auth" component={Login} options={{headerShown: false}} />
          </Stack.Navigator>
      </NavigationContainer>
  )        
}*/
