import React, {Component} from 'react'
import { TextInput, View, Text } from 'react-native';

export default class RenderInput extends Component<Props> {
  render() {
    const { input, placeholder, keyboardType, ...inputProps } = this.props;

    return (
      <View>
        <TextInput
        {...inputProps}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
        placeholder={placeholder}
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        editable={true}
        keyboardType="default"
        />
      </View>
    );
  }
}
