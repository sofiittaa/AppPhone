import { theme } from "@/constants/theme";
import { SearchBar } from "@rneui/themed";
import { View } from "react-native";

const SearchVar = ({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (text: string) => void;
}) => {
  return (
    <View>
      <SearchBar
        placeholder="Buscar"
        value={value}
        onChangeText={onChangeText}
        lightTheme
        containerStyle={{
          marginTop: 50,
          padding: 0,
        }}
        inputContainerStyle={{
          backgroundColor: "#ffffff",
          borderColor: theme.colors.primary,
          borderLeftWidth: 2,
          borderRightWidth: 2,
          borderTopWidth: 2,
          borderBottomWidth: 2,
          borderRadius: 15,
          height: 45,
          width: 350,
          marginLeft: 30,
        }}
        inputStyle={{
          color: theme.colors.primary,
          fontFamily: theme.fonts.text,
        }}
      />
    </View>
  );
};

export default SearchVar;
