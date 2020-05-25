import React from 'react';
import {
  TouchableOpacity, StyleSheet, View, Text,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddButton from '../add-button';
import withInsets, { withInsetsProps } from '../with-insets';


const styles = StyleSheet.create({
  tabButton: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export type TabBarProps = BottomTabBarProps & withInsetsProps;

const TabBar = ({
  state, descriptors, navigation, insets,
} : TabBarProps) => {
  const onAdd = () => {
    navigation.navigate('Modal');
  };

  return (
    <>
      {(state.index === 0) && (
        <AddButton onAdd={onAdd} bottomInset={insets.bottom} />
      )}
      <SafeAreaView style={{ backgroundColor: 'white' }}>
        <View style={{ height: 55, flexDirection: 'row' }}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            let label;
            if (options.tabBarLabel === undefined) {
              if (options.title === undefined) {
                label = route.name;
              } else { label = options.title; }
            } else { label = options.tabBarLabel; }
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : { selected: false }}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabButton}
                key={route.key}
              >
                <Text style={{ color: isFocused ? 'navy' : 'grey' }}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </>

  );
};

export default withInsets(TabBar);
