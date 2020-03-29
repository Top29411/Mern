import PropTypes from 'prop-types';
import React, { useState } from 'react';
import sampleFishes from '../sample-fishes';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

const Inventory = props => {
  const [fishes, setFishes] = useState({});

  const loadSampleFishes = () => {
    setFishes(sampleFishes);
  };

  return (
    <div className='inventory'>
      <h2>Inventory</h2>
      {Object.keys(fishes).map(key => (
        <EditFishForm
          fish={fishes[key]}
          key={key}
          index={key}
          updateFish={props.updateFish}
          deleteFish={props.deleteFish}
        />
      ))}
      <AddFishForm addFish={props.addFish} />
      <button onClick={loadSampleFishes}>Load sample fishes</button>
    </div>
  );
};

Inventory.propTypes = {
  fishes: PropTypes.object,
  updateFish: PropTypes.func,
  deleteFish: PropTypes.func,
  loadSampleFishes: PropTypes.func,
  addFish: PropTypes.func
};

export default Inventory;
