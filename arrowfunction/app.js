
// const sayHello = function() {
//   console.log('Hello');
// }

//One line function does not need braces
// const sayHello = () => console.log('Hello');

// sayHello();

//-----------------------------------------------------

// const sayHello = function() {
//   return 'Hello';
// }

//One line return function
// const sayHello = () => 'Hello';

//Return object must wrap wtih parenthesis () else undefined
//const sayHello = () => ({msg: 'Hello'});

// console.log(sayHello());

//------------------------------------------------------

//Single param does not need parenthesis
// const sayHello = name => console.log(`Hello ${name}!`);

//multiple params need parenthesis
// const sayHello = (firstName, lastName) => console.log(`Hello ${firstName} ${lastName}!`);

// sayHello('Kevin', 'Wong');

//----------------------------------------------------------

const users = ['Nathan', 'John', 'Brandon'];
 
//ver 1
// const nameLengths = users.map(function(name) {
//   return name.length;
// });

//ver 2
// const nameLengths = users.map((name) => {
//   return name.length;
// }

//ver 3 shortest
const nameLengths = users.map(name => name.length);

console.log(nameLengths);