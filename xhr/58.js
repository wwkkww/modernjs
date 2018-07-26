document.getElementById('button').addEventListener('click', loadData);

function loadData() {

    //create XHR object
    const xhr = new XMLHttpRequest();

    //Open
    xhr.open('GET', 'data.txt', true);


    //OPTIONAL - used for spinner loader
    // xhr.onprogress = function () {
    //     //show loader
    //     document.getElementById('loading').style.display = 'block';
    // }

    let output = ''
    //onLoad
    xhr.onload = function () {
        if (this.status === 200) {
            output += `<h2>${this.responseText}</h2>`;

            //hide loading
            // document.getElementById('loading').style.display = 'none';
            document.getElementById('output').innerHTML = output;
            //console.log(this.responseText);

            // document.getElementById('output').innerHTML =`<h1>${this.responseText}</h1>`;
        }
    };

    // xhr.onreadystatechange = function() {
    //     console.log('READYSTATE', xhr.readyState);
    //      if (this.status === 200 && this.readyState === 4) {
    //          console.log(this.responseText);
    //      }
    // };
    xhr.onerror = function () {
        console.log('Request Error!');
    }

    xhr.send();

    //HTTP Status
    // 200: "OK"
    // 403: "Forbidden"
    // 404: "Not Found"


    //Readystates Value
    //0: request not initialized
    //1: server connection established
    //2: request received
    //3: processing request
    //4: request finished and response is ready
};