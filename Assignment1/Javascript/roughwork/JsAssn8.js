// how async works?
const students =
    [{ name: "Chandler", year: 2 },
        { name: "Joey", year: 2 }]

function getStudents() {
    setTimeout(() => { console.log(students[2]); }, 1000);
}
function createStudent(callback) {
    setTimeout(() => {
        students.push({ name: "new name", year: 1 });
        callback();
    },
    5000);
}

//createStudent();
//getStudents();

createStudent(getStudents);