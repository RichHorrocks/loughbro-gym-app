import React, { useContext, useEffect } from 'react';
import { format } from 'date-fns';
import roundToNearestMinutes from 'date-fns/roundToNearestMinutes';
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
    open,
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
        time: format(
          roundToNearestMinutes(new Date(todayItem.date), { nearestTo: 10 }),
          'HH:mm'
        ),
        todayPercent: Math.round((todayItem.count / capacity) * 100),
        yesterdayPercent: null
      };
      combinedDataArray.push(newData);
    });

    yesterday.forEach(yesterdayItem => {
      const yesterdayTime = format(
        roundToNearestMinutes(new Date(yesterdayItem.date), { nearestTo: 10 }),
        'HH:mm'
      );
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
      <h1 className="text-center">
        How busy is the gym?
        <a
          href="https://github.com/RichHorrocks/loughbro-gym-app"
          className="github"
          title="Make me better!"
        >
          <i className="fab fa-github fa-xs"></i>
        </a>
      </h1>
      <Container
        title="Holywell"
        open={open}
        swipes={current[0]['holywell']}
        capacity={holywellCapacity}
        data={hData}
      />
      <Container
        title="Powerbase"
        open={open}
        swipes={current[1]['powerbase']}
        capacity={powerbaseCapacity}
        data={pData}
      />
    </div>
  );
};

export default Data;
