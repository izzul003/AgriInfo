import React, {useState, useEffect} from 'react';
import {StyleSheet,View,Text,Image,ImageBackground} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Detail ({route, navigation}) {
  const {item, list, nutritionCode, bgColor, textColor} = route.params

  return (
    <View style={styles.container}>
      <View>
      <Image source={{uri: item.parsed[0].food.image}} style={styles.image}></Image>
      </View>
      <View style={styles.viewRounded} />
      <View style={styles.viewDetail}>
      <Text style={[styles.textTitle, {color: textColor? textColor : list[list.findIndex(obj => obj.param == item.text)].colorText}]}>{item.parsed[0].food.label}</Text>
      <Text style={styles.textDetail}>Memiliki beberapa kandungan gizi dan nutrisi yang baik diantaranya : </Text>
      <View style={{height: hp('2%')}}/>
      {
        Object.entries(item.parsed[0].food.nutrients).map((key,idx)=>{
          return <Text style={styles.textDetail} key={idx}>
            {nutritionCode[nutritionCode.findIndex(obj => obj.code == String(key[0]))].name} = {key[1]} {nutritionCode[nutritionCode.findIndex(obj => obj.code == String(key[0]))].unit} 
            </Text>
        })
      }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bgImage : {
    flex: 1,
    resizeMode: "cover",
  },
  image: {
    width: wp('100%'),
    height: hp('45%'),
  },
  viewRounded: {
    backgroundColor: '#fff',
    zIndex: 1,
    position: 'absolute',
    width: wp('100%'),
    top: hp('40%'),
    height: hp('6%'),
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    alignItems: 'center'
  },
  viewDetail: {
    flex: 1,
    width: wp('100%'),
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 40
  },
  textTitle: {
    fontSize: 35,
    fontWeight: 'bold'
  },
  textDetail: {
    fontSize: 18
  }
})
