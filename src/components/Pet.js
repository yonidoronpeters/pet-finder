import React from 'react';
import Gender from './Gender';
import Age from './Age';
import Breed from './Breed';
import pluralize from 'pluralize';

const Pet = ({ type, handleAnimalSelected }) => (
  <div className="pet">
    <input type="checkbox" id={pluralize(type)} name={type} onChange={handleAnimalSelected}/>
    <label htmlFor={pluralize(type)}>
      {pluralize(type)}
    </label>
    <div id={type} hidden={true}>
      <Gender pet={type}/>
      <Age pet={type}/>
      <Breed pet={type}/>
    </div>
  </div>
);

export default Pet;
