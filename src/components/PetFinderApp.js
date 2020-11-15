import React from 'react';

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
      const gender = e.target.elements.dogGender.value;
      const ages = this.getCheckboxValues(['puppy', 'adolescent', 'adult', 'senior']);
      const dogBreeds = e.target.elements.dogBreed.value.trim();
      return {
        gender,
        ages,
        breeds: dogBreeds.split(',').map(dog => dog.trim()).filter(Boolean)
      };
    }
  }

  getCatOptions(e) {
    if (e.target.elements.cats.checked) {
      const gender = e.target.elements.catGender.value;
      const ages = this.getCheckboxValues(['kitten', 'junior', 'prime', 'mature']);
      const hair = this.getCheckboxValues(['short', 'medium', 'long']);
      const catBreeds = e.target.elements.catBreed.value.trim();
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
                {/*gender radio buttons*/}
                <div id="cat-gender">
                  <h3>Gender</h3>
                  <input type="radio" id="cat-both" name="catGender" value="both" defaultChecked={true}/>
                  <label htmlFor="cat-both">Both</label>
                  <input type="radio" id="cat-female" name="catGender" value="female"/>
                  <label htmlFor="cat-female">Female</label>
                  <input type="radio" id="cat-male" name="catGender" value="male"/>
                  <label htmlFor="cat-male">Male</label>
                </div>
                {/*age checkbox*/}
                <div id="cat-age">
                  <h3>Age</h3>
                  <input type="checkbox" id="cat-kitten" name="catAge" value="kitten"/>
                  <label htmlFor="cat-kitten">Less than a year</label><br/>
                  <input type="checkbox" id="cat-junior" name="catAge" value="junior"/>
                  <label htmlFor="cat-junior">1-2 years</label><br/>
                  <input type="checkbox" id="cat-prime" name="catAge" value="prime"/>
                  <label htmlFor="cat-prime">3-6 years</label><br/>
                  <input type="checkbox" id="cat-mature" name="catAge" value="mature"/>
                  <label htmlFor="cat-mature">7+ years</label>
                </div>
                {/*breed*/}
                <div id="cat-breed">
                  <h3>Breed</h3>
                  <input type="checkbox" id="cat-short" name="catHair" value="short"/>
                  <label htmlFor="cat-short">Short hair</label><br/>
                  <input type="checkbox" id="cat-medium" name="catHair" value="medium"/>
                  <label htmlFor="cat-medium">Medium hair</label><br/>
                  <input type="checkbox" id="cat-long" name="catHair" value="long"/>
                  <label htmlFor="cat-long">Long hair</label>
                </div>
                <input className="add-option__input" placeholder="cat breeds separated by commas" type="text"
                       name="catBreed"/>
              </div>
              <input type="checkbox" id="option2" name="dogs" onChange={this.handleAnimalSelected}/>
              <label htmlFor="option2">Dogs</label>
              <div id="dogs" hidden={true}>
                {/*gender radio buttons*/}
                <div id="dog-gender">
                  <h3>Gender</h3>
                  <input type="radio" id="dog-both" name="dogGender" value="both" defaultChecked={true}/>
                  <label htmlFor="dog-both">Both</label>
                  <input type="radio" id="dog-female" name="dogGender" value="female"/>
                  <label htmlFor="dog-female">Female</label>
                  <input type="radio" id="dog-male" name="dogGender" value="male"/>
                  <label htmlFor="dog-male">Male</label>
                </div>
                {/*age*/}
                <div id="dog-age">
                  <h3>Age</h3>
                  <input type="checkbox" id="dog-puppy" name="dogAge" value="puppy"/>
                  <label htmlFor="dog-puppy">Less than a year</label><br/>
                  <input type="checkbox" id="dog-adolescent" name="dogAge" value="adolescent"/>
                  <label htmlFor="dog-adolescent">1-2 years</label><br/>
                  <input type="checkbox" id="dog-adult" name="dogAge" value="adult"/>
                  <label htmlFor="dog-adult">3-6 years</label><br/>
                  <input type="checkbox" id="dog-senior" name="dogAge" value="senior"/>
                  <label htmlFor="dog-senior">7+ years</label>
                </div>
                {/*breed*/}
                <input className="add-option__input" placeholder="dog breeds separated by commas" type="text"
                       name="dogBreed"/>
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
