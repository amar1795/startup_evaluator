import React, { useState, useMemo } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import SubmitScreen from './screens/SubmitScreen';
import IdeasScreen from './screens/IdeasScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import ThemeContext from './utils/ThemeContext';

const Tab = createBottomTabNavigator();

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
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
  );
}

Toast.setRef = (ref) => Toast.ref = ref;
