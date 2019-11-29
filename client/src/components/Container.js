import React from 'react';
import Chart from './Chart';
import Circle from './Circle';

const Container = ({ title, swipes, data }) => {
  return (
    <div className="row">
      <div className="col">
        <div className="panel panel-blue">
          <h3 className="title">{title}</h3>
          <div className="row">
            <div className="col">
              <Circle swipes={swipes} />
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
