import React from 'react';

const Breed = ({ pet }) => (
  <div className="breed">
    <h3>Breed</h3>
    <div className="hair" hidden={pet !== 'cat'}>
      <input type="checkbox" id="cat-short" name="cat-hair" value="short"/>
      <label htmlFor="cat-short">Short hair</label><br/>
      <input type="checkbox" id="cat-medium" name="cat-hair" value="medium"/>
      <label htmlFor="cat-medium">Medium hair</label><br/>
      <input type="checkbox" id="cat-long" name="cat-hair" value="long"/>
      <label htmlFor="cat-long">Long hair</label><br/>
    </div>
    <input className="add-option__input" placeholder={`${pet} breeds separated by commas`} type="text"
           name={`${pet}breed`}/>
  </div>
);

export default Breed;
