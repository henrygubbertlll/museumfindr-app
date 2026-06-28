import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, BookmarkSimple } from 'phosphor-react-native';
import { Colors, Fonts, Radii, Shadows, Spacing, useTheme } from '../../src/theme';
import type { Palette } from '../../src/theme';
import { guides, museumsById, currentUser } from '../../src/data/seed';
import { useStore } from '../../src/store';
import { Button } from '../../src/components';

const HERO_H = 230;

export default function GuideScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const { palette } = useTheme();
  const styles = makeStyles(palette);

  const guide = guides.find((g) => g.id === id) ?? guides[0];
  const stopMuseums = guide.stops.map((s) => museumsById[s.museumId]).filter(Boolean);