import React, { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Menu, Title } from "react-native-paper";
import { useRouter } from "expo-router";
import { useDynamicTheme } from "@/context/Themes";
import BottomNavigation from "@/components/light/BottomNavigation";
import PagerView from "react-native-pager-view";
import IndexScreen from ".";
import CallsScreen from "./calls";
import StoriesScreen from "./stories";
import { useDrawer } from "@/context/DrawerContext";

interface Route {
  key: string;
  title: string;
  icon: string;
  focusedIcon: string;
}

export default function TabLayout() {
  const { theme } = useDynamicTheme();
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const pagerRef = useRef<PagerView>(null); // Reference to PagerView
  const { openDrawer } = useDrawer();

  const routes: Route[] = [
    { key: "home", title: "Home", icon: "chat-outline", focusedIcon: "chat" },
    { key: "call", title: "Call", icon: "phone-outline", focusedIcon: "phone" },
    {
      key: "story",
      title: "Stories",
      icon: "view-carousel-outline",
      focusedIcon: "view-carousel",
    },
  ];

  // Handle menu actions
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleMenuAction = (action: string) => {
    switch (action) {
      case "New Group":
        console.log("New Group action");
        break;
      case "Invite Friends":
        console.log("Invite Friends action");
        break;
      case "Archived Chats":
        router.push("../screens/archive");
        break;
      case "Settings":
        router.push("../screens/setting");
        break;
      default:
        break;
    }
    closeMenu();
  };

  // Handle drawer actions
  const handleDrawerOpen = () => {
    openDrawer(() => <Title>Light</Title>, 1);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Appbar.Header style={styles.appBar}>
        <Appbar.Action icon="menu" onPress={handleDrawerOpen} />
        <Appbar.Content
          title="Light Components"
          titleStyle={styles.title}
          style={styles.appBarContent}
        />
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              onPress={openMenu}
              style={styles.icon}
            />
          }
          anchorPosition="bottom"
          contentStyle={styles.menuContainer}
        >
          <Menu.Item
            onPress={() => handleMenuAction("New Group")}
            title="New Group"
            leadingIcon="account-outline"
          />
          <Menu.Item
            onPress={() => handleMenuAction("Archived Chats")}
            title="Archived Chats"
            leadingIcon="archive-arrow-down-outline"
          />
          <Menu.Item
            onPress={() => handleMenuAction("Invite Friends")}
            title="Invite Friends"
            leadingIcon="account-plus-outline"
          />
          <Menu.Item
            onPress={() => handleMenuAction("Settings")}
            title="Settings"
            leadingIcon="cog-outline"
          />
        </Menu>
      </Appbar.Header>

      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(e) => setIndex(e.nativeEvent.position)}
      >
        <View key="home">
          <IndexScreen />
        </View>
        <View key="call">
          <CallsScreen />
        </View>
        <View key="story">
          <StoriesScreen />
        </View>
      </PagerView>

      <BottomNavigation
        state={{ index, routes }}
        index={index}
        setIndex={(i: number) => {
          setIndex(i);
          pagerRef.current?.setPage(i); // Switch PagerView page when tab is selected
        }}
        navigation={{
          navigate: (routeName: string) => {
            const routeIndex = routes.findIndex(
              (route) => route.key === routeName
            );
            if (routeIndex !== -1) {
              setIndex(routeIndex);
              pagerRef.current?.setPage(routeIndex); // Switch PagerView page when navigation is triggered
            }
          },
          emit: ({ type }: { type: string }) =>
            type === "tabPress" ? { defaultPrevented: false } : {},
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  appBar: { justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold" },
  appBarContent: { flex: 1 },
  icon: { marginRight: 10 },
  menuContainer: { borderRadius: 10 },
  pagerView: { flex: 1 },
});
