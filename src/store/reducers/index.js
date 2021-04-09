const initialState = {
  data : [],
  weather: null,
  searched: null
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'SET_DATA':
      return {...state, data: state.data.concat(action.payload.newData)}
    case 'SET_WEATHER':
      return {...state, weather: action.payload.weather}    
    case 'SET_SEARCHED':
      return {...state, searched: action.payload.searched}    
    default:
    return state
  }
}