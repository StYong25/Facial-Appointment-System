import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from "react-native";

const App =({navigation, route}:any)=>{
    return (
        <ScrollView contentContainerStyle = {style.container}>
            <Text style= {style.text}>
                Everything about us
            </Text>

            <View>
                <TouchableOpacity 
                style={style.button} 
                onPress ={()=> navigation.navigate("AboutUs")}>
                    <Text style = {style.buttonText}>About us</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={style.button} 
                onPress ={()=> navigation.navigate("MeetTeam")}>
                    <Text style = {style.buttonText}>Meet Our Team</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={style.button} 
                onPress ={()=> navigation.navigate("FAQ")}>
                    <Text style = {style.buttonText}>Frequent Ask Question</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={style.button}
                onPress={()=>navigation.navigate("Location")}>
                    <Text style= {style.buttonText}>Our Location</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const style  = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    text: {
        fontSize: 18,
        color: 'black',
        margin: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        margin: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        textAlign: 'center',
    },
})

export default App;