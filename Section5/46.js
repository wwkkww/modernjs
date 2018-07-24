//PROTOTYPE INHERITANCE

//Person constructor
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;

}

//Greeting
Person.prototype.greeting = function() {
  return `Hello there ${this.firstName} ${this.lastName}`;
}

// const person1 = new Person('Ken', 'Lai');

// console.log(person1);

//Customer constructor
function Customer(firstName, lastName, phone, membership) {
  Person.call(this, firstName, lastName);

  this.phone = phone;
  this.membership = membership;
}


//Inherit the Person prototype methods
Customer.prototype = Object.create(Person.prototype);

//Make customer.prototype return customer constructor
Customer.prototype.constructor = Customer;

//Customer greeting
Customer.prototype.greeting = function() {
  return `Hello there ${this.firstName} ${this.lastName}, welcome to our company`;

}

//Create customer
const customer1 = new Customer('Tom', 'Smith', '555-555-5555', 'Premium');

console.log(customer1);

console.log(customer1.greeting());
