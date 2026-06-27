import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { BookmarkSimple, Star } from 'phosphor-react-native';
import { Colors, Fonts, Radii, Shadows, Spacing, useTheme } from '../theme';
import type { Palette } from '../theme';
import type { Museum } from '../data/types';
import { useIsSaved, useStore } from '../store';

interface Props {
  museum: Museum;
  onPress?: () => void;
  style?: ViewStyle;
}

export default function MuseumListCard({ museum, onPress, style }: Props) {
  const isSaved = useIsSaved(museum.id);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const { palette } = useTheme();
  const styles = makeStyles(palette);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.card, style]}
    >
      {/* Thumbnail */}
      <Image
        source={{ uri: museum.thumbnail }}
        style={styles.thumbnail}
        resizeMode="cover"
      />

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{museum.name}</Text>
        <Text style={styles.meta} numberOfLines={1}>
          {museum.neighborhood} · {museum.distanceMi} mi
          {museum.openNow ? (
            <Text style={styles.open}> · Open</Text>
          ) : null}
        </Text>
      </View>

      {/* Right: star + bookmark */}
      <View style={styles.right}>
        <View style={styles.ratingRow}>
          <Star size={11} weight="fill" color={Colors.gilt} />
          <Text style={styles.rating}>{museum.rating.toFixed(1)}</Text>
        </View>
        <TouchableOpacity
          onPress={() => toggleWishlist(museum.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.bookmark}
        >
          <BookmarkSimple
            size={20}
            weight={isSaved ? 'fill' : 'thin'}
            color={isSaved ? palette.accent : palette.textMuted}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const makeStyles = (p: Palette) => StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: p.surface,
    borderRadius: Radii.card,
    padding: Spacing.md,
    ...Shadows.card,
  },
  thumbnail: {
    width: 54,
    height: 54,
    borderRadius: Radii.thumbnail,
    backgroundColor: p.surfaceSecondary,
  },
  info: {
    flex: 1,
    marginLeft: Spacing.md,
    gap: 4,
  },
  name: {
    fontFamily: Fonts.display,
    fontSize: 16,
    color: p.textPrimary,
    lineHeight: 18,
  },
  meta: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: p.textSecondary,
  },
  open: {
    color: Colors.openGreen,
  },
  right: {
    alignItems: 'flex-end',
    gap: 6,
    marginLeft: Spacing.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  rating: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12,
    color: p.textPrimary,
  },
  bookmark: {},
});
