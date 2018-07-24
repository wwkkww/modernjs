//Object.prototype
//Person.prototype

//Person Constructor
function Person(firstName, lastName, dob) {
  this.firstName = firstName;
  this.lastName = lastName;
  // this.age = age;
  this.birthday = new Date(dob);
  // this.calculateAge = function () {
  //   var ageDiff = Date.now() - this.birthday.getTime(); //2018-(1970-12) = 2006 in milliseconds
  //   //console.log(`AgeDiff: ${ageDiff}`);

  //   var ageDate = new Date(ageDiff); //new Date return valid formatted date from milliseconds 

  //   //console.log(`AgeDate: ${ageDate}`);
  //   return Math.abs(ageDate.getUTCFullYear() - 1970); //get the year - 1970
  // }
}

//Calculate Age
Person.prototype.calculateAge = function() {
  var ageDiff = Date.now() - this.birthday.getTime(); //2018-(1970-12) = 2006 in milliseconds
    //console.log(`AgeDiff: ${ageDiff}`);

    var ageDate = new Date(ageDiff); //new Date return valid formatted date from milliseconds 

    //console.log(`AgeDate: ${ageDate}`);
    return Math.abs(ageDate.getUTCFullYear() - 1970); //get the year - 1970
}

//Get full name
Person.prototype.getFullName = function() {
return `${this.firstName} ${this.lastName}`;

}

// Gets Married
Person.prototype.getsMarried = function(newLastName) {
  this.lastName = newLastName;
}

  const john = new Person ('John', 'Doe', '8-12-80');
  const mary = new Person ('Marry', 'Jane', '30 sept 2000');

  console.log(mary);
  console.log(mary.getFullName());
  mary.getsMarried('Smith');
  console.log(mary.getFullName());
  
  //Part of its property = true
  console.log(mary.hasOwnProperty('lastName'));

  //Not part of its property = false
  console.log(mary.hasOwnProperty('getFullName'));