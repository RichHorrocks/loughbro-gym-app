import React, { useReducer } from 'react';
import axios from 'axios';
import GymContext from './gymContext';
import GymReducer from './gymReducer';
import {
  GET_DATA_CURRENT,
  GET_DATA_TODAY,
  GET_DATA_DAY,
  GET_DATA_WEEK,
  SET_LOADING
} from '../types';

const GymState = props => {
  const initialState = {
    current: [],
    today: [],
    day: [],
    week: [],
    loading: true
  };

  const [state, dispatch] = useReducer(GymReducer, initialState);

  // Get the current, live counts for the gym.
  const getCurrent = async () => {
    setLoading();
    setTimeout(async function() {
      console.log('GET Current data...');
      const res = await axios.get('http://localhost:5000');
      console.log('GET Current: ', res.data);

      dispatch({
        type: GET_DATA_CURRENT,
        payload: res.data
      });
    }, 1000);
  };

  // Set loading.
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GymContext.Provider
      value={{
        current: state.current,
        loading: state.loading,
        getCurrent,
        setLoading
      }}
    >
      {props.children}
    </GymContext.Provider>
  );
};

export default GymState;
