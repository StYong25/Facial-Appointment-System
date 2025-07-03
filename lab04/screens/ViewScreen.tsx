import React, {useEffect, useState} from "react";
import {Text,View} from "react-native";
import { InputWithLabel } from "../../UI";
import { FloatingAction } from "react-native-floating-action";
import { formatted } from "../utility";
import { getDB, deletePlace, getPlaceById } from "../db-service";

let config = require("../Config");

const actions = [
  {
    text: 'Edit place',
    icon: require("../images/edit_icon.jpg"),
    name: 'edit'
  },
  {
    text: 'Delete place',
    icon: require("../images/delete_icon.jpg"),
    name: 'delete'
  }
]

const App = ({route, navigation}) => {

  const {place} = route.params;

  const [name, setName] = useState(place.name);
  const [city, setCity] = useState(place.city);
  const [date, setDate] = useState(new Date(place.date));

  const _delete = async() => {
    await deletePlace(await getDB(),place.id);

    let url = config.setting.serverPath + "/api/places/" + place.id;

    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: place.id
      })
    })
    route.params.refresh();
    navigation.goBack();
  }

  const _getPlaceById = async() => {
    const updatedPlace = await getPlaceById(await getDB(),place.id);
    setName(updatedPlace.name);
    setCity(updatedPlace.city);
    setDate(new Date(updatedPlace.date));
  }

    return(
      <View style={{flex:1}}>
        <InputWithLabel 
          label = "Name:"
          value = {name}
          editable = {false}
          orientation = "horizontal"
        />
        <InputWithLabel 
          label = "City:"
          value = {city}
          editable = {false}
          orientation = "horizontal"
        />
        <InputWithLabel 
          label = "Date:"
          value = {formatted(new Date(date))}
          editable = {false}
          orientation = "horizontal"
        />
        <FloatingAction 
          actions={actions}
          onPressItem={name=>{
            switch(name){
              case 'edit':
                navigation.navigate('edit', {
                  /* 
                   place = {
                    id: ,
                    name: ,
                    city: ,
                    date: 123456789
                   }
                  */
                  place: place,
                  homeRefresh: route.params.refresh,
                  viewRefresh: _getPlaceById
                })
                break;
              case 'delete':
                _delete();
                break;
            }
          }}
        />
      </View>
    )
}

export default App;