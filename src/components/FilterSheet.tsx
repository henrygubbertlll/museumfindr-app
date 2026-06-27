import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Clock } from 'phosphor-react-native';
import { Fonts, Spacing, useTheme } from '../theme';
import type { Palette } from '../theme';

const { width: W } = Dimensions.get('window');
const TRACK_W = W - Spacing.screenH * 2 - 32;

const CATEGORIES = ['Art', 'History', 'Modern', 'Science', 'Photography', 'Design'];
const ADMISSION_OPTIONS = ['Any', 'Free', 'Under $20'];
const DISTANCE_OPTIONS = [5, 10, 15, 25, 50];

interface FilterSheetProps {
  visible: boolean;
  onClose: () => void;
}

export function FilterSheet({ visible, onClose }: FilterSheetProps) {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [distanceIdx, setDistanceIdx] = useState(1);
  const [admission, setAdmission] = useState('Any');
  const [openNow, setOpenNow] = useState(false);
  const { palette } = useTheme();
  const styles = makeStyles(palette);

  function toggleCategory(cat: string) {
    setActiveCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  function reset() {
    setActiveCategories([]);
    setDistanceIdx(1);
    setAdmission('Any');
    setOpenNow(false);
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.sheet}>
        {/* Drag handle */}
        <View style={styles.handleWrap}>
          <View style={styles.handle} />
        </View>

        {/* Header */}
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>Filters</Text>
          <TouchableOpacity onPress={reset} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

          {/* Category */}
          <Text style={styles.sectionLabel}>Category</Text>
          <View style={styles.pillWrap}>
            {CATEGORIES.map((cat) => {
              const active = activeCategories.includes(cat);
              return (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryPill, active && styles.categoryPillActive]}
                  onPress={() => toggleCategory(cat)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.categoryPillText, active && styles.categoryPillTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Distance */}
          <Text style={styles.sectionLabel}>Distance</Text>
          <Text style={styles.distanceValue}>Within {DISTANCE_OPTIONS[distanceIdx]} mi</Text>
          <View style={styles.sliderWrap}>
            <View style={styles.sliderTrack} />
            <View style={[styles.sliderFill, { width: (TRACK_W / (DISTANCE_OPTIONS.length - 1)) * distanceIdx }]} />
            {DISTANCE_OPTIONS.map((_, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.sliderThumb, i === distanceIdx && styles.sliderThumbActive, {
                  left: (TRACK_W / (DISTANCE_OPTIONS.length - 1)) * i - 10,
                }]}
                onPress={() => setDistanceIdx(i)}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              />
            ))}
          </View>
          <View style={styles.sliderLabels}>
            {DISTANCE_OPTIONS.map((d, i) => (
              <Text key={i} style={[styles.sliderLabel, i === distanceIdx && styles.sliderLabelActive]}>
                {d}
              </Text>
            ))}
          </View>

          {/* Admission */}
          <Text style={styles.sectionLabel}>Admission</Text>
          <View style={styles.segments}>
            {ADMISSION_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[styles.segment, admission === opt && styles.segmentActive]}
                onPress={() => setAdmission(opt)}
                activeOpacity={0.8}
              >
                <Text style={[styles.segmentText, admission === opt && styles.segmentTextActive]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Open now */}
          <View style={styles.openRow}>
            <Clock size={18} weight="thin" color={palette.accent} />
            <Text style={styles.openLabel}>Open now</Text>
            <TouchableOpacity
              style={[styles.toggleTrack, openNow && styles.toggleTrackOn]}
              onPress={() => setOpenNow((v) => !v)}
              activeOpacity={0.9}
            >
              <View style={[styles.toggleThumb, openNow && styles.toggleThumbOn]} />
            </TouchableOpacity>
          </View>

          {/* Apply */}
          <TouchableOpacity style={styles.applyBtn} onPress={onClose} activeOpacity={0.88}>
            <Text style={styles.applyText}>Show 32 museums</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}

const makeStyles = (p: Palette) => StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(33,28,23,0.45)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: p.background,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingBottom: 34,
  },
  handleWrap: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 6,
  },
  handle: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: p.handle,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenH,
    paddingBottom: 14,
    paddingTop: 4,
  },
  sheetTitle: {
    fontFamily: Fonts.display,
    fontSize: 22,
    color: p.textPrimary,
  },
  resetText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    color: p.accent,
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenH,
    paddingBottom: 24,
  },
  sectionLabel: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase' as const,
    color: p.textMuted,
    marginBottom: 10,
    marginTop: 18,
  },
  pillWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: p.border,
    backgroundColor: 'transparent',
  },
  categoryPillActive: {
    backgroundColor: p.accent,
    borderColor: p.accent,
  },
  categoryPillText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    color: p.textPrimary,
  },
  categoryPillTextActive: {
    color: '#fff',
  },
  distanceValue: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: p.textPrimary,
    marginBottom: 16,
  },
  sliderWrap: {
    height: 20,
    justifyContent: 'center',
    marginBottom: 6,
    position: 'relative',
  },
  sliderTrack: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 3,
    borderRadius: 2,
    backgroundColor: p.sliderTrack,
  },
  sliderFill: {
    position: 'absolute',
    left: 0,
    height: 3,
    borderRadius: 2,
    backgroundColor: p.sliderFill,
  },
  sliderThumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: p.surface,
    borderWidth: 1.5,
    borderColor: p.border,
    top: 0,
  },
  sliderThumbActive: {
    borderColor: p.accent,
    borderWidth: 2,
    shadowColor: p.accent,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontFamily: Fonts.body,
    fontSize: 10,
    color: p.textMuted,
  },
  sliderLabelActive: {
    color: p.accent,
    fontFamily: Fonts.bodyMedium,
  },
  segments: {
    flexDirection: 'row',
    backgroundColor: p.segmentBg,
    borderRadius: 9,
    padding: 3,
    gap: 2,
  },
  segment: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 7,
    alignItems: 'center',
  },
  segmentActive: {
    backgroundColor: p.accent,
  },
  segmentText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    color: p.textSecondary,
  },
  segmentTextActive: {
    color: '#fff',
  },
  openRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 18,
    marginBottom: 4,
  },
  openLabel: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 14,
    color: p.textPrimary,
  },
  toggleTrack: {
    width: 44,
    height: 26,
    borderRadius: 13,
    backgroundColor: p.toggleOff,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleTrackOn: {
    backgroundColor: p.accent,
  },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  toggleThumbOn: {
    alignSelf: 'flex-end',
  },
  applyBtn: {
    backgroundColor: p.accent,
    borderRadius: 13,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  applyText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 15,
    color: '#fff',
    letterSpacing: 0.3,
  },
});
