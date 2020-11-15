import React from 'react';
import Gender from './Gender';
import Age from './Age';
import Breed from './Breed';

export default class PetFinderApp extends React.Component {
  state = {
    errors: [],
    subscription: {}
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    const dogs = this.getDogs(e);
    const cats = this.getCatOptions(e);
    const phoneError = this.validatePhoneNumber(e);
    const optionSelectError = !cats && !dogs && 'You must select at least 1 option';
    this.setState(() => ({
        errors: [phoneError, optionSelectError].filter(Boolean),
        subscription: { dogs, cats }
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
      return `Bad phone number: ${phone}`;
    }
  };

  handleAddNotification = () => {
    if (!this.state.errors.length) {
      console.log(this.state.subscription);
    } else {
      console.log(`errors: ${this.state.errors}`);
      this.setState(() => ({
        errors: []
      }));
    }
  };

  handleAnimalSelected = (e) => {
    const animal = e.target.name;
    const currentVal = document.getElementById(animal).hidden;
    document.getElementById(animal).hidden = !currentVal;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Pet Finder</h1>
          <h2>Notify me for:</h2>
          <form className="add-option" onSubmit={this.handleSubmitForm}>
            <div className="petRow">
              <input type="checkbox" id="option1" name="cats" onChange={this.handleAnimalSelected}/>
              <label htmlFor="option1">Cats</label>
              <div id="cats" hidden={true}>
                <Gender pet="cat"/>
                <Age pet="cat"/>
                <Breed pet="cat"/>
              </div>
              <input type="checkbox" id="option2" name="dogs" onChange={this.handleAnimalSelected}/>
              <label htmlFor="option2">Dogs</label>
              <div id="dogs" hidden={true}>
                <Gender pet="dog"/>
                <Age pet="dog"/>
                <Breed pet="dog"/>
              </div>
            </div>
            <div className="clear">
              <label htmlFor="phone">Phone number: </label>
              <input className="add-option__input" placeholder="555-555-5555" type="tel" name="phone"/>
            </div>
            <button className="button">Submit</button>
          </form>
        </header>
      </div>
    );
  }
}
