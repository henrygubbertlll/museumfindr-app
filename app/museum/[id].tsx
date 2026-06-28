import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  BookmarkSimple,
  Clock,
  Ticket,
  MapPin,
  Star,
} from 'phosphor-react-native';
import { Colors, Fonts, Radii, Shadows, Spacing, TextStyles, useTheme } from '../../src/theme';
import type { Palette } from '../../src/theme';
import { getMuseum } from '../../src/data/repository';
import type { Museum } from '../../src/data/types';
import { useIsSaved, useStore } from '../../src/store';
import { Button, StarRating, Eyebrow, LogVisitSheet } from '../../src/components';