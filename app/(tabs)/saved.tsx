import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Funnel, BookmarkSimple } from 'phosphor-react-native';
import { Fonts, Radii, Shadows, Spacing, TextStyles, useTheme } from '../../src/theme';
import type { Palette } from '../../src/theme';
import { getLogbook, getWishlist } from '../../src/data/repository';
import type { Museum, Visit } from '../../src/data/types';
import { museumsById, currentUser } from '../../src/data/seed';
import { StatStrip, VisitedCard, Eyebrow } from '../../src/components';