// add events module
let events = require("events")
let eventInstance = new events.EventEmitter()

let connHandler = () =>{
    console.log("Connection Handler");

    // emit other event
    eventInstance.emit("otherHandler")
}

let otherHandler = () => {
    console.log("Emitted second handler");
}

// below two lines are listeners
// first arg is name and second is what function it has to execute
eventInstance.on("connection", connHandler)
eventInstance.on("otherHandler", otherHandler)

// this is emitter
// emmitting means calling kind of
// we call that by name: related function executes
eventInstance.emit("connection")