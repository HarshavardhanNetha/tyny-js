const arr = ["one","two","one","three","one","three"]
let key = "one"

arr[arr.lastIndexOf(key)] = '1'

console.log(arr)

// let obj = {}
// arr.forEach(i => {
//     if(obj[i]== undefined){
//         obj[i] = 1
//     }
//     else{
//         obj[i] += 1
//     }
// })

// const rev_arr = arr.reverse()
// console.log(rev_arr)

// for( const key in obj){
// if(obj[key]>1){
//     // find index of key in array and update it to 1
//     let index = rev_arr.indexOf(key)
//     rev_arr[index] = "1"
// }
// // }

// console.log(rev_arr.reverse())