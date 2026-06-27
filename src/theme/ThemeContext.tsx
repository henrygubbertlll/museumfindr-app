import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from './index';

// ─── Semantic palette ──────────────────────────────────────────────────────────
export interface Palette {
  // Backgrounds
  background: string;      // screen canvas
  surface: string;         // elevated cards
  surfaceSecondary: string; // chip backgrounds, unselected surfaces
  // Text
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textBodyMuted: string;
  // Accents (unchanged across modes)
  accent: string;          // primary brand color (oxblood / darkClay)
  accentText: string;      // text ON oxblood bg (always cream)
  gilt: string;            // stars — always gilt
  openGreen: string;       // "Open now" — unchanged
  // Borders & dividers
  border: string;
  borderStrong: string;
  // Tab bar
  tabBarBg: string;
  // Sheet handle
  handle: string;
  // Toggle
  toggleOff: string;
  // Input / meta boxes
  inputBg: string;
  inputBorder: string;
  // Slider
  sliderTrack: string;
  sliderFill: string;      // = accent
  // Segment control
  segmentBg: string;
  // Divider line
  dividerLine: string;
}

const lightPalette: Palette = {
  background: Colors.cream,
  surface: Colors.card,
  surfaceSecondary: Colors.sand,
  textPrimary: Colors.ink,
  textSecondary: Colors.stone,
  textMuted: Colors.muted,
  textBodyMuted: Colors.bodyMuted,
  accent: Colors.oxblood,
  accentText: Colors.cream,
  gilt: Colors.gilt,
  openGreen: Colors.openGreen,
  border: Colors.border,
  borderStrong: Colors.borderStrong,
  tabBarBg: Colors.card,
  handle: Colors.muted,
  toggleOff: '#D8CDBC',
  inputBg: Colors.card,
  inputBorder: '#E0D8CA',
  sliderTrack: '#E7DFD3',
  sliderFill: Colors.oxblood,
  segmentBg: '#EDE5D8',
  dividerLine: '#E7DFD3',
};

const darkPalette: Palette = {
  background: Colors.darkCanvas,
  surface: Colors.darkCard,
  surfaceSecondary: '#2D2621',
  textPrimary: Colors.darkText,
  textSecondary: Colors.darkTextSecondary,
  textMuted: '#5C5650',
  textBodyMuted: Colors.darkTextSecondary,
  accent: Colors.darkClay,
  accentText: Colors.darkText,
  gilt: Colors.gilt,
  openGreen: Colors.openGreen,
  border: '#3A342D',
  borderStrong: '#4A4339',
  tabBarBg: Colors.darkCard,
  handle: '#4A4339',
  toggleOff: '#4A4339',
  inputBg: '#2D2621',
  inputBorder: '#3A342D',
  sliderTrack: '#3A342D',
  sliderFill: Colors.darkClay,
  segmentBg: '#2D2621',
  dividerLine: '#3A342D',
};

// ─── Context ───────────────────────────────────────────────────────────────────
interface ThemeContextValue {
  palette: Palette;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  palette: lightPalette,
  isDark: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const palette = isDark ? darkPalette : lightPalette;

  return (
    <ThemeContext.Provider value={{ palette, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
