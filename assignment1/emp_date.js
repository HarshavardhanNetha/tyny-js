const arr = [
    {
    "employeeId": "EMP1",
    "salary": 10000
    },
    {
    "employeeId": "EMP2",
    "salary": 15000
    },
    {
    "employeeId": "EMP3",
    "salary": 24200
    },
    {
    "employeeId": "EMP4",
    "salary": 10000
    },
    {
    "employeeId": "EMP5",
    "salary": 10000
    },
    {
    "employeeId": "EMP6",
    "salary": 24200
    },
    {
    "employeeId": "EMP7",
    "salary": 37600
    },
    {
    "employeeId": "EMP8",
    "salary": 15000
    }
    ]

const salaries = []

arr.forEach(salary =>{
    // console.log(salary.salary);
    salaries.indexOf(salary.salary)=== -1 ? salaries.push(salary.salary) : null
})

// console.log(salaries);

const op_format_1 = []
salaries.forEach(i => {
    op_format_1.push({salary : i, employees : []})
})
arr.forEach(salary => {
    // op_format_1 [salary.salary].push(salary.employeeId)
    let emp_salary = salary.salary
    let emp_id = salary.employeeId
    // console.log(emp_salary + emp_id);
    op_format_1.forEach(i=>{
        // console.log(i.salary)
        if(i.salary===emp_salary){
            i.employees.push(emp_id)
        }
    })
})

console.log(op_format_1);

const op_format_2 = {}

salaries.forEach(i => {
    op_format_2 [i] = []
})
arr.forEach(salary => {
    op_format_2 [salary.salary].push(salary.employeeId)
})
console.log(op_format_2);