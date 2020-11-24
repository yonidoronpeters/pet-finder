import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';

const Age = ({ pet }) => (
  <div className="age">
    <FormControl component="fieldset">
      <FormLabel component="legend">Age</FormLabel>
      <FormGroup aria-label="gender" name={`${pet}age`}>
        <FormControlLabel value={`${pet}-young`} control={<Checkbox/>} label="Less than a year"/>
        <FormControlLabel value={`${pet}-adolescent`} control={<Checkbox/>} label="1-2 years"/>
        <FormControlLabel value={`${pet}-adult`} control={<Checkbox/>} label="3-6 years"/>
        <FormControlLabel value={`${pet}-senior`} control={<Checkbox/>} label="7+ years"/>
      </FormGroup>
    </FormControl>
  </div>
);

export default Age;
