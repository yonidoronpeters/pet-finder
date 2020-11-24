import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

const Breed = ({ pet }) => (
  <div className="breed">
    <div className="hair" hidden={pet !== 'cat'}><FormControl component="fieldset">
      <FormLabel component="legend">Fur Length</FormLabel>
      <FormGroup aria-label="cat-hair" name="cat-hair">
        <FormControlLabel value="short" control={<Checkbox/>} label="Short hair"/>
        <FormControlLabel value="medium" control={<Checkbox/>} label="Medium hair"/>
        <FormControlLabel value="long" control={<Checkbox/>} label="Long hair"/>
      </FormGroup>
    </FormControl>
    </div>
    <TextField name={`${pet}breed`} id="standard-full-width" label="Breeds"/>
    <FormHelperText>Enter {pet} breeds separated by commas</FormHelperText>
    <FormHelperText>Leave empty for all breeds</FormHelperText>
  </div>
);

export default Breed;
