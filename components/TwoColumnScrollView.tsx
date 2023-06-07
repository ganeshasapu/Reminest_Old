import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';
import { styles } from '../app/stylesheets/styles';

const OptionItem = ({ title, selected, onSelect, color }: any) => {
    return (
        <TouchableOpacity
            onPress={() => onSelect(title)}
            style={[
                localStyles.optionButton,
                { opacity: selected ? 1 : 0.5, backgroundColor: color },
            ]}
        >
            <Text style={[styles.text]}>{title}</Text>
        </TouchableOpacity>
    );
};

interface TwoColumnScrollViewProps {
    data: Array<any>;
    toggleOptionFunc: Function;
    optionColor: string;
}

const TwoColumnScrollView = ({
    data,
    toggleOptionFunc,
    optionColor,
}: TwoColumnScrollViewProps) => {
    return (
        <ScrollView
            style={{ height: "30%" }}
            horizontal
            showsHorizontalScrollIndicator={false}
            alwaysBounceVertical={false}
            directionalLockEnabled={true}
        >
            <FlatList
                contentContainerStyle={{ alignSelf: "flex-start" }}
                numColumns={Math.ceil(data.length / 2)}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                data={data}
                renderItem={({ item, index }) => {
                    return (
                        <OptionItem
                            key={index}
                            title={item.title}
                            selected={item.selected}
                            onSelect={toggleOptionFunc}
                            color={optionColor}
                        />
                    );
                }}
            />
        </ScrollView>
    );
};

export default TwoColumnScrollView

const localStyles = StyleSheet.create({
    optionButton: {
        backgroundColor: Colors.blue,
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
    },
});
