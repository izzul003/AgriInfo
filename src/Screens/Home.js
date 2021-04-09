import React, {useState, useEffect} from 'react';
import {StyleSheet,Image,View,Text,ImageBackground,ScrollView, TextInput,TouchableOpacity,TouchableHighlight} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome, Feather, Octicons } from '@expo/vector-icons';
import * as Location from 'expo-location'
import {getWeather,setData, getData, setSearched, setSearchedNull} from '../store/actions'
import {useDispatch, useSelector} from 'react-redux'

export default function Home({route, navigation}) {
  const {username} = route.params
  const [position, setPosition] = useState(null)
  const [ingr, setIngr] = useState(null)
  const currentWeather = useSelector((state)=> state.weather)
  const data = useSelector((state)=> state.data)
  const searched = useSelector((state)=> state.searched)
  const list = [
    {
      name: 'Spinach Leaf',
      param: 'spinach leaf',
      color: 'rgba(123, 239, 178, 0.25)',
      colorText: 'rgba(123, 239, 178, 1)'
    },
    {
      name: 'Tomato',
      param: 'tomato',
      color: 'rgba(240, 52, 52, 0.25)',
      colorText: 'rgba(240, 52, 52, 1)'
    },
    {
      name: 'BeetRoot',
      param: 'beetroot',
      color: 'rgba(255,192,203 ,0.25)',
      colorText: 'rgba(255,192,203 ,1)'
    },
    {
      name: 'EggPlant',
      param: 'eggplant',
      color: 'rgba(142, 68, 173, 0.25)',
      colorText: 'rgba(142, 68, 173, 1)'
    }
  ]
  const nutritionCode = [
    {
      code: 'ENERC_KCAL',
      name: 'Energy',
      unit: 'kcal'
    },
    {
      code: 'PROCNT',
      name: 'Protein',
      unit: 'g'
    },
    {
      code: 'FAT',
      name: 'Fat',
      unit: 'g'
    },
    {
      code: 'FIBTG',
      name: 'Fiber',
      unit: 'g'
    },
    {
      code: 'CHOCDF',
      name: 'Carbs',
      unit: 'g'
    }
  ]

  const dispatch = useDispatch() 
  
  useEffect(() => {
    return () => {
      if (data.length == 0) {
        list.map(item=> {
          dispatch(setData(item.param))
        })
      }
    };
  }, [data])

  useEffect(() => {
    async function getLocation() {
      let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('Please enable location services')
        }
      const response = await Location.getCurrentPositionAsync({});
            setPosition({
        latitude: Number(response.coords.latitude),
        longitude: Number(response.coords.longitude),
      })
      return response
    }
    getLocation()
  }, [position])

  useEffect(() => {
    if (position) {
      dispatch(getWeather(position))
    }
  }, [position])

  const handleChaneSearch = (text)=> {
    if (text) {
      setIngr(text)
    } else {
      setIngr(null)
      dispatch(setSearchedNull())
    }
  }

  const handleSearch = ()=> {
    if (ingr) {
      dispatch(setSearched(ingr))
    }
  }

  return (
    <ImageBackground source={require('../Images/background-green-pallete.png')} style={styles.bgImage}>
      <ScrollView style={styles.container} keyboardDismissMode='on-drag'>
        <View style={styles.view}>
          <View style={styles.weather}>
            <View style={styles.location}>
              <Text style={styles.locationText}>
                {currentWeather && currentWeather.location.name}, {currentWeather && currentWeather.location.region},{" "}
                {currentWeather && currentWeather.location.country}{" "}
              </Text>
            </View>
            <View style={styles.detailWeather}>
              <View style={styles.spesificWeather}>
                <Image
                style={styles.iconWeather}
                source={{
                  uri: `http:${currentWeather && currentWeather.current.condition.icon}`,
                }}
                />
                <Text style={styles.conditionWeather}>
                  {currentWeather && currentWeather.current.condition.text}{" "}
                </Text>
              </View>
              <View style={styles.timeBox}>
                <Text style={styles.time}>
                  {new Date().getHours()} : {new Date().getMinutes()}
                </Text>
                <Text style={styles.termal}>
                  {currentWeather && currentWeather.current.temp_c}° C
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.profile}>
              <View style={styles.viewText}>
                <Text style={styles.textName}>
                  Hi, {username}
                </Text>
                <Text style={styles.textDescribe}>
                  Find your favorite fresh vegetables or fruits describe nutrition information !!
                </Text>
              </View>
              <Image
                style={styles.iconUser}
                source={require('../Images/avatar.png')}
                />
          </View>
        </View>
        <View style={styles.searchBox}>
          <TextInput style={styles.searchInput} placeholder="Search..." onChangeText={(text)=>handleChaneSearch(text)}></TextInput>
          <View style={styles.viewIconSearch}>
          <FontAwesome name="search" size={24} color="black" onPress={()=>handleSearch()} />
          </View>
        </View>
        <View style={styles.viewCard}>
          {
            searched ?
            <TouchableOpacity onPress={()=> {navigation.navigate('Detail', {item: searched, list, nutritionCode, bgColor: 'rgba(	255, 253, 208, 0.4)', textColor: 'rgba(238, 238, 0, 1)'})}}>
              <View style={[styles.cardSearch, {backgroundColor: 'rgba(	255, 253, 208, 0.4)'}]} >
                <View>
                <Text style={[styles.textNameCard, {color: 'rgba(238, 238, 0, 1)'}]}>{searched.text}</Text>
                {
                  Object.entries(searched.parsed[0].food.nutrients).map(key=>{
                    return <Text style={styles.textDetail}>
                      {key[1]} {nutritionCode[nutritionCode.findIndex(obj => obj.code == String(key[0]))].unit} 
                      </Text>
                  })
                }
                </View>
                <View style={styles.viewImageCard}>
                <Image source={{uri: searched.parsed[0].food.image}} style={styles.imageCard}/>
                </View>
              </View>
            </TouchableOpacity> : null
          }
          {
            data.length > 0 && data.map((item, idx)=> {
              if (idx<4) {
                return (
                <TouchableOpacity onPress={()=> navigation.navigate('Detail', {item, list, nutritionCode})}>
                  <View style={[styles.card, {backgroundColor: list[list.findIndex(obj => obj.param == item.text)].color}]} key={idx}>
                    <View>
                    <Text style={[styles.textNameCard, {color: list[list.findIndex(obj => obj.param == item.text)].colorText}]}>{list[list.findIndex(obj => obj.param == item.text)].name}</Text>
                    {
                      Object.entries(item.parsed[0].food.nutrients).map(key=>{
                        return <Text style={styles.textDetail}>
                          {key[1]} {nutritionCode[nutritionCode.findIndex(obj => obj.code == String(key[0]))].unit} 
                          </Text>
                      })
                    }
                    </View>
                    <View style={styles.viewImageCard}>
                    <Image source={{uri: item.parsed[0].food.image}} style={styles.imageCard}/>
                    </View>
                  </View>
                </TouchableOpacity>
                )
              }
            })
          }
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    width : wp('100%'),
    paddingBottom: 100
  },
  bgImage : {
    flex: 1,
    resizeMode: "cover",
  },
  view : {
    width : wp('100%'),
    height : wp('90%'),
  },
  profile : {
    flex: 1,
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop : hp('2%'),
    width : wp('100%'),
    paddingHorizontal: 40
  },
  textName : {
    fontSize : 16,
    color : 'white',
    fontWeight : 'bold',
  },
  textDescribe : {
    fontSize : 15,
    color : 'white',
    width: wp('55%'),
    marginRight: 0
  },
  weather: {
    flex: 1,
    flexDirection : 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: hp('3%'),
  },
  location: {
    width: '100%'
  },
  locationText: { 
    marginTop: 30,
    fontSize: 16, 
    fontWeight: "bold", 
    color: '#fff' 
  },
  detailWeather: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spesificWeather: {
    flex: 1,
    flexDirection: 'column'
  },
  iconWeather:{ 
    width: 70, 
    height: 70 
  },
  conditionWeather: { 
    color: '#fff', 
    fontSize: 14 
  },
  timeBox: {
    textAlignVertical: 'center', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 30
  },
  time: { 
    color: '#fff', 
    fontSize: 32, 
    fontWeight: 'bold'
  },
  termal: { 
    color: "#fff", 
    fontSize: 16, 
    borderColor: "#ccc", 
    marginTop: 15  
  },
  iconUser: { 
    width: 80, 
    height: 80 ,
    marginLeft: 0,
    marginRight: 10
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0
  },
  searchInput: {
    width: wp('70%'),
    backgroundColor: 'rgba(1,1,1,0.04)',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    padding: 10,
    paddingLeft: 20,
    marginRight: 0
  },
  viewIconSearch: {
    backgroundColor: 'rgba(1,1,1,0.04)',
    padding: 12,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50
  },
  viewCard: {
    flex: 1,
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('100%'),
    marginTop: 0,
    marginBottom: 30,
    paddingBottom: 50, 
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('80%'),
    height: hp('20%'),
    borderWidth: 1,
    borderColor: 'rgba(1,1,1,0.08)',
    borderRadius: 10,
    marginTop: 20,
    padding: 20,
  },
  cardSearch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('80%'),
    height: hp('20%'),
    borderWidth: 1,
    borderColor: 'rgba(1,1,1,0.08)',
    borderRadius: 10,
    marginTop: 180,
    padding: 20,
  },
  textNameCard: {
    fontWeight: 'bold', 
    fontSize: 16, 
  },
  textDetail: {
    color: 'rgba(46, 49, 49, 0.9)'
  },
  viewImageCard: {
    elevation: 7, 
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 2 
    },
    shadowOpacity: 0.8,
    shadowRadius: 50, 
    backgroundColor: 'rgba(255, 255, 255, 1)', 
    borderRadius: 10
  },
  imageCard: {
    height: 100, 
    width: 100, 
    borderRadius: 10
  }
})