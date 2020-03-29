import React, { useEffect, useState } from 'react';
import sampleFishes from '../../sample-fishes';
import Fish from '../Fish/Fish';
import './Home.scss';

const Home = () => {
  const [fishes, setFishes] = useState({});

  useEffect(() => {
    setFishes(sampleFishes);
  }, [fishes]);

  return (
    <div className='menu'>
      <h1>Fishes</h1>
      <ul>
        {Object.keys(fishes).map(key => (
          <Fish key={key} index={key} details={fishes[key]} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
