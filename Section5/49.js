//subclass

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  greeting() {
    return `Hello there ${this.firstName} ${this.lastName}`;
  }
}


//subclass of person 
class Customer extends Person {
  constructor(firstName, lastName, phone, membership) {

    //call parent class constructor using SUPER
    super(firstName, lastName);

    this.phone = phone;
    this.membership = membership;
  }

  static getMembershipCost(){
    return 5000;
  }
};

const john = new Customer('John', 'Woo', '123-345-9999', 'Premium');
console.log(john);


console.log(john.greeting());

//ERROR static method must use actual class name
// console.log(john.getMembershipCost());

console.log(Customer.getMembershipCost());