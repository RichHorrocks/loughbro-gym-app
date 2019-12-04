import React from 'react';
import Chart from './Chart';
import Circle from './Circle';
import { format } from 'date-fns';

const Container = ({ title, capacity, swipes, data, open }) => {
  return (
    <div className="row">
      <div className="col">
        <div className="panel panel-blue">
          <h3 className="title">{title}</h3>
          <span className="capacity"> Capacity: {capacity}</span>
          <div className="row">
            <div className="col">
              <Circle open={open} swipes={swipes} capacity={capacity} />
              <p className="text-center updated">
                Updated at {format(new Date(), 'HH:mm:ss')}
              </p>
            </div>
            <div className="col">
              <Chart data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
