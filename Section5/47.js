//USING Object.create (ES5) not common

//Create prototype method
const personPrototypes = {
  greeting: function() {
    return `Hello there ${this.firstName} ${this.lastName}`;
  },

  getsMarried: function(newLastName) {
    this.lastName = newLastName;
  }
}

const mary = Object.create(personPrototypes);
mary.firstName = 'Mary';
mary.lastName = 'Jane';
mary.age = 30;

mary.getsMarried('Tom');

// console.log(mary);

const brad = Object.create(personPrototypes, {
  firstName: {value : 'Brad'},
  lastName : {value : 'Wong'},
  age : {value: 32}
});


console.log(brad);
console.log(brad.greeting());
