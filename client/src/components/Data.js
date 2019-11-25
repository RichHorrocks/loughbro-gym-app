import React, { useContext, useEffect } from 'react';
import Spinner from './layout/Spinner';
import GymContext from '../context/gym/gymContext';

const Data = () => {
  const gymContext = useContext(GymContext);
  const { getCurrent, current, loading } = gymContext;

  useEffect(() => {
    getCurrent();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }

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

  return (
    <div className="container">
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
                  {Math.round(hPercent)}
                  <span id="percent">%</span>
                </div>
              </div>
              <div className="col">
                <div className="numberCircle">30</div>
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
                  {Math.round(pPercent)}
                  <span id="percent">%</span>
                </div>
              </div>
              <div className="col">
                <div className="numberCircle">30</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
