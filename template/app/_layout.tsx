import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { PaperProvider } from "react-native-paper";
import { useColorScheme } from "react-native";
import { ThemeDynamicProvider, useDynamicTheme } from "@/context/Themes";
import { JustDialogProvider } from "@/context/JustDialog";
import { AnimatedDialogProvider } from "@/context/AnimatedDialog";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetProvider } from "@/context/AnimatedBottomSheet";
import { DrawerProvider } from "@/context/DrawerContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeDynamicProvider>
      <MainLayout />
    </ThemeDynamicProvider>
  );
}

function MainLayout() {
  const { theme } = useDynamicTheme();
  const colorScheme = useColorScheme();

  return (
    <PaperProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <BottomSheetProvider>
            <DrawerProvider>
                <AnimatedDialogProvider>
                  <JustDialogProvider>
                    <Stack
                      initialRouteName="(tabs)"
                      screenOptions={{
                        animation: "ios",
                      }}
                    >
                      <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen name="+not-found" />
                    </Stack>
                  </JustDialogProvider>
                </AnimatedDialogProvider>
            </DrawerProvider>
          </BottomSheetProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
