import React from 'react';
import CountUp from 'react-countup';

const Circle = ({ open, swipes, capacity }) => {
  let output;

  if (open) {
    const getColour = value => {
      const hue = ((1 - value) * 120).toString(10);
      return ['hsl(', hue, ',100%,50%)'].join('');
    };

    const percent = (swipes / capacity) * 100;
    const colour = getColour(percent / 100);

    output = (
      <div className="numberCircle" style={{ backgroundColor: colour }}>
        <CountUp end={Math.round(percent)} />
        <span className="percent">%</span>
      </div>
    );
  } else {
    output = (
      <div className="numberCircle" style={{ backgroundColor: 'grey' }}>
        Closed
        <span className="percent">%</span>
      </div>
    );
  }

  return output;
};

export default Circle;
