import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  CaretRight,
  MoonStars,
  Ruler,
  Bell,
  GlobeHemisphereWest,
  LockSimple,
  Question,
  SignOut,
} from 'phosphor-react-native';
import { Fonts, Spacing, useTheme } from '../src/theme';
import type { Palette } from '../src/theme';

function SettingRow({
  icon,
  label,
  right,
  hasArrow = false,
  onPress,
  isDestructive = false,
  noBorder = false,
}: {
  icon: React.ReactNode;
  label: string;
  right?: string;
  hasArrow?: boolean;
  onPress?: () => void;
  isDestructive?: boolean;
  noBorder?: boolean;
}) {
  const { palette } = useTheme();
  const s = makeStyles(palette);
  return (
    <TouchableOpacity
      style={[s.row, noBorder && s.rowNoBorder]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={s.rowIcon}>{icon}</View>
      <Text style={[s.rowLabel, isDestructive && { color: palette.accent }]}>{label}</Text>
      {right ? <Text style={s.rowRight}>{right}</Text> : null}
      {hasArrow && <CaretRight size={12} weight="bold" color={palette.textMuted} />}
    </TouchableOpacity>
  );
}

function ToggleRow({
  icon,
  label,
  value,
  onChange,
  noBorder = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  noBorder?: boolean;
}) {
  const { palette } = useTheme();
  const s = makeStyles(palette);
  return (
    <View style={[s.row, noBorder && s.rowNoBorder]}>
      <View style={s.rowIcon}>{icon}</View>
      <Text style={s.rowLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: palette.toggleOff, true: palette.accent }}
        thumbColor="#fff"
        ios_backgroundColor={palette.toggleOff}
      />
    </View>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [pushNotifs, setPushNotifs] = useState(true);
  const { palette } = useTheme();
  const styles = makeStyles(palette);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <ArrowLeft size={22} weight="thin" color={palette.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Account card */}
        <TouchableOpacity style={styles.accountCard} activeOpacity={0.85}>
          <View style={styles.accountAvatar} />
          <View style={styles.accountInfo}>
            <Text style={styles.accountName}>Eleanor Vance</Text>
            <Text style={styles.accountHandle}>@eleanorv · Edit profile</Text>
          </View>
          <CaretRight size={13} weight="bold" color={palette.textMuted} />
        </TouchableOpacity>

        {/* Preferences */}
        <Text style={styles.groupLabel}>Preferences</Text>
        <View style={styles.card}>
          <ToggleRow
            icon={<MoonStars size={20} weight="thin" color={palette.accent} />}
            label="Dark mode"
            value={darkMode}
            onChange={setDarkMode}
          />
          <SettingRow
            icon={<Ruler size={20} weight="thin" color={palette.accent} />}
            label="Distance units"
            right="Miles"
            hasArrow
          />
          <ToggleRow
            icon={<Bell size={20} weight="thin" color={palette.accent} />}
            label="Push notifications"
            value={pushNotifs}
            onChange={setPushNotifs}
            noBorder
          />
        </View>

        {/* Privacy */}
        <Text style={styles.groupLabel}>Privacy</Text>
        <View style={styles.card}>
          <SettingRow
            icon={<GlobeHemisphereWest size={20} weight="thin" color={palette.accent} />}
            label="Default visit privacy"
            right="Friends"
            hasArrow
          />
          <SettingRow
            icon={<LockSimple size={20} weight="thin" color={palette.accent} />}
            label="Blocked accounts"
            hasArrow
            noBorder
          />
        </View>

        {/* Support */}
        <Text style={styles.groupLabel}>Support</Text>
        <View style={styles.card}>
          <SettingRow
            icon={<Question size={20} weight="thin" color={palette.accent} />}
            label="Help center"
            hasArrow
          />
          <SettingRow
            icon={<SignOut size={20} weight="thin" color={palette.accent} />}
            label="Log out"
            isDestructive
            noBorder
          />
        </View>

        <Text style={styles.version}>MuseumFindr v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (p: Palette) => StyleSheet.create({
  safe: { flex: 1, backgroundColor: p.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: Spacing.screenH,
    paddingTop: 12,
    paddingBottom: 14,
  },
  headerTitle: {
    fontFamily: Fonts.display,
    fontSize: 22,
    color: p.textPrimary,
  },
  content: {
    paddingHorizontal: Spacing.screenH,
    paddingBottom: 40,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    backgroundColor: p.surface,
    borderRadius: 14,
    padding: 14,
    shadowColor: '#211c17',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 18,
  },
  accountAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: p.surfaceSecondary,
    flexShrink: 0,
  },
  accountInfo: { flex: 1 },
  accountName: {
    fontFamily: Fonts.display,
    fontSize: 18,
    color: p.textPrimary,
    lineHeight: 20,
  },
  accountHandle: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: p.textSecondary,
    marginTop: 3,
  },
  groupLabel: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase' as const,
    color: p.textMuted,
    marginBottom: 8,
  },
  card: {
    backgroundColor: p.surface,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#211c17',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 13,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: p.dividerLine,
  },
  rowNoBorder: { borderBottomWidth: 0 },
  rowIcon: { width: 22, alignItems: 'center' },
  rowLabel: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 14,
    color: p.textPrimary,
  },
  rowRight: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: p.textSecondary,
  },
  version: {
    fontFamily: Fonts.mono,
    fontSize: 10,
    color: p.textMuted,
    textAlign: 'center',
    marginTop: 8,
  },
});
