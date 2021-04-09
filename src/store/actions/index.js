import axios from 'axios'

const baseUrl = 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser'
export const setData = (param) => {
  return async dispatch => {
    await axios({
      method: 'GET',
      url: baseUrl,
      headers: {
        'x-rapidapi-key': 'aa027fee85msh21863e5331156dbp183012jsnd3aa3267424e',
        'x-rapidapi-host': 'edamam-food-and-grocery-database.p.rapidapi.com',
        'useQueryString': true
      },
      params:{
        'ingr': param
      }
    })
    .then(({data})=> {
      dispatch({
        type: 'SET_DATA',
        payload: {
          newData: data
        }
      })
    })
    .catch(err => {
      console.log('error set data',err)
    })
  }
}

export const getData = ()=> {
  let list =  [
    {
      name: 'Spinach Leaf',
      param: 'spinach leaf',
      color: 'green'
    },
    {
      name: 'tomato',
      param: 'spinach leaf',
      color: 'red'
    },
    {
      name: 'BeetRoot',
      param: 'beetroot',
      color: 'pink'
    },
    {
      name: 'EggPlant',
      param: 'eggplant',
      color: 'purple'
    }
  ]

  list.map(item=> {
    return dispatch => {
      setData(item.param)
    }
  })
}

export const getWeather = (position) => {
  return async dispatch => {
    await axios
    .get(
      `https://api.weatherapi.com/v1/current.json?key=e72af49065b34cb9a04213916202309&q=${position.latitude},${position.longitude}`
    )
    .then(({ data }) => {
      dispatch({
        type: 'SET_WEATHER',
        payload: {
          weather: data
        }
      })
    })
    .catch(err => {
      console.log('error set data',err)
    })
  }
}

export const setSearched = (param) => {
  return async dispatch => {
    await axios({
      method: 'GET',
      url: baseUrl,
      headers: {
        'x-rapidapi-key': 'aa027fee85msh21863e5331156dbp183012jsnd3aa3267424e',
        'x-rapidapi-host': 'edamam-food-and-grocery-database.p.rapidapi.com',
        'useQueryString': true
      },
      params:{
        'ingr': param
      }
    })
    .then(({data})=> {
      dispatch({
        type: 'SET_SEARCHED',
        payload: {
          searched: data
        }
      })
    })
    .catch(err => {
      console.log('error set data',err)
    })
  }
}

export const setSearchedNull = () =>{
  return dispatch => {
    dispatch({
      type: 'SET_SEARCHED',
      payload: {
        searched: null
      }
    })
  }
}