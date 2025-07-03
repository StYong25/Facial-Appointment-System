import React, { useState, useEffect } from "react";
import { Text, View, FlatList, TouchableNativeFeedback } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { formatted } from "../utility";
import { getDB, getPlaces } from "../db-service";

let config = require("../Config");

const App = ({navigation}) => {

  const [places, setPlaces] = useState([]);

  const _query = () => {
    //setPlaces(await getPlaces(await getDB()));
    let url = config.settings.serverPath + "/api/places";

    fetch(url).then(response => {
      return response.json()
    }).then(places => {
      setPlaces(places)
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(()=>{
    _query();
  }, []);

    return(
      <View style={{flex:1}}>
        <FlatList 
          data = {places}
          renderItem = { ({item}) => (
            <TouchableNativeFeedback
              onPress = { () => navigation.navigate('view', {
                place: item,
                refresh: _query
              }) }
            >
              <View style={{padding:10, borderBottomWidth: 1}}>
                <Text style={{fontSize:22, fontWeight:'bold'}}>{item.name}</Text>
                <Text style={{fontSize:15}}>{item.city}</Text>
                {/** new Date() */}
                <Text style={{fontSize:15}}>{formatted(new Date(item.date))}</Text>
              </View>
            </TouchableNativeFeedback>
          )}
        />
        <FloatingAction 
          actions = {[
            {
              text: 'Add place',
              icon: require("../images/add_icon.jpg"),
              name: 'add'
            }
          ]}
          onPressItem={()=>navigation.navigate('create', {
            refresh: _query
          })}
        />
      </View>
    )
}

export default App;