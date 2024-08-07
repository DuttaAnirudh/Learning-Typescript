// function add(n1: number, n2: number, showResult: boolean, phrase: string) {
//   // if (showResult) {
//   //   console.log(`${phrase} ${n1 + n2}`);
//   // }

//   return n1 + n2;
// }

// const number1 = 5;
// const number2 = 2.8;
// const printResult = true;
// const phraseResult = "Result is: ";

// const result = add(number1, number2, printResult, phraseResult);
// console.log(result);

/****************************************/
/****************************************/
/** OBJECT TYPES **/
//////////////////////////////
// Strict
// const person: {
//   name: string;
//   age: number;
// } = {
//   name: "John",
//   age: 30,
// };

//////////////////////////////
// Flexible
// const person: {} = {
//   name: "John",
//   age: 30,
//   hobbies: ["basketball", "cooking", 7, true], // (string | number | boolean)[]
// };

//////////////////////////////
// Declaring a "tuple type"
// const person: {
//   name: string;
//   age: number;
//   hobbies: (string | number | boolean)[];
//   role: [number, string]; // TUPLE TYPE
// } = {
//   name: "John",
//   age: 30,
//   hobbies: ["basketball", "cooking", 7, true], // (string | number | boolean)[]
//   role: [2, "authors"], // suppose we know this array will always have
//   // 2 elements where 1st element is always a numeric identifier and 2nd is always a string identifer
// };

// // person.role.push("admin"); // ALLOWED - NO ERROR
// // person.role[1] = 10 // !! ERROR !! person.role is of type tuple
// // person.role = [4, "books"] // ALLOWED - NO ERROR
// console.log(person.name);

//////////////////////////////
// Declaring enums
// enum Role {
//   ADMIN,
//   READ_ONLY,
//   AUTHOR,
// }

// You can also set custom values to enums
// enum Role {
//   ADMIN = "ADMIN",
//   READ_ONLY = 5,
//   AUTHOR = 100,
// }

// const person: {
//   name: string;
//   age: number;
//   hobbies: (string | number | boolean)[];
//   role: Role.ADMIN;
// } = {
//   name: "John",
//   age: 30,
//   hobbies: ["basketball", "cooking", 7, true], // (string | number | boolean)[]
//   role: 0,
// };

// if (person.role === Role.ADMIN) {
//   console.log("is Author");
// }

//////////////////////////////
// 'any' assignment
//  -> avoid using any as much as possible
//  -> any takes away the advantages which TS provides

// const person: {} = {
//   name: "John",
//   age: 30,
//   hobbies: ["basketball", "cooking", 7, true], // (any)[]
// };

/****************************************/
/****************************************/
/* UNION TYPES*/

// function combine(input1: number | string, input2: number | string) {
//   let result;
//   if (typeof input1 === "number" && typeof input2 === "number") {
//     result = input1 + input2;
//   } else {
//     result = input1.toString() + input2.toString();
//   }

//   return result;
// }

// const combinedAges = combine(30, 26);
// console.log(combinedAges);

// const combinedNames = combine("anna", "jonas");
// console.log(combinedNames);

/****************************************/
/****************************************/
/* LITERAL TYPES */
// assign particular values as types
// in the following example: "as-number" and "as-text" are two literal values
// which will be accepted as valid values

// function combine(
//   input1: number | string,
//   input2: number | string,
//   resultConversion: "as-number" | "as-text"
// ) {
//   let result;
//   if (
//     (typeof input1 === "number" && typeof input2 === "number") ||
//     resultConversion === "as-number"
//   ) {
//     result = +input1 + +input2;
//   } else {
//     result = input1.toString() + input2.toString();
//   }

//   return result;
// }

// const combinedAges = combine(30, 26, "as-number");
// console.log(combinedAges);

// const combinedStringAges = combine("30", "26", "as-number");
// console.log(combinedStringAges);

// const combinedNames = combine("anna", "jonas", "as-text");
// console.log(combinedNames);

