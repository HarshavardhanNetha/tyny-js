// A function passed as an arg to other function is called callback.

// addUser()  // takes 200 ms
// viewUsers()  // takes 100 ms
// when we call it this way, we can't see the new user added.
// So we call it inside addUser function

let users = ["Arun","Varun"]

function addUser(username, callback){
    setTimeout( function (){
        users.push(username);
        callback();
    }
    , 200 )
}

function getUsers(){
    setTimeout( function(){
        console.log(users)
    }
    , 100)
}

addUser("Charan",getUsers)