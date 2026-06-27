import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Fonts, useTheme } from '../src/theme';

export default function NotFoundScreen() {
  const { palette } = useTheme();
  return (
    <>
      <Stack.Screen options={{ title: 'Not found' }} />
      <View style={[styles.container, { backgroundColor: palette.background }]}>
        <Text style={[styles.title, { color: palette.textPrimary }]}>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={[styles.linkText, { color: palette.accent }]}>Go home</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontFamily: Fonts.display, fontSize: 22, marginBottom: 16 },
  link: {},
  linkText: { fontFamily: Fonts.body, fontSize: 14 },
});