/****************************************/
/****************************************/
/* TYPE ALIAS / CUSTOM TYPES */
// When working with union types, it can be cumbersome to always repeat union type.
// You might want to create a new type which stores the union type.
// You can achieve this using TS feature called TYPE ALIASES
// 1. you create an alias with 'type' keyword and then add the name of cutom type
// 2. assign the type you want to encode into alias
// You can also store literal types inside an alias

// type Combinable = number | string;
// type ConversonDescriptor = "as-number" | "as-text";

// function combine(
//   input1: Combinable,
//   input2: Combinable,
//   resultConversion: ConversonDescriptor
// ) {
//   let result;
//   if (
//     (typeof input1 === "number" && typeof input2 === "number") ||
//     resultConversion === "as-number"
//   ) {
//     result = +input1 + +input2;
//   } else {
//     result = input1.toString() + input2.toString();
//   }

//   return result;
// }

// const combinedAges = combine(30, 26, "as-number");
// console.log(combinedAges);

// const combinedStringAges = combine("30", "26", "as-number");
// console.log(combinedStringAges);

// const combinedNames = combine("anna", "jonas", "as-text");
// console.log(combinedNames);

/****************************************/
/****************************************/
/* TYPE ALIAS / OBJECT TYPES */
// Type aliases can be used to "create" your own types.
// You're not limited to storing union types though - you can also provide an alias to a (possibly complex) object type.
// For example:

// type UserAlias1 = { name: string; age: number };
// const u1: UserAlias1 = { name: "Max", age: 30 }; // this works!
// // This allows you to avoid unnecessary repetition and manage types centrally.
// // For example, you can simplify this code:

// function greet1(user: { name: string; age: number }) {
//   console.log("Hi, I am " + user.name);
// }

// function isOlder1(user: { name: string; age: number }, checkAge: number) {
//   return checkAge > user.age;
// }

// // To:

// type UserAlias2 = { name: string; age: number };

// function greet2(user: UserAlias2) {
//   console.log("Hi, I am " + user.name);
// }

// function isOlder2(user: UserAlias2, checkAge: number) {
//   return checkAge > user.age;
// }

// type USER = { name: string } | string;

// let u2: USER = { name: "max" };
// u2 = "Michhael";

/****************************************/
/****************************************/
/** FUNCTION RETURN TYPES & 'void' **/

// function add(n1: number, n2: number): number {
//   return n1 + n2;
// }

// function printResult(num: number): void {
//   console.log("Result: " + num);
// }

// // : void -> the function deliberately doesn't have a return statement
// // : undefined -> function has a 'return' keyword but the function doesn't return any value and should produce 'undefined'
// printResult(add(5, 12));

/****************************************/
/****************************************/
/* FUNCTION AS TYPES */
// Function types are types which describe a function

// // let combineValues: Function;

// // let combineValues: (a: number, b: number) => number;
// // The above code implies that the variable 'combineValues' should accept any function
// // with 2 parameters, each parameter being a number type and the function would
// // return a value of type number

// combineValues = add;
// // combineValues = 5; // ERROR: 5 is a number and NOT a Function
// // combineValues = printResult; // ERROR: printResult is function which only takes 1 parameter

// console.log(combineValues(9, 8));

// /****************************************/
// /****************************************/
// /* FUNCTION TYPES & CALLBACKS */

// function addAndHandle(n1: number, n2: number, callBack: (num: number) => void) {
//   const result = n1 + n2;
//   callBack(result);
// }

// // NOTE: callback function can still return something even when function is set to 'void
// addAndHandle(1, 2, (res) => console.log(res + 6));

// // function xzc(num: number): void {
// //   return "hi";
// // }

/****************************************/
/****************************************/
/* The 'unknnown' TYPE */
// => 'unknown' is not same as 'any'
// => unknown is more restrictive than any
// => you may need an extra type check to assign 'unknown' to a value with fixed type

let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";
// userName = userInput; // ERROR: Type 'unknown' is not assignable to type 'string'

/****************************************/
/****************************************/
/* The 'never' TYPE */
// we use this type replacing void when we 100% know that function won't return anything

function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code }; // crashes the script and doesn't return anything
}

generateError("An error occurred!", 500);
