import React from 'react';
import logo from '../logo.svg';

export default class PetFinderApp extends React.Component {
  state = {
    errors: [],
    subscription: {}
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    let dogs;
    if (e.target.elements.dogs.checked) {
      const dogBreeds = e.target.elements.dogBreed.value.trim();
      dogs = dogBreeds.split(',').map(dog => dog.trim()).filter(Boolean);
    }
    let cats;
    if (e.target.elements.cats.checked) {
      const catBreeds = e.target.elements.catBreed.value.trim();
      cats = catBreeds.split(',').map(cat => cat.trim()).filter(Boolean);
    }
    const phoneError = this.validatePhoneNumber(e);
    const optionSelectError = !cats && !dogs && 'You must select at least 1 option';
    this.setState(() => ({
        errors: [phoneError, optionSelectError].filter(Boolean),
        subscription: { dogs, cats }
      }),
      this.handleAddOption);
  };

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

  handleAddOption = () => {
    if (!this.state.errors.length) {
      console.log(this.state.subscription);
    } else {
      console.log(`errors: ${this.state.errors}`);
      this.setState(() => ({
        errors: []
      }));
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Pet Finder</h1>
          {/*<img src={logo} className="App-logo" alt="logo"/>*/}
          <p>
            Notify me for:
          </p>
          <form className="add-option" onSubmit={this.handleSubmitForm}>
            <p>
              <input type="checkbox" id="option1" name="cats"/>
              <label htmlFor="option1"> Cats </label>
              <input className="add-option__input" placeholder="enter cat breeds separated by commas" type="text"
                     name="catBreed"/>
            </p>
            <p>
              <input type="checkbox" id="option2" name="dogs"/>
              <label htmlFor="option2"> Dogs </label>
              <input className="add-option__input" placeholder="enter dog breed separated by commas" type="text"
                     name="dogBreed"/>
            </p>
            <p>
              <label htmlFor="phone"> Phone number </label>
              <input className="add-option__input" placeholder="555-555-5555" type="tel" name="phone"/>
            </p>
            <button className="button">Submit</button>
          </form>
        </header>
      </div>
    );
  }
}
