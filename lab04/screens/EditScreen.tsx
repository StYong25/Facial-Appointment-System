import React, {useState} from "react";
import { InputWithLabel, AppButton } from "../../UI";
import { formatted } from "../utility";
import { getDB, editPlace } from "../db-service";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

let config = require("../Config");


const App = ({route, navigation}) => {

  const {place} = route.params

  const [name, setName] = useState(place.name);
  const [city, setCity] = useState(place.city);
  const [date, setDate] = useState(new Date(place.date));
  const [openPicker, setOpenPicker] = useState(false);

  const _edit = async() => {
    await editPlace(await getDB(), place.id, name, city, date.valueOf());

    let url = config.settings.serverPath + "/api/places/" + place.id;

    fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        id: place.id,
        name: name,
        city: city,
        date: date.valueOf()
      })
    })
    route.params.viewRefresh();
    route.params.homeRefresh();
    navigation.goBack();
  }

  const _getPlaceById = async() => {

    let url = config.settings.serverPath + "/api/places/" + place.id;

    fetch(url).then(response => {
      return response.json()
    }).then (updatedPlace => {
      setName(updatedPlace.name);
      setCity(updatedPlace.city);
      setDate(new Date(updatedPlace.date));
    })
    
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
          title =  {`Edit ${name}`}
          onPress = {()=> _edit()}
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