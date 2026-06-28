import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Share,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Trophy, ShareNetwork, X, Medal, Star, Compass } from 'phosphor-react-native';
import { Colors, Fonts } from '../src/theme';