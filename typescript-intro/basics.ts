// Primitives: number, string, boolean
// More complex types: arrays, objects
// Function types, parameters

// Primitives

let age: number;

age = 12;

let userName: string;

userName = 'Max';

let isInstructor: boolean;

isInstructor = true;

// More complex types

let hobbies: string[];

hobbies = ['Sports', 'Cooking'];

type Person = {
    name: string;
    age: number;
};

let person: Person;

person = {
    name: 'Max',
    age: 32,
};

let people: Person[];

// Type inference

let course: string | number = 'Java Core';

course = 1234;

// Functions & types

function add(a: number, b: number) { // function type is inferred from return (number + number)
    return a + b;
}

function printMe(value: any) {
    console.log(value);
}

// Generics

function insertAtBeginning<T>(array: T[], value: T) {
    return [value,
        ...array];
}

const a = insertAtBeginning<number>([1, 2], 3);
console.log(a);

const b = insertAtBeginning<string>(['a', 'b'], 'c');
console.log(b);

const c = insertAtBeginning(['a', 'b'], 'c'); //inference
console.log(c);

class Student {

    firstName: string;
    lastName: string;
    age: number;
    private courses: string[];

    constructor(first: string, last: string, age: number, courses: string[]) {
        this.firstName = first;
        this.lastName = last;
        this.age = age;
        this.courses = courses;
    }

    enrol(courseName: string): void {
        this.courses.push(courseName);
    }

    listCourses() {
        return this.courses.slice();
    }
}

const student = new Student('Art', 'Shyshkin', 38, ['Java', 'Angular', 'RSocket']);

student.enrol('Redis');


class StudentSimple {

    constructor(public firstName: string, public lastName: string, public age: number, private courses: string[]) {
    }

    enrol(courseName: string): void {
        this.courses.push(courseName);
    }

    listCourses() {
        return this.courses.slice();
    }
}

