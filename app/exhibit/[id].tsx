import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  ShareNetwork,
  CalendarBlank,
  Ticket,
  MapPinLine,
  CaretRight,
  BookmarkSimple,
} from 'phosphor-react-native';
import { Colors, Fonts, Spacing, useTheme } from '../../src/theme';
import type { Palette } from '../../src/theme';
import { museums } from '../../src/data/seed';

const HERO_H = 248;

const exhibitMap: Record<string, { exhibit: (typeof museums)[0]['exhibits'][0]; museum: (typeof museums)[0] }> = {};
museums.forEach((m) => {
  m.exhibits.forEach((e) => {
    exhibitMap[e.id] = { exhibit: e, museum: m };
  });
});

function galleryImages(imageUrl: string) {
  return [imageUrl, imageUrl + '?v=2', imageUrl + '?v=3'];
}

export default function ExhibitScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { palette } = useTheme();
  const styles = makeStyles(palette);

  const entry = exhibitMap[id as string] ?? Object.values(exhibitMap)[0];
  const { exhibit, museum } = entry;

  const gallery = galleryImages(exhibit.image);
  const GALLERY_EXTRA = 24;
  const isPermanent = exhibit.dates === 'Permanent';

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Hero */}
        <View style={styles.hero}>