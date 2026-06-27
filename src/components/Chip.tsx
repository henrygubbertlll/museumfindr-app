import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Fonts, Radii, Spacing, useTheme } from '../theme';
import type { Palette } from '../theme';

type Variant = 'category' | 'pill';

interface Props {
  label: string;
  active?: boolean;
  onPress?: () => void;
  variant?: Variant;
  style?: ViewStyle;
}

export default function Chip({ label, active = false, onPress, variant = 'category', style }: Props) {
  const { palette } = useTheme();
  const styles = makeStyles(palette);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.base,
        variant === 'category' ? styles.category : styles.pill,
        active && styles.active,
        style,
      ]}
    >
      <Text style={[styles.label, active ? styles.labelActive : styles.labelInactive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const makeStyles = (p: Palette) => StyleSheet.create({
  base: {
    height: 34,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  category: {
    borderRadius: Radii.chip,
    backgroundColor: p.surfaceSecondary,
  },
  pill: {
    borderRadius: Radii.pill,
    backgroundColor: p.surfaceSecondary,
  },
  active: {
    backgroundColor: p.accent,
  },
  label: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
  },
  labelInactive: { color: p.textPrimary },
  labelActive: { color: p.accentText },
});
