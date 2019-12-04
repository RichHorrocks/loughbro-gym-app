import {
  GET_DATA_CURRENT,
  GET_DATA_TODAY,
  GET_DATA_YESTERDAY,
  GET_DATA_WEEK,
  SET_LOADING
} from '../types.js';

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_DATA_CURRENT:
      return {
        ...state,
        current: action.payload.current,
        open: action.payload.open
      };
    case GET_DATA_TODAY:
      return {
        ...state,
        today: action.payload
      };
    case GET_DATA_YESTERDAY:
      return {
        ...state,
        yesterday: action.payload,
        loading: false
      };
    case GET_DATA_WEEK:
      return {
        ...state,
        week: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
