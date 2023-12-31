import React, { useEffect, useState } from 'react';
import { 
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle
} from 'react-native';
import Icon  from 'react-native-vector-icons/Ionicons';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

type SearchInputProps = {
  onDebounce: ( value: string ) => void;
  style?: StyleProp<ViewStyle>;
}

export const SearchInput = ({ style, onDebounce }: SearchInputProps) => {

  const [textValue, setTextValue] = useState('');
  const debouncedValue = useDebouncedValue( textValue );

  useEffect(() => {
    onDebounce(debouncedValue); // <--- Call the function & pass the previous debounced value
  }, [debouncedValue])
  

  return (
    <View
    style={{
      ...style as any
    }}
    >
      <View style={ styles.textBackground }>
        <TextInput
          placeholder="Search Pokemon"
          style={{
            ...styles.textInput,
            top: (Platform.OS === 'ios') ? 0 : 4
          }}
          autoCapitalize='none'
          autoCorrect={ false }
          value={ textValue }
          onChangeText={ setTextValue }
        />

        <Icon
          name="search-outline"
          color="grey"
          size={ 30 }
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  textBackground: {
    backgroundColor: '#F3F1F3',
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  textInput: {
    flex: 1,
    fontSize: 18
  }
});