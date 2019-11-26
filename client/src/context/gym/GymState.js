import React, { useReducer } from 'react';
import axios from 'axios';
import GymContext from './gymContext';
import GymReducer from './gymReducer';
import {
  GET_DATA_CURRENT,
  GET_DATA_TODAY,
  GET_DATA_YESTERDAY,
  GET_DATA_WEEK,
  SET_LOADING
} from '../types';

const GymState = props => {
  const initialState = {
    current: [],
    today: {},
    yesterday: {},
    week: [],
    loading: true
  };

  const [state, dispatch] = useReducer(GymReducer, initialState);

  // Get the current, live counts for the gym.
  const getCurrent = async () => {
    setLoading();
    console.log('GET Current data...');
    const res = await axios.get('http://localhost:5000/data');
    console.log('GET Current: ', res.data);

    dispatch({
      type: GET_DATA_CURRENT,
      payload: res.data
    });
  };

  const getToday = async () => {
    setLoading();
    setTimeout(async function() {
      console.log('GET Today data...');
      const res = await axios.get('http://localhost:5000/today');
      console.log('GET Today: ', res.data);

      dispatch({
        type: GET_DATA_TODAY,
        payload: res.data
      });
    }, 1000);
  };

  const getYesterday = async () => {
    setLoading();
    setTimeout(async function() {
      console.log('GET Yesterday data...');
      const res = await axios.get('http://localhost:5000/yesterday');
      console.log('GET Yesterday: ', res.data);

      dispatch({
        type: GET_DATA_YESTERDAY,
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
        today: state.today,
        yesterday: state.yesterday,
        loading: state.loading,
        getCurrent,
        getToday,
        getYesterday,
        setLoading
      }}
    >
      {props.children}
    </GymContext.Provider>
  );
};

export default GymState;
