import React, { useEffect, useState } from 'react';
import { ScrapeProvider } from './ScrapeContext';

const useScrapes = () => {
  const [scrapes, setScrapes] = useState({});

  const getData = async () => {
    console.log('Getting data...');
    const res = await fetch('http://localhost:5000');
    const data = await res.json();
    console.log('GET: ', data);
    setScrapes(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return { scrapes, getData };
};

const Page = ({ children }) => {
  const hookInfo = useScrapes();
  return (
    <ScrapeProvider value={hookInfo}>
      <div className="page">{children}</div>
    </ScrapeProvider>
  );
};

export default Page;
