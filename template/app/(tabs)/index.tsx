import React from "react";
import { List, Paragraph, Text, Title } from "react-native-paper";
import { useJustDialog } from "@/context/JustDialog";
import AlertContainer from "../../components/light/AlertContainer";
import { useBottomSheet } from "@/context/AnimatedBottomSheet";
import { useDrawer } from "@/context/DrawerContext";
import { View } from "react-native";
import { LightScrollView, LightSwitch } from "@/components/light";

const IndexScreen = () => {
  const [switchValue, setSwitchValue] = React.useState(false);
  const { showJustDialog, handleDialogClose } = useJustDialog();
  const { showBottomSheet } = useBottomSheet();
  const { openDrawer } = useDrawer();

  const handleShowAnimatedDialog = () => {
    showJustDialog(() => (
      <AlertContainer>
        <AlertContainer.Icon />
        <AlertContainer.Title text="Light" />
        <AlertContainer.Content>
          <Paragraph>A billion dollar company of future but now starting, we will be listed on top of google, microsoft, meta, amazon as well as possible...</Paragraph>
        </AlertContainer.Content>
        <AlertContainer.Actions>
          <AlertContainer.DeclineButton
            text="Cancel"
            onPress={handleDialogClose}
          />
          <AlertContainer.AcceptButton text="OK" onPress={handleDialogClose} />
        </AlertContainer.Actions>
      </AlertContainer>
    ));
  };

  const handleShowBottomSheet = () => {
    showBottomSheet(() => (
      <>
        <List.Item
          title="Bottom Sheet Content"
          description="This is the content inside the bottom sheet."
          left={(props) => <List.Icon {...props} icon="information-outline" />}
        />
        <List.Item
          title="Bottom Sheet Content"
          description="This is the content inside the bottom sheet."
          left={(props) => <List.Icon {...props} icon="information-outline" />}
        />
        <List.Item
          title="Bottom Sheet Content"
          description="This is the content inside the bottom sheet."
          left={(props) => <List.Icon {...props} icon="information-outline" />}
        />
      </>
    ));
  };

  const handleOpenDrawer = () => {
    openDrawer(
      () => (
        <View>
          <Text>This is the drawer content!</Text>
        </View>
      ),
      0.7 // Pass a custom drawerContentResize value here
    );
  };

  return (
    <LightScrollView>
      <Title style={{ textAlign: "center", padding: 10, }}>
        Me tulsi tere aangan ki bina tel ke diya jalake to dikha.
      </Title>
      <List.Item
        title="Animated Switch"
        left={(props) => <List.Icon {...props} icon="flash" />}
        right={() => (
          <LightSwitch
            value={switchValue}
            onValueChange={() => setSwitchValue(!switchValue)}
          />
        )}
        onPress={() => setSwitchValue(!switchValue)}
      />
      <List.Item
        title="Animated Dialog"
        left={(props) => <List.Icon {...props} icon="flash" />}
        onPress={handleShowAnimatedDialog}
      />
      <List.Item
        title="Show Bottom Sheet"
        left={(props) => <List.Icon {...props} icon="chevron-up" />}
        onPress={handleShowBottomSheet}
      />
      <List.Item
        title="Open Drawer with scale resize"
        left={(props) => <List.Icon {...props} icon="gesture-tap-hold" />}
        onPress={handleOpenDrawer}
      />
    </LightScrollView>
  );
};

export default IndexScreen;
