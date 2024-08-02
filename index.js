import inquirer from "inquirer";
class student {
    constructor(id, name, courseEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.courseEnrolled = courseEnrolled;
        this.feesAmount = feesAmount;
    }
}
//making variable for declaring values
let baseID = 10000;
let studentID = '';
let courseEnrollment = true;
let students = [];
//now using do wlile loop
do {
    let action = await inquirer.prompt({
        type: 'list',
        name: 'ans',
        message: 'please select an option\n',
        choices: ['enroll a student ', 'show existing student'],
    });
    if (action.ans === 'enroll a student ') {
        let studentname = await inquirer.prompt({
            type: 'input',
            name: 'ans',
            message: 'please enter your name :'
        });
        let trimstudentname = (studentname.ans).trim().toLowerCase();
        let studentnamecheck = students.map(obj => obj.name);
        if (studentnamecheck.includes(trimstudentname) === false) {
            if (trimstudentname !== " ") {
                baseID++;
                studentID = 'STID' + baseID;
                console.log('\n\tyour account has been created');
                console.log(`welcome,${trimstudentname}!`);
                let course = await inquirer.prompt({
                    type: 'list',
                    name: 'ans',
                    message: 'plaese enter a course',
                    choices: ['IT', 'biology ', 'english']
                });
                let coursefees = 9;
                switch (course.ans) {
                    case 'IT':
                        coursefees = 10000;
                        break;
                    case 'biology':
                        coursefees = 5000;
                        break;
                    case 'english':
                        coursefees = 1000;
                        break;
                }
                let courseconfirm = await inquirer.prompt({
                    type: 'confirm',
                    name: 'ans',
                    message: 'do you want to enroll in this course ',
                });
                if (courseconfirm.ans === true) {
                    let Student = new student(studentID, trimstudentname, [course.ans], coursefees);
                    students.push(Student);
                    console.log('tou are enrolled in this course !');
                }
            }
            else {
                console.log('invalid name');
            }
        }
        else {
            console.log('this name is already exixts');
        }
    }
    else if (action.ans === 'show existing student') {
        if (students.length !== 0) {
            let studentnamecheck = students.map(e => e.name);
            let selectedstudent = await inquirer.prompt({
                type: 'list',
                name: 'ans',
                message: 'please select name ',
                choices: studentnamecheck
            });
            let foundstudent = students.find(student => student.name === selectedstudent.ans);
            console.log('student information');
            console.log(foundstudent);
            console.log('\n');
        }
        else {
            console.log('record is empty');
        }
    }
    let userconfirm = await inquirer.prompt({
        type: 'confirm',
        name: 'ans',
        message: 'do you want to continue !',
    });
    if (userconfirm.ans === false) {
        courseEnrollment = false;
    }
} while (courseEnrollment);
