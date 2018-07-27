//EASYHTTP class Library 3.0 
//ASYNC AWAIT

class EasyHTTP {
  //Make an HTTP GET REQUEST

  // get(url) {
  //   return new Promise((resolve, reject) => {
  //     fetch(url)
  //       .then(response => response.json())
  //       .then(data => resolve(data))
  //       .catch(error => reject(error));
  //   })
  // }

  async get(url) {
    //await response of the fetch call
    const response = await fetch(url);

    //Only proceed once its promise resolved
    const resData = await response.json();

    //Only proceed once second promise is resolved
    return resData;
  }


  //------------------------------------------------------------

  //Make an HTTP POST REQUEST

  // post(url, data) {
  //   return new Promise((resolve, reject) => {
  //     // fetch(URL, method headers, body)
  //     fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-type': 'application/json'
  //       },
  //       body: JSON.stringify(data)
  //     })
  //       .then(response => response.json())
  //       .then(data => resolve(data))
  //       .catch(error => reject(error));
  //   })
  // }

  async post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const resData = await response.json();
    return resData;

  }



  //--------------------------------------------------------------

  //Make an HTTP PUT REQUEST (longer version)

  // put(url, data) {
  //   return new Promise(function (resolve, reject) {
  //     fetch(url, {
  //       method: 'PUT',
  //       headers: { 'Content-type': 'application/json' },
  //       body: JSON.stringify(data)
  //     })
  //       .then(function (response) {
  //         return response.json();
  //       })
  //       .then(function (data) {
  //         return resolve(data);
  //       })
  //       .catch(function (error) {
  //         return reject(error);
  //       })
  //   })
  // }

  async put(url, data) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const resData = await response.json();

    return resData;
  }



  //-----------------------------------------------------------------
  //Make a  HTTP DELETE Request

  // delete(url) {
  //   return new Promise((resolve, reject) => {
  //     fetch(url, {
  //       method: 'DELETE',
  //       headers: { 'Content-type': 'application/json' }
  //     })
  //       .then(response => response.json())
  //       .then(() => resolve('User deleted!'))
  //       .catch(error => reject(error));
  //   });
  // }

  async delete(url) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' }
    });

    const resData = await ('User deleted!');
    return resData;

  }

}
