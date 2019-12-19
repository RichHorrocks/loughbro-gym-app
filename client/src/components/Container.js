import React from 'react';
import Chart from './Chart';
import Circle from './Circle';
import { format } from 'date-fns';

const Container = ({ title, capacity, swipes, data, open }) => {
  return (
    <div className="panel panel-blue">
      <h3 className="title">{title}</h3>
      <span className="capacity"> Capacity: {capacity}</span>
      <div className="row">
        <div className="col-md-4">
          <Circle open={open} swipes={swipes} capacity={capacity} />
          <p className="text-center updated">
            Updated at {format(new Date(), 'HH:mm:ss')}
          </p>
        </div>
        <div className="col-md-8">
          <Chart data={data} />
        </div>
      </div>
    </div>
  );
};

export default Container;
