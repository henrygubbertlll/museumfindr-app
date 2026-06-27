import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { TextStyles, useTheme } from '../theme';

interface Props {
  children: React.ReactNode;
  mono?: boolean;
  color?: string;
  style?: TextStyle;
}

export default function Eyebrow({ children, mono = false, color, style }: Props) {
  const { palette } = useTheme();
  const resolvedColor = color ?? palette.textSecondary;

  return (
    <Text style={[mono ? styles.mono : styles.sans, { color: resolvedColor }, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  sans: { ...TextStyles.eyebrow },
  mono: { ...TextStyles.monoEyebrow },
});
