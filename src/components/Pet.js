import React from 'react';
import Gender from './Gender';
import Age from './Age';
import Breed from './Breed';
import pluralize from 'pluralize';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

const Pet = ({ type, handleAnimalSelected }) => (
  <div className="pet">
    <FormGroup>
      <FormControlLabel
        control={<Checkbox onChange={handleAnimalSelected} htmlFor={pluralize(type)} id={pluralize(type)} name={type}/>}
        label={pluralize(type)}
      />
      <div id={type} hidden={true}>
        <Gender pet={type}/>
        <Age pet={type}/>
        <Breed pet={type}/>
      </div>
    </FormGroup>
  </div>
);

export default Pet;
