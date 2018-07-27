document.getElementById('button1').addEventListener('click', getText);
document.getElementById('button2').addEventListener('click', getJson);
document.getElementById('button3').addEventListener('click', getExternal);

// function getText() {
//   fetch('test.txt')
//     .then(function (response) {
//       // console.log(response);
//       return response.text();
//     })
//     .then(function (data) {
//       console.log(data);
//       document.getElementById('output').innerHTML = `<h2>${data}</h2>`;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

//Arrow version
function getText() {
  fetch('test.txt')
    .then(response => response.text())
    .then(data => {
      document.getElementById('output').innerHTML = `<h2>${data}</h2>`;
    })
    .catch(error => console.log(error));
};

//---------------------------------------------------------------------

// function getJson() {
//   fetch('posts.json')
//     .then(function (response) {
//       // console.log(response.text());
//       // console.log(response.json());
//       return response.json();
//     })
//     .then(function (data) {
//       let output = '';
//       data.forEach(function (post) {
//         output += `<li>${post.name} : ${post.company}</li>`;
//       })
//       document.getElementById('output').innerHTML = output;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }


//Arrow version
function getJson() {
  fetch('posts.json')
    .then(response => response.json())
    .then(data => {
      let output = '';
      data.forEach(function (post) {
        output += `<li>${post.name} : ${post.company}</li>`;
      })
      document.getElementById('output').innerHTML = output;
    })
    .catch(error => console.log(error));
};


//----------------------------------------------------------------------------

// function getExternal() {
//   fetch('https://api.github.com/users')
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       let output = '';
//       data.forEach(function (user) {
//         output += `<li>${user.id} : ${user.login}</li>`;
//       })
//       document.getElementById('output').innerHTML = output;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

//Arrow version
function getExternal() {
  fetch('https://api.github.com/users')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      let output = '';
      data.forEach(function (user) {
        output += `<li>${user.id} : ${user.login}</li>`;
      })
      document.getElementById('output').innerHTML = output;
    })
    .catch(error => console.log(error));
};