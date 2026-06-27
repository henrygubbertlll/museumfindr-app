import React, { useEffect, useRef } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
  ViewStyle,
} from 'react-native';
import { Radii, useTheme } from '../theme';
import type { Palette } from '../theme';

const { height: SCREEN_H } = Dimensions.get('window');

interface Props {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Fixed height from bottom; omit for content-height sheet */
  snapHeight?: number;
  style?: ViewStyle;
}

export default function BottomSheet({ visible, onClose, children, snapHeight, style }: Props) {
  const translateY = useRef(new Animated.Value(SCREEN_H)).current;
  const { palette } = useTheme();
  const styles = makeStyles(palette);

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        damping: 22,
        stiffness: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: SCREEN_H,
        duration: 220,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Scrim */}
      <TouchableOpacity style={styles.scrim} activeOpacity={1} onPress={onClose} />

      {/* Sheet */}
      <Animated.View
        style={[
          styles.sheet,
          snapHeight ? { height: snapHeight } : styles.contentHeight,
          { transform: [{ translateY }] },
          style,
        ]}
      >
        {/* Drag handle */}
        <View style={styles.handle} />

        {snapHeight ? (
          <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
        ) : (
          children
        )}
      </Animated.View>
    </Modal>
  );
}

const makeStyles = (p: Palette) => StyleSheet.create({
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(33,28,23,0.4)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: p.surface,
    borderTopLeftRadius: Radii.bottomSheet,
    borderTopRightRadius: Radii.bottomSheet,
    paddingBottom: 34,
  },
  contentHeight: {
    maxHeight: SCREEN_H * 0.9,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: p.handle,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 6,
  },
});
