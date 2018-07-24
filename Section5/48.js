//ES6 CLASSES
class Person {
  constructor(firstName, lastName, dob) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = new Date(dob);
  }

  greeting() {
    return `Hello there ${this.firstName} ${this.lastName}`;
  }

  calculateAge() {
    const diff = Date.now() - this.birthday.getTime();
    console.log(diff);
    const ageDate = new Date(diff);
    console.log(ageDate);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  getsMarried(newLastName) {
    this.lastName = newLastName
  }

  static addNumber(x, y) {
    return x + y;
  }
}

const mary = new Person('Mary', 'Williams', '1-6-1970');

mary.getsMarried('Adam');
console.log(mary);
console.log(mary.calculateAge());

//ERROR! Static method is not part of instance function
// console.log(mary.addNumber(1,2));

//use actual class name to use static method
console.log(Person.addNumber(2,5));