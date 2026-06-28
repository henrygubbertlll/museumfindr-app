import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Heart, ChatCircle, Trophy, Check } from 'phosphor-react-native';
import { Colors, Fonts, Spacing, useTheme } from '../src/theme';
import type { Palette } from '../src/theme';
import { notifications as seedNotifications, allUsers } from '../src/data/seed';

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}h ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return 'Yesterday';
  return `${days}d ago`;
}

const KIND_BADGE_BG: Record<string, string> = {
  like: Colors.oxblood,
  comment: '#1B3066',
  milestone: '#FBF1DC',
  follow: Colors.oxblood,
};

interface NotifRowProps {
  notif: typeof seedNotifications[0];
  isUnread: boolean;
  onRead: () => void;
}

function NotifRow({ notif, isUnread, onRead }: NotifRowProps) {
  const user = allUsers[notif.userId];
  const badgeBg = KIND_BADGE_BG[notif.kind] ?? Colors.oxblood;
  const isMilestone = notif.kind === 'milestone';
  const { palette } = useTheme();
  const s = makeStyles(palette);

  return (
    <TouchableOpacity
      style={[s.row, isUnread && s.rowUnread]}
      onPress={onRead}
      activeOpacity={0.8}
    >
      {isUnread && <View style={s.unreadDot} />}

      <View style={s.avatarWrap}>
        {isMilestone ? (
          <View style={[s.avatar, s.trophyAvatar]}>
            <Trophy size={20} weight="fill" color={Colors.gilt} />
          </View>
        ) : (
          <Image source={{ uri: user?.avatar }} style={s.avatar} />
        )}
        {!isMilestone && (
          <View style={[s.badge, { backgroundColor: badgeBg }]}>
            {notif.kind === 'like' && <Heart size={9} weight="fill" color="#fff" />}
            {notif.kind === 'comment' && <ChatCircle size={9} weight="fill" color="#fff" />}
            {notif.kind === 'follow' && <Check size={9} weight="fill" color="#fff" />}
          </View>
        )}
      </View>

      <View style={s.textBlock}>
        <Text style={s.notifText}>{notif.text}</Text>
        <Text style={s.notifTime}>{timeAgo(notif.at)}</Text>
      </View>

      {notif.kind === 'follow' && isUnread && (
        <View style={s.actionBtns}>
          <TouchableOpacity style={s.acceptBtn} onPress={onRead}>
            <Text style={s.acceptBtnText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.declineBtn}>
            <Text style={s.declineBtnText}>×</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function NotificationsScreen() {
  const router = useRouter();
  const { palette } = useTheme();
  const styles = makeStyles(palette);
  const [readIds, setReadIds] = useState<Set<string>>(
    new Set(seedNotifications.filter((n) => n.read).map((n) => n.id))
  );

  function markRead(id: string) {
    setReadIds((prev) => new Set([...prev, id]));
  }

  function markAllRead() {
    setReadIds(new Set(seedNotifications.map((n) => n.id)));
  }

  const today = seedNotifications.filter((n) => {
    const hrs = (Date.now() - new Date(n.at).getTime()) / 3600000;
    return hrs < 24;
  });
  const earlier = seedNotifications.filter((n) => {
    const hrs = (Date.now() - new Date(n.at).getTime()) / 3600000;
    return hrs >= 24;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <ArrowLeft size={22} weight="thin" color={palette.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Activity</Text>
        </View>
        <TouchableOpacity onPress={markAllRead} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {today.length > 0 && (
          <View>
            <Text style={styles.groupLabel}>Today</Text>
            {today.map((n) => (
              <NotifRow key={n.id} notif={n} isUnread={!readIds.has(n.id)} onRead={() => markRead(n.id)} />
            ))}
          </View>
        )}
        {earlier.length > 0 && (
          <View>
            <Text style={styles.groupLabel}>Earlier</Text>
            {earlier.map((n) => (
              <NotifRow key={n.id} notif={n} isUnread={!readIds.has(n.id)} onRead={() => markRead(n.id)} />
            ))}
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (p: Palette) => StyleSheet.create({
  safe: { flex: 1, backgroundColor: p.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenH,
    paddingTop: 12,
    paddingBottom: 14,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { fontFamily: Fonts.display, fontSize: 22, color: p.textPrimary },
  markAllText: { fontFamily: Fonts.bodyMedium, fontSize: 11, color: p.accent },
  groupLabel: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase' as const,
    color: p.textMuted,
    paddingHorizontal: Spacing.screenH,
    paddingBottom: 10,
    paddingTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    paddingVertical: 11,
    paddingHorizontal: Spacing.screenH,
    position: 'relative',
  },
  rowUnread: { backgroundColor: p.surfaceSecondary },
  unreadDot: {
    position: 'absolute',
    left: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: p.accent,
  },
  avatarWrap: { position: 'relative', flexShrink: 0 },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: p.surfaceSecondary,
  },
  trophyAvatar: {
    backgroundColor: '#FBF1DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: p.background,
  },
  textBlock: { flex: 1 },
  notifText: { fontFamily: Fonts.body, fontSize: 13, lineHeight: 18, color: p.textPrimary },
  notifTime: { fontFamily: Fonts.body, fontSize: 11, color: p.textMuted, marginTop: 2 },
  actionBtns: { flexDirection: 'row', gap: 6, flexShrink: 0 },
  acceptBtn: {
    backgroundColor: p.accent,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  acceptBtnText: { fontFamily: Fonts.bodySemiBold, fontSize: 11, color: '#fff' },
  declineBtn: {
    borderWidth: 1,
    borderColor: p.border,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 8,
  },
  declineBtnText: { fontFamily: Fonts.bodySemiBold, fontSize: 13, color: p.textPrimary },
});
