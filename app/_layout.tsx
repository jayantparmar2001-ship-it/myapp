import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '@/context/auth-context';
import { RequestsProvider } from '@/context/requests-context';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <RequestsProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="service-detail"
              options={{ headerShown: true, title: 'Service Details', presentation: 'card' }}
            />
            <Stack.Screen
              name="request-service"
              options={{ headerShown: true, title: 'Request Service', presentation: 'modal' }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </RequestsProvider>
    </AuthProvider>
  );
}
