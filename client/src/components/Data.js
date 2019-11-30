import React, { useContext, useEffect } from 'react';
import { format } from 'date-fns';
import Spinner from './layout/Spinner';
import Container from './Container';
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

  const holywellCapacity = 180;
  const powerbaseCapacity = 160;

  useEffect(() => {
    getCurrent();
    getToday();
    getYesterday();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const combineData = (capacity, today, yesterday) => {
    const combinedDataArray = [];

    today.forEach(todayItem => {
      const newData = {
        time: format(new Date(todayItem.date), 'HH:mm'),
        todayPercent: Math.round((todayItem.count / capacity) * 100),
        yesterdayPercent: null
      };
      combinedDataArray.push(newData);
    });

    yesterday.forEach(yesterdayItem => {
      const yesterdayTime = format(new Date(yesterdayItem.date), 'HH:mm');
      const item = combinedDataArray.find(({ time }) => time === yesterdayTime);

      if (item) {
        item.yesterdayPercent = Math.round((yesterdayItem.count / 180) * 100);
      } else {
        combinedDataArray.push({
          time: yesterdayTime,
          todayPercent: null,
          yesterdayPercent: Math.round((yesterdayItem.count / 180) * 100)
        });
      }
    });

    // // For each entry in today's data, find the data from yesterday for the
    // // same time.
    // today.forEach(todayItem => {
    //   // Create a date object.
    //   const tDate = new Date(todayItem.date);
    //   let yesterdayPercent = null;
    //
    //   // Find the count from the same time yesterday.
    //   for (let i = 0; i < yesterday.length; i++) {
    //     const yDate = new Date(yesterday[i].date);
    //
    //     if (
    //       tDate.getHours() === yDate.getHours() &&
    //       tDate.getMinutes() === yDate.getMinutes()
    //     ) {
    //       yesterdayPercent = Math.round((yesterday[i].count / 180) * 100);
    //     }
    //   }
    //
    //   // Create a new data object.
    //   const newData = {
    //     time: format(new Date(todayItem.date), 'HH:mm'),
    //     todayPercent: Math.round((todayItem.count / 180) * 100),
    //     yesterdayPercent: yesterdayPercent
    //   };
    //   console.log(newData);
    //   combinedDataArray.push(newData);
    // });
    return combinedDataArray;
  };

  const hData = combineData(
    holywellCapacity,
    today['holywell'],
    yesterday['holywell']
  );
  const pData = combineData(
    powerbaseCapacity,
    today['powerbase'],
    yesterday['powerbase']
  );

  return (
    <div className="container">
      <h1 className="text-center">How busy is the gym?</h1>
      <Container
        title="Holywell"
        swipes={current[0]['holywell']}
        capacity={holywellCapacity}
        data={hData}
      />
      <Container
        title="Powerbase"
        swipes={current[1]['powerbase']}
        capacity={powerbaseCapacity}
        data={pData}
      />
    </div>
  );
};

export default Data;
