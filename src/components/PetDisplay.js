import React from 'react';

const PetDisplay = ({ animal, type }) => (
  <div>
    <h3>{type}</h3>
    <p>Gender: {animal.gender}</p>
    <p>Age: {!animal.ages.length ? 'All' : animal.ages.map(age => <li key={age}>{age}</li>)}</p>
    <p>Breeds: {!animal.breeds.length ? 'All' : animal.breeds.map(breed => <li
      key={breed}>{breed}</li>)}</p>
    {animal.hair && <p>Hair: {!animal.hair.length ? 'All' : animal.hair.map(hair => <li key={hair}>{hair}</li>)}</p>}
  </div>
);

export default PetDisplay;
