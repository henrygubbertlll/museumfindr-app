import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  MagnifyingGlass,
  SlidersHorizontal,
  BuildingColumns,
  MapPin,
  Check,
  Crosshair,
  BookmarkSimple,
  CheckCircle,
  NavigationArrow,
  Star,
} from 'phosphor-react-native';
import { Colors, Fonts, Spacing, useTheme } from '../../src/theme';
import { museums } from '../../src/data/seed';

const { width: W } = Dimensions.get('window');

type ChipLabel = 'All' | 'Art' | 'History' | 'Free' | 'Open';
const CHIPS: ChipLabel[] = ['All', 'Art', 'History', 'Free', 'Open'];

const PIOS = [
  { id: 'm3', left: '52%' as const, top: '36%' as const, kind: 'selected' as const },
  { id: 'm1', left: '30%' as const, top: '25%' as const, kind: 'unvisited' as const },
  { id: 'm4', left: '68%' as const, top: '48%' as const, kind: 'unvisited' as const },
  { id: 'm2', left: '74%' as const, top: '28%' as const, kind: 'visited' as const },
];