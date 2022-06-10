let events = require("events")
let eventInstance = new events.EventEmitter()

let obj = [{id:1,name:"Varun",balance:2000},{id:2,name:"Kiran",balance:100}]
// console.log(obj[0].name, obj[0].balance);

function deposit(id, amount, callback){
    setTimeout( () => {
        // let bal = callback(id)
        // console.log(callback(id));
        // console.log(bal);

        obj.forEach(key =>{
            if(key.id === id){
                key.balance = key.balance + amount
                callback(id)
            }
        })

    },100 )
}

function withdraw(id, amount, callback){
    setTimeout( () => {

        obj.forEach(key =>{
            if(key.id === id){
                if(key.balance >= amount) key.balance = key.balance - amount
                callback(id)
            }
        })

    },100 )
}

let viewBalance = (id) =>{
        obj.forEach(key => {
            if(key.id === id){
                console.log(key.balance);
                // return key.balance
            }
        })
}

// viewBalance(1)

eventInstance.on("view",viewBalance)
eventInstance.on("deposit",deposit)
eventInstance.on("withdraw",withdraw)

eventInstance.emit("view", (1))
eventInstance.emit("deposit", 1, 200, viewBalance)
eventInstance.emit("withdraw", 2, 2000, viewBalance)
