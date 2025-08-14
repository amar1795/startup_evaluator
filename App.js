import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';

import SubmitScreen from './screens/SubmitScreen';
import IdeasScreen from './screens/IdeasScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Submit" component={SubmitScreen} />
          <Tab.Screen name="Ideas" component={IdeasScreen} />
          <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
