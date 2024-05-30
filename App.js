import React from 'react';
import { useContext } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AddPlace from "./screens/AddPlace";
import AllPlaces from "./screens/AllPlaces";
import Map from "./screens/Map";
import PlaceDetails from "./screens/PlaceDetails";
import HowMany from "./screens/HowMany";
import HowTo from "./screens/HowTo";
import MyPlaces from "./screens/MyPlaces";
import IconButton from "./components/ui/IconButton";
import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import FavoritePlaces from "./screens/FavoritePlaces";
import PlacesNumberContextProvider from "./store/numberPlaces-context";
import UserContextProvider from "./store/user-context";
import Forum from "./screens/Forum";
import PlaceIdContextProvider from "./store/place-id-context";
import AllPlacesContextProvider from "./store/allPlaces-context";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function StackScreens() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: Colors.primary100 },
        headerShown: false,
        headerStyle: { backgroundColor: Colors.primary500 },
      }}
    >
      <Stack.Screen name="HowMany" component={HowMany} />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          title: "Map",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="PlaceDetails"
        component={PlaceDetails}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen name="HowTo" component={HowTo} />
      <Stack.Screen name="Forum" component={Forum} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        tabBarStyle: { backgroundColor: Colors.primary500 },
        tabBarInactiveTintColor: Colors.primary100,
        tabBarActiveTintColor: Colors.primary300,
        headerRight: () => (
          <IconButton
            icon="exit"
            color={Colors.primary300}
            size={24}
            onPress={authCtx.logout}
          />
        ),
      }}
    >
      <BottomTab.Screen
        name="BNBGram"
        component={StackScreens}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="AllPlaces"
        component={AllPlaces}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="AddPlace"
        component={AddPlace}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={FavoritePlaces}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="MyPlaces"
        component={MyPlaces}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView>
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <AllPlacesContextProvider>
          <PlaceIdContextProvider>
            <PlacesNumberContextProvider>
              <UserContextProvider>
                <Navigation />
              </UserContextProvider>
            </PlacesNumberContextProvider>
          </PlaceIdContextProvider>
        </AllPlacesContextProvider>
      </AuthContextProvider>
    </>
    </GestureHandlerRootView>
  );
}
