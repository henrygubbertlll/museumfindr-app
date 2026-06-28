import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  GearSix,
  Trophy,
  Medal,
  Globe,
  Palette,
  LockSimple,
} from 'phosphor-react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Shadows, Spacing, Radii, useTheme } from '../../src/theme';
import type { Palette as ThemePalette } from '../../src/theme';
import { currentUser, visits, museumsById, friends } from '../../src/data/seed';
import { StatStrip } from '../../src/components';