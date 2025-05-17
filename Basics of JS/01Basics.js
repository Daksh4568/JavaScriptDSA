let age = Number(prompt("Enter your age"));
//prompt is a built-in function in JSthat can be used to get user input
// whenever a prompt takes input, it is always in string format , even if it take a number it will convert to string
//age = Number(age);
// Number() is a built-in function in JS that converts a string to a number
let name = prompt("Enter your name");
console.log("Hello " + name + ", you are " + age + " years old.");
console.log(typeof age);


// swap two numbers
//1st method
let a = 5;
let b = 10;
let c;
c = a;
a = b;
b = c;

console.log(a);
console.log(b);

//2nd method
let d = 10
let e = 20;

d = d + e; // d = 30
e = d - e; // e = 30 - 20 = 10
d = d - e; // d = 30 - 10 = 20
console.log(d, e);

//3rd method    
let g = 20;
let h = 30;
// we can use destructuring assignment to swap two variables
// destructuring assignment is a feature in JS that allows us to unpack values from arrays or properties from objects into distinct variables
[g, h] = [h, g]; // destructuring assignment
console.log(g, h);

//4th method
let i = 10;
let j = 20;
// we can use bitwise XOR operator to swap two variables
// bitwise XOR operator is a binary operator that takes two integers and returns an integer
i = i ^ j; // i = 10 ^ 20 = 10
j = i ^ j; // j = 10 ^ 20 = 10
i = i ^ j; // i = 10 ^ 10 = 0
console.log(i, j);

// Operators

let x = 10;
let y = 20;

// Math.floor() is a built-in function in JS that rounds a number down to the nearest integer
// Now (%) this will only provide the remainder of the division
// So, 20/10 = 2 and the remainder is 0
console.log(x % y); // 0
// And if we use (/) this will provide the quotient of the division
// So, 20/10 = 2   

// Some math functions that can be used in JS

console.log(Math.floor(10.5)); // 10
console.log(Math.ceil(10.5)); // 11 
console.log(Math.round(10.5)); // 11
console.log(Math.abs(-10)); // 10
console.log(Math.sqrt(25)); // 5
console.log(Math.pow(2, 3)); // 8
console.log(Math.random()); // 0.123456789
console.log(Math.random() * 10); // 0.123456789 * 10 = 1.23456789
console.log(Math.random() * 10 + 1); // 0.123456789 * 10 + 1 = 2.23456789
console.log(Math.floor(Math.random() * 10 + 1)); // 2
console.log(Math.max(73, 65, 64, 73));
console.log(Math.min(73, 65, 64, 73));
console.log(Math.trunc((Math.random() * 9000) + 1000)); // 0.123456789 * 100 = 12.3456789 , we have done +1000 to get the number in the range of 1000 to 9999

let num = 10.7464734;
console.log(num.toFixed(num))

// area and parameter of rectangle

let length = 10;
let breadth = 20;
let area = length * breadth;
let perimeter = 2 * (length + breadth);
console.log("Area of rectangle is " + area);
console.log("Perimeter of rectangle is " + perimeter);
// area and parameter of circle
let radius = 10;
let areaOfCircle = Math.PI * radius * radius;
let perimeterOfCircle = 2 * Math.PI * radius;
console.log("Area of circle is " + areaOfCircle);