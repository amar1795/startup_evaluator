import React, { useState, useMemo } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import SubmitScreen from './screens/SubmitScreen';
import IdeasScreen from './screens/IdeasScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';

const Tab = createBottomTabNavigator();

export const ThemeContext = React.createContext();

export default function App() {
  const [isDark, setIsDark] = useState(false);

  const themeContextValue = useMemo(
    () => ({
      isDark,
      toggleTheme: () => setIsDark((prev) => !prev),
    }),
    [isDark]
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <PaperProvider>
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
          <Tab.Navigator>
            <Tab.Screen name="Submit" component={SubmitScreen} />
            <Tab.Screen name="Ideas" component={IdeasScreen} />
            <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
          </Tab.Navigator>
        </NavigationContainer>
        <Toast />
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

Toast.setRef = (ref) => Toast.ref = ref;
