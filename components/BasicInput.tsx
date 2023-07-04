import { StyleProp, StyleSheet, TextInput, TextInputProps, ViewStyle } from 'react-native'
import React from 'react'

interface BasicInputProps extends TextInputProps{
    value: string;
    changeTextHandler: (text: string) => void;
    style?: StyleProp<ViewStyle>
}


const BasicInput: React.FC<BasicInputProps> = ({
    value,
    changeTextHandler,
    style,
    placeholder="Start Typing...",
    ...rest
}) => {

    const mergedStyles = StyleSheet.compose(localStyles.input, style);

    return (
        <TextInput
            style={mergedStyles}
            onChangeText={changeTextHandler}
            value={value}
            autoCapitalize="none"
            placeholder={placeholder}
            placeholderTextColor={"#777"}
            {...rest}
        ></TextInput>
    );
};

export default BasicInput

const localStyles = StyleSheet.create({
    input: {
        width: '100%',
        height: 45,
        borderWidth: 1,
        color: "#000",
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        borderRadius: 10,
    },
})

