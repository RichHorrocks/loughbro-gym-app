import React, { useContext } from 'react';
import { ScrapeContext } from './ScrapeContext';

import Table from './Table';

const Data = () => {
  const { scrapes } = useContext(ScrapeContext);
  console.log('DATA: ', scrapes[0]);

  return (
    <div>
      <div className="container">
        <h2>Holywell</h2>
      </div>

      <h2>PowerBase</h2>
    </div>
  );
};

export default Data;
