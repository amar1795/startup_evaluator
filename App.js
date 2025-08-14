import React, { useState, useMemo } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import SubmitScreen from './screens/SubmitScreen';
import IdeasScreen from './screens/IdeasScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import { Send, Lightbulb, Trophy } from 'lucide-react-native';

const Tab = createBottomTabNavigator();
import ThemeContext from './utils/ThemeContext';

export default function App() {
  const [isDark, setIsDark] = useState(false);

  const themeContextValue = useMemo(
    () => ({
      isDark,
      toggleTheme: () => setIsDark((prev) => !prev),
    }),
    [isDark]
  );

  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeContext.Provider value={themeContextValue}>
        <PaperProvider>
          <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerStyle: { backgroundColor: isDark ? '#121212' : '#ffffff' },
                headerTintColor: isDark ? '#fff' : '#000',
                tabBarStyle: { backgroundColor: isDark ? '#121212' : '#ffffff' },
                tabBarActiveTintColor: '#5a3e7bff',
                tabBarIcon: ({ color, size }) => {
                  if (route.name === 'Submit') {
                    return <Send color={color} size={size} />;
                  } else if (route.name === 'Ideas') {
                    return <Lightbulb color={color} size={size} />;
                  } else if (route.name === 'Leaderboard') {
                    return <Trophy color={color} size={size} />;
                  }
                  return null;
                },
              })}
            >
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
