import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'phosphor-react-native';
import { Fonts, Spacing, TextStyles, useTheme } from '../src/theme';
import type { Palette } from '../src/theme';
import { collections } from '../src/data/seed';
import { Eyebrow } from '../src/components';