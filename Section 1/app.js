const person = {
  firstName : 'Willian',
  lastName : 'Song',
  age: 36,
  email: 'abs@email.com',
  hobbies: ['Music', 'Sports'],
  address: {
    city: 'Miami',
    state:'KL',
  },
  getBirthYear: function(){
    return 2018 - this.age;
  }

};

let val;

val = person;
//Get specific value
val = person.firstName;
val = person['lastName'];
val = person.age;
val = person.hobbies[0];
val = person.address.city;
val = person.address['state'];
val = person.getBirthYear()

console.log(val);

const people = [
  {name:'John', age: 28},
  {name:'Mike', age: 38},
  {name:'Nancy', age: 18},
];

for(let i=0; i<people.length; i++){
  // console.log('Name: ' + people[i].name + ', Age: ' + people[i].age);
  console.log(`Name: ${people[i].name}, Age: ${people[i].age}`);
}