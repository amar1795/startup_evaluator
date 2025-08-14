import React, { useContext, useRef, useEffect } from 'react';
import { View, Animated, TouchableWithoutFeedback, Easing } from 'react-native';
import ThemeContext from '../utils/ThemeContext';
import { Sun, Moon } from 'lucide-react-native';

export default function ThemeSwitch() {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const switchAnim = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(switchAnim, {
      toValue: isDark ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.circle),
      useNativeDriver: false,
    }).start();
  }, [isDark]);

  const SWITCH_WIDTH = 48;
  const SWITCH_HEIGHT = 24;
  const KNOB_SIZE = 20;
  const ICON_SIZE = 14;

  return (
    <TouchableWithoutFeedback onPress={toggleTheme}>
      <View style={{ width: SWITCH_WIDTH, height: SWITCH_HEIGHT, borderRadius: SWITCH_HEIGHT/2, backgroundColor: isDark ? '#18122B' : '#f3eafd', flexDirection: 'row', alignItems: 'center', padding: 2, justifyContent: 'space-between', position: 'relative' }}>
        <View style={{ width: KNOB_SIZE, height: KNOB_SIZE, justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
          <Sun color={isDark ? '#a59aca' : '#f5c518'} size={ICON_SIZE} />
        </View>
        <View style={{ width: KNOB_SIZE, height: KNOB_SIZE, justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
          <Moon color={isDark ? '#f5c518' : '#a59aca'} size={ICON_SIZE} />
        </View>
        <Animated.View
          style={{
            position: 'absolute',
            top: 2,
            left: switchAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [2, SWITCH_WIDTH - KNOB_SIZE - 2],
            }),
            width: KNOB_SIZE,
            height: KNOB_SIZE,
            borderRadius: KNOB_SIZE/2,
            backgroundColor: isDark ? '#a59aca' : '#f5c518',
            elevation: 3,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 2,
            shadowOffset: { width: 0, height: 1 },
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
