const posts = [
    { title: 'Post One', body: 'This is post one' },
    { title: 'Post Two', body: 'This is post two' }
];


function createPost(post) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            posts.push(post);
            const error = true;
            if (!error) {
                resolve();
            } else {
                reject('error: something went wrong');
            }
        }, 2000);
    })
};


function getPosts() {
    setTimeout(function() {
        let output = '';
        posts.forEach(function (post) {
            output += `<li>${post.title}</li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
};

createPost({ title: 'Post 3', body: 'This is post 3' })
    .then(getPosts)
    .catch(function (error) {
        console.log(error);
    });

//-------------------------------------------------------------
// function createPost(post) {
//     setTimeout(function () {
//         posts.push(post)
//     }, 2000);
// };


// function getPost() {
//     setTimeout(function () {
//         let output = '';
//         posts.forEach(function (post) {
//             output += `<li>${post.title}</li>`;
//         });
//         document.body.innerHTML = output;
//     }, 1000);
// };

// createPost({title: 'Post 3', body: 'This is post 3'});

// getPost();

//-----------------------------------------------------------------

// function createPost(post, callback) {
//     setTimeout(function () {
//         posts.push(post);
//         callback();
//     }, 2000);
// };


// function getPosts() {
//     setTimeout(function () {
//         let output = '';
//         posts.forEach(function (post) {
//             output += `<li>${post.title}</li>`;
//         });
//         document.body.innerHTML = output;
//     }, 1000);
// };

// createPost({title: 'Post 3', body: 'This is post 3'}, getPosts);