import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
  Compass,
  MapTrifold,
  BookmarkSimple,
  Users,
  UserCircle,
} from 'phosphor-react-native';
import { Fonts, TAB_BAR_HEIGHT, useTheme } from '../theme';
import type { Palette } from '../theme';

const TABS = [
  { key: 'index',   label: 'Discover', Icon: Compass },
  { key: 'map',     label: 'Map',      Icon: MapTrifold },
  { key: 'saved',   label: 'Saved',    Icon: BookmarkSimple },
  { key: 'feed',    label: 'Friends',  Icon: Users },
  { key: 'profile', label: 'You',      Icon: UserCircle },
] as const;

export default function TabBar({ state, navigation }: BottomTabBarProps) {
  const { palette } = useTheme();
  const styles = makeStyles(palette);

  return (
    <View style={styles.bar}>
      {state.routes.map((route, index) => {
        const tab = TABS[index];
        if (!tab) return null;
        const isActive = state.index === index;
        const { Icon } = tab;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isActive && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <Icon
              size={24}
              weight={isActive ? 'fill' : 'thin'}
              color={isActive ? palette.accent : palette.textMuted}
            />
            <Text style={[styles.label, isActive ? styles.labelActive : styles.labelInactive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const makeStyles = (p: Palette) => StyleSheet.create({
  bar: {
    flexDirection: 'row',
    height: TAB_BAR_HEIGHT + (Platform.OS === 'ios' ? 20 : 0),
    backgroundColor: p.tabBarBg,
    borderTopWidth: 1,
    borderTopColor: p.border,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingTop: 8,
  },
  label: {
    fontSize: 10,
    fontFamily: Fonts.bodyMedium,
    letterSpacing: 0.2,
  },
  labelActive: { color: p.accent },
  labelInactive: { color: p.textMuted },
});
