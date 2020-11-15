import React from 'react';

const ContactInfo = () => (
  <div className="clear">
    <label htmlFor="phone">Phone number: </label>
    <input className="add-option__input" placeholder="555-555-5555" type="tel" name="phone"/>
  </div>
)

export default ContactInfo;
