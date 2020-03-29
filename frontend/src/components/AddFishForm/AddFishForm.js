import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './AddFishForm.scss';

const AddFishForm = props => {
  const [fish, setFish] = useState({
    name: '',
    price: 0,
    status: 'available',
    desc: '',
    image: ''
  });

  const onChange = name => event => {
    let newFish = { ...fish };
    newFish[name] = event.target.value;
    setFish(newFish);
  };

  function createFish(event) {
    event.preventDefault();
    props.addFish(fish);
    setFish({
      name: '',
      price: 0,
      status: 'available',
      desc: '',
      image: ''
    });
  }

  return (
    <form className='fish-add' onSubmit={createFish}>
      <input name='name' value={fish.name} onChange={onChange('name')} type='text' placeholder='Name' />
      <input name='price' value={fish.price} onChange={onChange('price')} type='text' placeholder='Price' />
      <select name='status' value={fish.status} onChange={onChange('status')}>
        <option value='available'>available</option>
        <option value='unavailable'>unavailable</option>
      </select>
      <textarea name='desc' value={fish.desc} onChange={onChange('desc')} placeholder='Desc' />
      <input name='image' value={fish.image} onChange={onChange('image')} type='text' placeholder='Image' />
      <button type='submit'>+ Add Fish</button>
    </form>
  );
};

AddFishForm.propTypes = {
  addFish: PropTypes.func
};

export default AddFishForm;
