import React, {useState} from "react";
import { InputWithLabel, AppButton } from "../../UI";
import { formatted } from "../utility";
import { getDB, createPlace } from "../db-service";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

let config = require("../Config");

const App = ({route, navigation}) => {

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState(new Date(Date.now()));
  const [openPicker, setOpenPicker] = useState(false);

  const _insert = () => {
    

    let url = config.settings.serverPath + "/api/places";

    fetch(url, {
      method: 'POST' , 
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        city: city,
        date: date.valueOf()
      }),
    })

    route.params.refresh();
    navigation.goBack();
  }

  const openDatePicker = () => {
    setOpenPicker(true);
  }

  const onDateSelected = (event: DateTimePickerEvent, value: any ) => {
    setDate(value);
    setOpenPicker(false);
  }

    return(
      <View style={{flex:1}}>
        <InputWithLabel 
          label = "Name:"
          value = {name}
          orientation = "horizontal"
          onChangeText = { (input) => setName(input)}
          placeholder = "name"
        />
        <InputWithLabel 
          label = "City:"
          value = {city}
          orientation = "horizontal"
          onChangeText = { (input) => setCity(input)}
          placeholder = "city"
        />
        <TouchableWithoutFeedback onPress={openDatePicker}>
          <View>
            <InputWithLabel 
              label = "Date:"
              value = {formatted(date)}
              editable = {false}
              orientation = "horizontal"
            />
          </View>
        </TouchableWithoutFeedback>

        {openPicker &&
          <DateTimePicker
            value={date}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            is24Hour={false}
            onChange={onDateSelected}
            style={styles.datePicker}
          />}

        <AppButton 
          title = "Create Place"
          onPress = {()=>_insert()}
        />
      </View>
    )
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10,
  },
  input: {
    fontSize: 20,
    height: 48,
    color: 'black',
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
});

export default App;