import React, {useState, useEffect} from 'react'
import {StyleSheet,View,ImageBackground,Image,Text, TextInput,TouchableOpacity,Alert} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';

export default function Login({route, navigation}) {
  const [username, setUsername] = useState(null)

  const handleSubmit = ()=> {
    if (username) {
      navigation.navigate('Home',{username})
    } else {
      Alert.alert('Attention','Please fill username input')
    }
  }

  return (
    <ImageBackground source={require('../Images/background-green.jpg')} style={styles.bgImage}>
      <View style={styles.view}> 
      <Image source={require('../Images/leaf.png')}></Image>
      <View style={styles.viewText}>
        <Text style={[styles.text, {color: 'rgba(123, 239, 178, 1)'}]}>Agri</Text>
        <Text style={[styles.text, {color: '#fff'}]}>Info</Text>
      </View>
      <View style={styles.viewDescribe}>
         <Text style={styles.colorWhite}>Welcome to AgriInfo App</Text>
         <Text style={styles.colorWhite}>Please login with your username</Text>
      </View>
      <View style={styles.viewInput}>
        <TextInput placeholder="Input your username..." style={styles.textInput} onChangeText={(text)=>{setUsername(text)}}/>
        <TouchableOpacity style={styles.iconNext} onPress={()=>{handleSubmit()}}>
        <MaterialIcons name="navigate-next" size={28} color="black" />
        </TouchableOpacity>
      </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    width : wp('100%'),
    paddingBottom: 100
  },
  view: {
    flex : 1,
    width : wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  bgImage : {
    flex: 1,
    resizeMode: "cover",
  },
  viewText:{
    flexDirection: 'row',
    marginTop: 0
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  viewDescribe: {
    alignItems: 'center',
    marginVertical: 30
  },
  colorWhite: {
    color: '#fff',
    fontWeight: 'bold'
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    backgroundColor: '#fff',
    padding: 10,
    paddingHorizontal: 15,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    width: wp('55%')
  },
  iconNext: {
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#fff',
    padding: 10
  }
})

