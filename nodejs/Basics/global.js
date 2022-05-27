// global

//  console.log(global)

// global.setTimeout(()=>{
//     console.log("Timeout")
// },3000)

// can be used directly also 
setTimeout(()=>{
    console.log("Timeout")
    clearInterval(interval)
},3000)


let interval = setInterval(() => {
    console.log("In the interval")
}, 1000)