import React from 'react';
import TextField from '@material-ui/core/TextField';

const ContactInfo = () => (
  <div className="clear">
    <br/>
    <TextField name="phone" id="outlined-required" label="Phone" variant="outlined" required/>
    <br/><br/>
  </div>
);

export default ContactInfo;
