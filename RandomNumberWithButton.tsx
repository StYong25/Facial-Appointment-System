import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  value: number;
  onRandomize: (newValue: number) => void;
};

const getRandomNumber = (min:number,
    max:number) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() *
    (maxFloored - minCeiled + 1) + minCeiled); }

const RandomNumberWithButton = ({initialValue, setValue}) =>{
    return(
        <View style={styles.container}>
            <Text style ={styles.numberText}>{initialValue}</Text>
            <TouchableNativeFeedback onPress={() => setValue(getRandomNumber(0,10))}>
                <View>
                    <MaterialCommunityIcons name="refresh" size = {36} color="blue" />
                </View>
            </TouchableNativeFeedback>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 10,
    },
    numberText: {
      fontSize: 20,
      marginHorizontal: 10,
    },
  });

export default RandomNumberWithButton;
