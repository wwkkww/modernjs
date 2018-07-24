//create some array
const num1 = [44,55,67,12,6,38,140];
const num2 = new Array(22,55,37,2,86,73);
const fruit = ['Apple','Orange','Banana','Pear'];
const mixed = [22, 'Hello','true', undefined, null, {a:1,b:5}, new Date()];

let val;

// Get array length
val = num1.length;
//check if is array
val = Array.isArray(num1);
//Get single value
val = num1[2];
val = num2[0];
//Insert into array
num1[4] = 88;
//Find index of value
val = num1.indexOf(88);

// //MUTATING ARRAY
// //Add on to end
// num1.push(333);
// //Add on to front
// num1.unshift(99);
// //Take off frm end
// num1.pop();
// //Take off frm front
// num1.shift();
// //Splice value
// num1.splice(1,3);
// //Reverse
// num1.reverse();

//Concatenate array
val = num1.concat(num2);

//Sorting Array
val = fruit.sort();
// val = num1.sort()

// //Use compare function
// val = num1.sort(function(x, y){
//   return x - y;
// });

// //Reverse sort
// val = num1.sort(function(x, y){
//   return y - x;
// });

//Find
function under60(num){
  return num<60;
}

val= num1.find(under60);

console.log(num1);
console.log(val);