import React from 'react';

const Age = ({ pet }) => (
  <div className="age">
    <h3>Age</h3>
    <input type="checkbox" id={`${pet}-puppy`} name={`${pet}age`} value={`${pet}-young`}/>
    <label htmlFor={`${pet}-puppy`}>Less than a year</label><br/>
    <input type="checkbox" id={`${pet}-adolescent`} name={`${pet}age`} value={`${pet}-adolescent`}/>
    <label htmlFor={`${pet}-adolescent`}>1-2 years</label><br/>
    <input type="checkbox" id={`${pet}-adult`} name={`${pet}age`} value={`${pet}-adult`}/>
    <label htmlFor={`${pet}-adult`}>3-6 years</label><br/>
    <input type="checkbox" id={`${pet}-senior`} name={`${pet}age`} value={`${pet}-senior`}/>
    <label htmlFor={`${pet}-senior`}>7+ years</label>
  </div>
);

export default Age;
