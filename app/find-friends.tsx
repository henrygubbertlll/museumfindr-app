import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  Share,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MagnifyingGlass, PaperPlaneTilt, CaretRight } from 'phosphor-react-native';
import { Colors, Fonts, Spacing, useTheme } from '../src/theme';
import type { Palette } from '../src/theme';
import { friends } from '../src/data/seed';

const SUGGESTIONS = [
  { id: 's1', name: 'Clara Whitman',   handle: '@claraw',     mutuals: 3, visited: 31, avatar: 'https://i.pravatar.cc/150?u=clara' },
  { id: 's2', name: 'Daniel Cho',      handle: '@dancho',     mutuals: 1, visited: 58, avatar: 'https://i.pravatar.cc/150?u=daniel' },
  { id: 's3', name: 'Priya Anand',     handle: '@priyaart',   mutuals: 5, visited: 12, avatar: 'https://i.pravatar.cc/150?u=priya' },
  { id: 's4', name: 'Marcus Webb',     handle: '@marcuswebb', mutuals: 2, visited: 44, avatar: 'https://i.pravatar.cc/150?u=marcus' },
  { id: 's5', name: 'Yuki Tanaka',     handle: '@yukiT',      mutuals: 4, visited: 27, avatar: 'https://i.pravatar.cc/150?u=yuki' },
  { id: 's6', name: 'Sofia Reyes',     handle: '@sofiareyes', mutuals: 1, visited: 19, avatar: 'https://i.pravatar.cc/150?u=sofia' },
];