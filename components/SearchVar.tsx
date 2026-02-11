import { SearchBar } from "@rneui/themed";
import { useState } from "react";
import { View } from "react-native";


const SearchVar = () => {
  const [search, setSearch] = useState("");

  return (
    <View>
      <SearchBar
        placeholder="Buscar"
        value={search}
        onChangeText={setSearch}
        lightTheme
        round
        containerStyle={{
          backgroundColor: "rgb(101, 2, 28)",
          padding: 0,
        }}
        inputContainerStyle={{
          backgroundColor: "#fff",
          borderRadius: 15,
          height: 45,
        }}
        inputStyle={{
          color: "#000",
        }}
      />
    </View>
  );
};

export default SearchVar;