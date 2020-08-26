import React, { useEffect, useCallback, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import PalettePreview from "../components/PalettePreview";
import { TouchableOpacity } from "react-native-gesture-handler";

const Home = ({ navigation, route }) => {
  const newColorPalette = route.params ? route.params.newColorPalette : null;
  const [paletteData, setPalette] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getPaletteData = useCallback(async () => {
    const response = await fetch(
      "https://color-palette-api.kadikraman.now.sh/palettes"
    );
    if (response.ok) {
      const json = await response.json();
      setPalette(json);
    }
  }, []);

  useEffect(() => {
    getPaletteData();
  }, []);

  useEffect(() => {
    if (newColorPalette) {
      setPalette((palettes) => [newColorPalette, ...palettes]);
    }
  }, [newColorPalette]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await getPaletteData();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
    //optional - setTimeout for UX purposes: make it appear for users that it was refreshed
  }, []);

  return (
    <FlatList
      style={styles.list}
      data={paletteData}
      keyExtractor={(item) => item.paletteName}
      renderItem={({ item }) => (
        <PalettePreview
          handlePress={() => navigation.navigate("ColorPalette", item)}
          colorPalette={item}
        />
      )}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      ListHeaderComponent={
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ColorPaletteModal");
          }}
        >
          <Text style={styles.button}>Add a color scheme</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: "white",
  },
  button: {
    color: "teal",
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 15,
  },
});

export default Home;

// const COLORS_PALETTE = [
//   { paletteName: "Solarized", colors: SOLARIZED },
//   { paletteName: "Frontend Masters", colors: FRONTEND_MASTERS },
//   { paletteName: "Rainbow", colors: RAINBOW },
// ];
