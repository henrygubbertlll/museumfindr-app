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

function Divider({ label }: { label: string }) {
  const { palette } = useTheme();
  const styles = makeDivStyles(palette);
  return (
    <View style={styles.row}>
      <View style={styles.line} />
      <Text style={styles.label}>{label}</Text>
      <View style={styles.line} />
    </View>
  );
}
const makeDivStyles = (p: Palette) => StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: Spacing.screenH,
    marginBottom: 10,
    marginTop: 6,
  },
  line: { flex: 1, height: 1, backgroundColor: p.border },
  label: {
    fontFamily: Fonts.displayItalic,
    fontSize: 13,
    color: p.textPrimary,
    flexShrink: 1,
  },
});

function WishlistRow({ museum, onPress }: { museum: Museum; onPress: () => void }) {
  const { palette } = useTheme();
  const styles = makeWlStyles(palette);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.row}>
      <Image source={{ uri: museum.thumbnail }} style={styles.thumb} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{museum.name}</Text>
        <Text style={styles.sub}>{museum.category} · {museum.distanceMi} mi</Text>
      </View>
      <BookmarkSimple size={18} weight="fill" color={palette.accent} />
    </TouchableOpacity>
  );
}
const makeWlStyles = (p: Palette) => StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: Spacing.screenH,
    marginBottom: 8,
    backgroundColor: p.surface,
    borderRadius: 12,
    padding: 12,
    ...Shadows.card,
  },
  thumb: {
    width: 46,
    height: 46,
    borderRadius: 9,
    backgroundColor: p.surfaceSecondary,
    flexShrink: 0,
  },
  info: { flex: 1 },
  name: {
    fontFamily: Fonts.display,
    fontSize: 15,
    color: p.textPrimary,
    lineHeight: 18,
  },
  sub: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: p.textSecondary,
    marginTop: 3,
  },
});

export default function SavedScreen() {
  const router = useRouter();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [wishlist, setWishlist] = useState<Museum[]>([]);
  const { palette } = useTheme();
  const styles = makeStyles(palette);

  useEffect(() => {
    getLogbook(currentUser.id).then(setVisits);
    getWishlist(currentUser.id).then(setWishlist);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Eyebrow mono color={palette.textSecondary}>Saved</Eyebrow>
            <Text style={styles.title}>Your Logbook</Text>
          </View>
          <TouchableOpacity style={styles.filterBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Funnel size={15} weight="thin" color={palette.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Stats strip */}
        <StatStrip
          stats={[
            { value: currentUser.stats.visited, label: 'Visited' },
            { value: currentUser.stats.wishlist, label: 'Wishlist' },
            { value: currentUser.stats.cities, label: 'Cities' },
          ]}
          style={styles.stats}
        />

        {/* Recently visited */}
        {visits.length > 0 && (
          <View>
            <Divider label="Recently visited" />
            {visits.map((visit) => {
              const museum = museumsById[visit.museumId];
              if (!museum) return null;
              return (
                <VisitedCard
                  key={visit.id}
                  museum={museum}
                  visit={visit}
                  onPress={() => router.push(`/museum/${museum.id}` as any)}
                  style={styles.visitCard}
                />
              );
            })}
          </View>
        )}

        {/* Wishlist */}
        {wishlist.length > 0 && (
          <View style={styles.wishlistSection}>
            <Divider label="Wishlist" />
            {wishlist.map((museum) => (
              <WishlistRow
                key={museum.id}
                museum={museum}
                onPress={() => router.push(`/museum/${museum.id}` as any)}
              />
            ))}
          </View>
        )}

        {/* Empty state */}
        {visits.length === 0 && wishlist.length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <BookmarkSimple size={40} weight="thin" color={palette.accent} />
            </View>
            <Text style={styles.emptyTitle}>Start your collection</Text>
            <Text style={styles.emptySub}>
              Every museum you visit will live here. Log your first to begin the logbook.
            </Text>
            <TouchableOpacity
              style={styles.emptyBtn}
              onPress={() => router.push('/' as any)}
              activeOpacity={0.85}
            >
              <Text style={styles.emptyBtnText}>Find museums nearby</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (p: Palette) => StyleSheet.create({
  safe: { flex: 1, backgroundColor: p.background },
  scroll: { flex: 1 },
  content: { paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenH,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  title: { ...TextStyles.screenTitle, color: p.textPrimary, marginTop: 6 },
  filterBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: p.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stats: {
    marginHorizontal: Spacing.screenH,
    marginTop: 12,
    marginBottom: 8,
    backgroundColor: p.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: p.border,
    ...Shadows.card,
  },
  visitCard: {
    marginHorizontal: Spacing.screenH,
    marginBottom: Spacing.sm,
  },
  wishlistSection: { marginTop: 4 },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xxxl,
    paddingTop: 60,
    gap: 10,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: p.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  emptyTitle: {
    fontFamily: Fonts.display,
    fontSize: 22,
    color: p.textPrimary,
    textAlign: 'center',
  },
  emptySub: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: p.textSecondary,
    textAlign: 'center',
    lineHeight: 19,
  },
  emptyBtn: {
    backgroundColor: p.accent,
    borderRadius: Radii.button,
    paddingHorizontal: 22,
    paddingVertical: 13,
    marginTop: 8,
  },
  emptyBtnText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 13,
    color: '#fff',
  },
});
