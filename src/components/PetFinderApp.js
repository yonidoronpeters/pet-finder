import React from 'react';
import ContactInfo from './ContactInfo';
import Pet from './Pet';
import ConfirmationModal from './ConfirmationModal';
import ErrorModal from './ErrorModal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default class PetFinderApp extends React.Component {
  state = {
    errors: [],
    subscription: undefined
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    const dogs = this.getDogs(e);
    const cats = this.getCatOptions(e);
    const phoneError = this.validatePhoneNumber(e);
    const optionSelectError = !cats && !dogs && 'You must select at least 1 option';
    this.setState(() => ({
        errors: [phoneError, optionSelectError].filter(Boolean),
        subscription: {
          dogs,
          cats,
          contact: { phone: e.target.elements.phone.value }
        }
      }),
      this.handleAddNotification);
  };

  getDogs(e) {
    if (e.target.elements.dogs.checked) {
      const gender = e.target.elements.doggender.value;
      const ages = this.getCheckboxValues(['dog-young', 'dog-adolescent', 'dog-adult', 'dog-senior']);
      const dogBreeds = e.target.elements.dogbreed.value.trim();
      return {
        gender,
        ages,
        breeds: dogBreeds.split(',').map(dog => dog.trim()).filter(Boolean)
      };
    }
  }

  getCatOptions(e) {
    if (e.target.elements.cats.checked) {
      const gender = e.target.elements.catgender.value;
      const ages = this.getCheckboxValues(['cat-young', 'cat-adolescent', 'cat-adult', 'cat-senior']);
      const hair = this.getCheckboxValues(['short', 'medium', 'long']);
      const catBreeds = e.target.elements.catbreed.value.trim();
      return {
        gender,
        ages,
        hair,
        breeds: catBreeds.split(',').map(cat => cat.trim()).filter(Boolean)
      };
    }
  }

  getCheckboxValues(values) {
    const ages = [];
    values.forEach(value => {
      if (document.querySelector(`input[value="${value}"]`).checked) {
        ages.push(value);
      }
    });
    return ages;
  }

  validatePhoneNumber = (e) => {
    const phone = e.target.elements.phone.value;
    const phoneRegEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phone) {
      return 'You must provide a phone number';
    }
    if (!phone.match(phoneRegEx)) {
      return `Invalid phone number: ${phone}`;
    }
  };

  handleAddNotification = () => {
    if (!this.state.errors.length) {
      console.log(this.state.subscription);
    } else {
      console.log(`errors: ${this.state.errors}`);
      this.setState(() => ({
        subscription: undefined
      }));
    }
  };

  handleAnimalSelected = (e) => {
    const animal = e.target.name;
    const currentVal = document.getElementById(animal).hidden;
    document.getElementById(animal).hidden = !currentVal;
  };

  handleCloseModal = () => {
    this.setState(() => ({
      subscription: undefined,
      errors: []
    }));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Pet Finder</h1>
          <h2>Notify me for:</h2>
          <form className="add-option" onSubmit={this.handleSubmitForm}>
            <Grid container spacing={5}>
              <Grid item xs>
                <Pet type="cat" handleAnimalSelected={this.handleAnimalSelected}/>
              </Grid>
              <Grid item xs>
                <Pet type="dog" handleAnimalSelected={this.handleAnimalSelected}/>
              </Grid>
            </Grid>
            <ContactInfo/>
            <Button variant="contained" type="submit">Submit</Button>
          </form>
          <ConfirmationModal
            subscription={this.state.subscription}
            handleCloseModal={this.handleCloseModal}
          />
          <ErrorModal
            errors={this.state.errors}
            handleCloseModal={this.handleCloseModal}
          />
        </header>
      </div>
    );
  }
}
