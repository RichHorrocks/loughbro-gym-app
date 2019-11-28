import React, { useContext, useEffect } from 'react';
import { format } from 'date-fns';
import CountUp from 'react-countup';
import Spinner from './layout/Spinner';
import Chart from './Chart';
import GymContext from '../context/gym/gymContext';

const Data = () => {
  const gymContext = useContext(GymContext);
  const {
    getCurrent,
    getToday,
    getYesterday,
    current,
    today,
    yesterday,
    loading
  } = gymContext;

  useEffect(() => {
    getCurrent();
    getToday();
    getYesterday();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const combineData = (today, yesterday) => {
    const combinedDataArray = [];

    // For each entry in today's data, find the data from yesterday for the
    // same time.
    today.forEach(todayItem => {
      // Create a date object.
      const tDate = new Date(todayItem.date);
      let yesterdayPercent = null;

      // Find the count from the same time yesterday.
      for (let i = 0; i < yesterday.length; i++) {
        const yDate = new Date(yesterday[i].date);

        if (
          tDate.getHours() === yDate.getHours() &&
          tDate.getMinutes() === yDate.getMinutes()
        ) {
          yesterdayPercent = Math.round((yesterday[i].count / 180) * 100);
        }
      }

      // Create a new data object.
      const newData = {
        time: format(new Date(todayItem.date), 'HH:mm'),
        todayPercent: Math.round((todayItem.count / 180) * 100),
        yesterdayPercent: yesterdayPercent
      };
      console.log(newData);
      combinedDataArray.push(newData);
    });

    return combinedDataArray;
  };

  const getColour = value => {
    const hue = ((1 - value) * 120).toString(10);
    return ['hsl(', hue, ',100%,50%)'].join('');
  };

  // Get the current value for Holywell.
  const hSwipes = current[0]['holywell'];
  const hPercent = (hSwipes / 180) * 100;
  const hColour = getColour(hPercent / 100);

  // Get the current value for Powerbase.
  const pSwipes = current[1]['powerbase'];
  const pPercent = (pSwipes / 180) * 100;
  const pColour = getColour(pPercent / 100);
  const data = combineData(today['holywell'], yesterday['holywell']);

  return (
    <div className="container">
      <h1 className="text-center">How busy is the gym?</h1>
      <div className="row">
        <div className="col">
          <div className="panel panel-blue">
            <h3 className="title">Holywell</h3>
            <div className="row">
              <div className="col">
                <div
                  className="numberCircle"
                  style={{ backgroundColor: hColour }}
                >
                  <CountUp end={Math.round(hPercent)} />
                  <span id="percent">%</span>
                </div>
              </div>
              <div className="col">
                <Chart data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="panel panel-blue">
            <h3 className="title">Powerbase</h3>
            <div className="row">
              <div className="col">
                <div
                  className="numberCircle"
                  style={{ backgroundColor: pColour }}
                >
                  <CountUp end={Math.round(pPercent)} />
                  <span id="percent">%</span>
                </div>
              </div>
              <div className="col">
                <Chart data={yesterday['powerbase']} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
