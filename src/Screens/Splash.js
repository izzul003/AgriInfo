import React, {useState, useEffect} from 'react'
import {StyleSheet,View,ImageBackground,Image,Text} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Splash({route, navigation}) {
  
  useEffect(() => {
    setTimeout(()=>{
      navigation.navigate('Login')
    },3000)
  })

  return (
    <View style={styles.container}>
      <Image source={require('../Images/leaf.png')}></Image>
      <View style={styles.viewText}>
        <Text style={[styles.text, {color: 'rgba(3, 166, 120, 1)'}]}>Agri</Text>
        <Text style={styles.text}>Info</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
    width : wp('100%'),
    paddingBottom: 100,
    backgroundColor: '#fff'
  },
  bgImage : {
    flex: 1,
    resizeMode: "cover",
  },
  viewText:{
    flexDirection: 'row'
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold'
  }
})

