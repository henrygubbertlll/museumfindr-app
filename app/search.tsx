import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  MagnifyingGlass,
  XCircle,
  ClockCounterClockwise,
  ArrowUpLeft,
  Star,
  GridFour,
} from 'phosphor-react-native';
import { Colors, Fonts, Spacing, useTheme } from '../src/theme';
import type { Palette } from '../src/theme';
import { museums } from '../src/data/seed';
import type { Museum } from '../src/data/types';

const RECENT_SEARCHES = ['Impressionism', 'Natural history', 'Photography'];

function HighlightText({ text, query, style }: { text: string; query: string; style?: object }) {
  if (!query) return <Text style={style}>{text}</Text>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <Text style={style}>{text}</Text>;
  return (
    <Text style={style}>
      {text.slice(0, idx)}
      <Text style={{ backgroundColor: '#FBEFC8' }}>{text.slice(idx, idx + query.length)}</Text>
      {text.slice(idx + query.length)}
    </Text>
  );
}

function SearchResultRow({
  museum,
  query,
  onPress,
}: {
  museum: Museum;
  query: string;
  onPress: () => void;
}) {
  const { palette } = useTheme();
  const s = makeStyles(palette);
  return (
    <TouchableOpacity style={s.resultRow} onPress={onPress} activeOpacity={0.75}>
      <Image source={{ uri: museum.thumbnail }} style={s.resultThumb} resizeMode="cover" />
      <View style={s.resultInfo}>
        <HighlightText text={museum.name} query={query} style={s.resultName} />
        <View style={s.resultSubRow}>
          <HighlightText
            text={`${museum.category} · ${museum.distanceMi} mi`}
            query={query}
            style={s.resultSub}
          />
        </View>
      </View>
      <View style={s.resultRating}>
        <Star size={10} weight="fill" color={Colors.gilt} />
        <Text style={s.resultRatingText}>{museum.rating.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function SearchScreen() {
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);
  const [query, setQuery] = useState('');
  const { palette } = useTheme();
  const styles = makeStyles(palette);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  const results = query.trim().length > 0
    ? museums.filter((m) =>
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.category.toLowerCase().includes(query.toLowerCase()) ||
        m.neighborhood.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <SafeAreaView style={styles.safe}>
      {/* Search bar row */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <MagnifyingGlass size={18} weight="thin" color={palette.accent} />
          <TextInput
            ref={inputRef}
            value={query}
            onChangeText={setQuery}
            placeholder="Search museums…"
            placeholderTextColor={palette.textMuted}
            style={styles.searchInput}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <XCircle size={17} weight="fill" color={palette.textMuted} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Results */}
        {results.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Results</Text>
            {results.map((museum, i) => (
              <View key={museum.id}>
                <SearchResultRow
                  museum={museum}
                  query={query}
                  onPress={() => router.push(`/museum/${museum.id}` as any)}
                />
                {i < results.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        )}

        {/* No results */}
        {query.length > 0 && results.length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <MagnifyingGlass size={38} weight="thin" color={palette.accent} />
            </View>
            <Text style={styles.emptyTitle}>No matches found</Text>
            <Text style={styles.emptySub}>
              We couldn't find a museum for "{query}". Try another name, or browse by category.
            </Text>
            <TouchableOpacity
              style={styles.emptyBtn}
              onPress={() => setQuery('')}
              activeOpacity={0.85}
            >
              <GridFour size={15} weight="thin" color={palette.accent} />
              <Text style={styles.emptyBtnText}>Browse categories</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Recent searches */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Recent searches</Text>
          {RECENT_SEARCHES.map((term) => (
            <TouchableOpacity
              key={term}
              style={styles.recentRow}
              onPress={() => setQuery(term)}
              activeOpacity={0.7}
            >
              <ClockCounterClockwise size={17} weight="thin" color={palette.textMuted} />
              <Text style={styles.recentText}>{term}</Text>
              <ArrowUpLeft size={16} weight="thin" color={palette.textMuted} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (p: Palette) => StyleSheet.create({
  safe: { flex: 1, backgroundColor: p.background },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: Spacing.screenH,
    paddingTop: 12,
    paddingBottom: 8,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    backgroundColor: p.surface,
    borderWidth: 1.5,
    borderColor: p.accent,
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 11,
  },
  searchInput: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 14,
    color: p.textPrimary,
    padding: 0,
  },
  cancelText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    color: p.accent,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  section: {
    paddingHorizontal: Spacing.screenH,
    paddingTop: 4,
    marginBottom: 8,
  },
  sectionLabel: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase' as const,
    color: p.textMuted,
    marginBottom: 12,
    marginTop: 16,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 9,
  },
  resultThumb: {
    width: 46,
    height: 46,
    borderRadius: 9,
    backgroundColor: p.surfaceSecondary,
    flexShrink: 0,
  },
  resultInfo: { flex: 1 },
  resultName: {
    fontFamily: Fonts.display,
    fontSize: 15,
    lineHeight: 18,
    color: p.textPrimary,
  },
  resultSubRow: { marginTop: 3 },
  resultSub: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: p.textSecondary,
  },
  resultRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    flexShrink: 0,
  },
  resultRatingText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 11,
    color: p.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: p.dividerLine,
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    paddingVertical: 7,
  },
  recentText: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 14,
    color: p.textBodyMuted,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 40,
  },
  emptyIconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: p.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontFamily: Fonts.display,
    fontSize: 22,
    color: p.textPrimary,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 8,
  },
  emptySub: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: p.textSecondary,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 22,
  },
  emptyBtn: {
    borderWidth: 1,
    borderColor: p.accent,
    borderRadius: 11,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  emptyBtnText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 13,
    color: p.accent,
  },
});
