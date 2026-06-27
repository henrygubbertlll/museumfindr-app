import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Fonts, Spacing, useTheme } from '../theme';
import type { Palette } from '../theme';

interface Props {
  title: string;
  onSeeAll?: () => void;
  style?: ViewStyle;
}

export default function SectionHeader({ title, onSeeAll, style }: Props) {
  const { palette } = useTheme();
  const styles = makeStyles(palette);

  return (
    <View style={[styles.row, style]}>
      <Text style={styles.title}>{title}</Text>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const makeStyles = (p: Palette) => StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  title: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 14,
    color: p.textPrimary,
    letterSpacing: 0,
  },
  seeAll: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 13,
    color: p.accent,
  },
});
