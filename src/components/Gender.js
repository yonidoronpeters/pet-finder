import React from 'react';

const Gender = ({ pet }) => (
  <div className="gender">
    <h3>Gender</h3>
    <input type="radio" id={`${pet}-both`} name={`${pet}gender`} value="both" defaultChecked={true}/>
    <label htmlFor={`${pet}-both`}>Both</label>
    <input type="radio" id={`${pet}-female`} name={`${pet}gender`} value="female"/>
    <label htmlFor={`${pet}-female`}>Female</label>
    <input type="radio" id={`${pet}-male`} name={`${pet}gender`} value="male"/>
    <label htmlFor={`${pet}-male`}>Male</label>
  </div>
);

export default Gender;
