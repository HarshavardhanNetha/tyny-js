const xy = [1,2,3,1,2,4,5]
const x = []
const y = []

function getCount(arr,key){
    const count_ele = arr.filter(i => i==key)
    return count_ele.length
}

xy.forEach(i =>{
    let count = getCount(xy,i)
    if(count > 1){
        x.indexOf(i)==-1 ? x.push(i) : null
    }
    else{
        y.push(i)
    }
})

console.log(x)
console.log(y);