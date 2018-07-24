//Person constructor
function Person(name, dob) {
  this.name = name;
  // this.age = age;
  this.birthday = new Date(dob);
  this.calculateAge = function () {
    var ageDiff = Date.now() - this.birthday.getTime(); //2018-(1970-12) = 2006 in milliseconds
    //console.log(`AgeDiff: ${ageDiff}`);

    var ageDate = new Date(ageDiff); //new Date return valid formatted date from milliseconds 

    //console.log(`AgeDate: ${ageDate}`);
    return Math.abs(ageDate.getUTCFullYear() - 1970); //get the year - 1970
  }
  
  // return current instance of function scope
  // console.log(this);
}

//get windows object in Global scope
// console.log(this);

// const brad = new Person('Brad', 36);
// const john = new Person('John', 25);

// console.log(john.age);

const brad = new Person('brad', '9-7-1982');

console.log(brad.calculateAge());
