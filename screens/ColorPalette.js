import React from "react";
import { View, Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import ColorBox from "../components/ColorBox";

const ColorPalette = ({ route }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={route.params.colors}
        // if you have a key property in data, you can omit line 35 all together: key: '1'
        keyExtractor={(item) => item.colorName}
        renderItem={({ item }) => (
          <ColorBox colorName={item.colorName} hexCode={item.hexCode} />
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "white",
  },
  blackText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default ColorPalette;
