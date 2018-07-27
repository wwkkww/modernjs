// EASYHTTP class Library 2.0

class EasyHTTP {
  //Make an HTTP GET REQUEST
  get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    })
  }


  //Make an HTTP POST REQUEST
  post(url, data) {
    return new Promise((resolve, reject) => {
      // fetch(URL, method headers, body)
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    })
  }



  //Make an HTTP PUT REQUEST (longer version)
  put(url, data) {
    return new Promise(function (resolve, reject) {
      fetch(url, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          return resolve(data);
        })
        .catch(function (error) {
          return reject(error);
        })
    })
  }


  //Make a  HTTP DELETE Request
  delete(url) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' }
      })
        .then(response => response.json())
        .then(( ) => resolve('User deleted!'))
        .catch(error => reject(error));
    });
  }
}
