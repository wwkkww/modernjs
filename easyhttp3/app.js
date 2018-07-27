const http = new EasyHTTP;



// Get Users
// http.get('https://jsonplaceholder.typicode.com/users')
// .then(function(data) {
//   return console.log(data);
// })
// .catch(function(error) {
//   console.log(error);
// })

//Shorter version
// http.get('https://jsonplaceholder.typicode.com/users')
// .then(data => console.log(data))
// .catch(error => console.log(error));


//Create Data the Post it
const data = {
  name: 'Kevin WONG',
  username: '55556fhhj',
  email: 'wkw@123.com'
};


//Create User
// http.post('https://jsonplaceholder.typicode.com/users', data)
// .then(function(data) {
//   return console.log(data);
// })
// .catch(function(error) {
//   return console.log(error);
// })


//Shorter version
// http.post('https://jsonplaceholder.typicode.com/users', data)
// .then(data => console.log(data))
// .catch(error => console.log(error));



// UPDATE USER
// http.put('https://jsonplaceholder.typicode.com/users/3', data)
// .then(data => console.log(data))
// .catch(error => console.log(error));


//DELETE post
// http.delete('https://jsonplaceholder.typicode.com/posts/1', function (err, response) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(response);
//   }
// });

//DELETE user
http.delete('https://jsonplaceholder.typicode.com/users/2')
.then(data => console.log(data))
.catch(error => console.log(error));