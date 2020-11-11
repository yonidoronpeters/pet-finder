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
      const dogBreeds = e.target.elements.dogBreed.value.trim();
      return {
        gender,
        breeds: dogBreeds.split(',').map(dog => dog.trim()).filter(Boolean)
      };
    }
  }

  getCatOptions(e) {
    if (e.target.elements.cats.checked) {
      const gender = e.target.elements.catGender.value;
      const catBreeds = e.target.elements.catBreed.value.trim();
      return {
        gender,
        breeds: catBreeds.split(',').map(cat => cat.trim()).filter(Boolean)
      };
    }
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
          <p>
            Notify me for:
          </p>
          <form className="add-option" onSubmit={this.handleSubmitForm}>
            {/*checkbox*/}
            <input type="checkbox" id="option1" name="cats" onChange={this.handleAnimalSelected}/>
            <label htmlFor="option1"> Cats </label>
            <div id="cats" hidden={true}>
              {/*gender radio buttons*/}
              <p>
                <input type="radio" id="cat-both" name="catGender" value="both" defaultChecked={true}/>
                <label htmlFor="cat-both">Both</label>
                <input type="radio" id="cat-female" name="catGender" value="female"/>
                <label htmlFor="cat-female">Female</label>
                <input type="radio" id="cat-male" name="catGender" value="male"/>
                <label htmlFor="cat-male">Male</label>
              </p>
              {/*breed*/}
              <input className="add-option__input" placeholder="enter cat breeds separated by commas" type="text"
                     name="catBreed"/>
            </div>
            <p>
              <input type="checkbox" id="option2" name="dogs" onChange={this.handleAnimalSelected}/>
              <label htmlFor="option2"> Dogs </label>
              <div id="dogs" hidden={true}>
                {/*gender radio buttons*/}
                <p>
                  <input type="radio" id="dog-both" name="dogGender" value="both" defaultChecked={true}/>
                  <label htmlFor="dog-both">Both</label>
                  <input type="radio" id="dog-female" name="dogGender" value="female"/>
                  <label htmlFor="dog-female">Female</label>
                  <input type="radio" id="dog-male" name="dogGender" value="male"/>
                  <label htmlFor="dog-male">Male</label>
                </p>
                {/*breed*/}
                <input className="add-option__input" placeholder="enter dog breed separated by commas" type="text"
                       name="dogBreed"/>
              </div>
            </p>
            <p>
              <label htmlFor="phone">Phone number </label>
              <input className="add-option__input" placeholder="555-555-5555" type="tel" name="phone"/>
            </p>
            <button className="button">Submit</button>
          </form>
        </header>
      </div>
    );
  }
}
