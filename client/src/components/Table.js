import React from 'react';

const Table = ({ scrapes }) => {
  let table;

  if (scrapes === null) {
    table = <h3>Loading</h3>;
  } else {
    table = (
      <table>
        <thead>
          <tr>
            <td>Time</td>
            <td>Count</td>
          </tr>
        </thead>
        <tbody>
          {scrapes.map(scrape => (
            <tr key={scrape.date}>
              <td>{scrape.count}</td>
              <td>{scrape.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return <h3>Loading</h3>;
};

export default Table;
