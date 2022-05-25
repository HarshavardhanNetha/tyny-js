const arr = [
    {
    "studentName": "Jack",
    "rollNumber": 1,
    "joiningDate": "13/01/2021"
    },
    {},
    {},
    {
    "studentName": "Rowling",
    "rollNumber": 2,
    "joiningDate": "11/01/2021"
    },
    {
    "studentName": "Ali",
    "rollNumber": 3,
    "joiningDate": "21/03/2021"
    },
    {},
    {
    "studentName": "Rowling",
    "rollNumber": 4,
    "joiningDate": "21/03/2021"
    },
    {
    "studentName": "Rowling",
    "rollNumber": 6,
    "joiningDate": "10/12/2021"
    },
    {
    "studentName": "Ali",
    "rollNumber": 5,
    "joiningDate": "9/11/2021"
    },
    {},
    {}
    ]

const dates = []

arr.forEach(student => {
    // console.log(student.joiningDate)
    if(student.joiningDate != undefined)    dates.push(student.joiningDate)
})

// console.log(dates);
// console.log(dates.sort())
const milli_dates = []

// console.log()

dates.forEach(date =>{
    var dateString = date
    var dateParts = dateString.split("/");
    // console.log(dateParts);
    // month is 0-based, that's why we need dataParts[1] - 1
    var dateObject = new Date(dateParts[2], dateParts[1] - 1 , dateParts[0]);
    // console.log(dateObject)
    milli_dates.push(Date.parse(dateObject))
})

let min_index = milli_dates.indexOf(Math.min(...milli_dates))
console.log("Min Date: " + dates[min_index]);

let max_index = milli_dates.indexOf(Math.max(...milli_dates))
console.log("Max Date: " + dates[max_index]);

