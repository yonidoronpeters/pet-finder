import React, { useEffect, useState } from 'react';
import ContactInfo from './ContactInfo';
import Pet from './Pet';
import ConfirmationModal from './ConfirmationModal';
import ErrorModal from './ErrorModal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from "axios";

const ageOptions = ['young', 'adolescent', 'adult', 'senior'];
const hairOptions = ['short', 'medium', 'long'];

const PetFinderApp = () => {
  const [subscription, setSubscription] = useState(undefined);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    console.log(subscription);
    async function sendSubscription() {
      try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/subscriptions`, subscription);
        console.log(response.status);
      } catch (e) {
        console.log(e.message);
      }
    }

    if (subscription) {
      sendSubscription();
    }
  })

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const dogs = getDogs(e);
    const cats = getCatOptions(e);
    const phoneError = validatePhoneNumber(e);
    const optionSelectError = !cats && !dogs && 'You must select at least 1 option';
    setErrors([phoneError, optionSelectError].filter(Boolean));
    setSubscription({
      dogs,
      cats,
      contact: { phone: e.target.elements.phone.value }
    });
  };

  const getDogs = (e) => {
    if (e.target.elements.dogs.checked) {
      const pet = 'dog';
      const gender = e.target.elements.doggender.value;
      const ages = getCheckboxValues(ageOptions.map(age => `${pet}-` + age));
      const dogBreeds = e.target.elements.dogbreed.value.trim();
      return {
        gender,
        ages,
        breeds: dogBreeds.split(',').map(dog => dog.trim()).filter(Boolean)
      };
    }
  };

  const getCatOptions = (e) => {
    if (e.target.elements.cats.checked) {
      const pet = 'cat';
      const gender = e.target.elements.catgender.value;
      const ages = getCheckboxValues(ageOptions.map(age => (`${pet}-` + age)));
      const hair = getCheckboxValues(hairOptions);
      const catBreeds = e.target.elements.catbreed.value.trim();
      return {
        gender,
        ages,
        hair,
        breeds: catBreeds.split(',').map(cat => cat.trim()).filter(Boolean)
      };
    }
  };

  const getCheckboxValues = (values) => {
    const checked = [];
    values.forEach(value => {
      if (document.querySelector(`input[value="${value}"]`).checked) {
        checked.push(value);
      }
    });
    return checked;
  };

  const validatePhoneNumber = (e) => {
    const phone = e.target.elements.phone.value;
    const phoneRegEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phone) {
      return 'You must provide a phone number';
    }
    if (!phone.match(phoneRegEx)) {
      return `Invalid phone number: ${phone}`;
    }
  };

  const handleAnimalSelected = (e) => {
    const animal = e.target.name;
    const currentVal = document.getElementById(animal).hidden;
    document.getElementById(animal).hidden = !currentVal;
  };

  const handleCloseModal = () => {
    setErrors([]);
    setSubscription(undefined);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pet Finder</h1>
        <h2>Notify me for:</h2>
        <form className="add-option" onSubmit={handleSubmitForm}>
          <Grid container spacing={8}>
            <Grid item xs>
              <Pet type="cat" handleAnimalSelected={handleAnimalSelected}/>
            </Grid>
            <Grid item xs>
              <Pet type="dog" handleAnimalSelected={handleAnimalSelected}/>
            </Grid>
          </Grid>
          <ContactInfo/>
          <Button variant="contained" type="submit">Submit</Button>
        </form>
        <ConfirmationModal
          subscription={subscription}
          handleCloseModal={handleCloseModal}
        />
        <ErrorModal
          errors={errors}
          handleCloseModal={handleCloseModal}
        />
      </header>
    </div>
  );
};

export default PetFinderApp;
