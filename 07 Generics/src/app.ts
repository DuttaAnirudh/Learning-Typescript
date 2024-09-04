/*******************************************************/
/*******************************************************
 * GENERICS TYPES (for data coming in)
 */

// const names: Array<string> = ["Max", "Manuel"]; // Array<string> === string[]

// const promise: Promise<string> = new Promise((resolve, _) =>
//   setTimeout(() => resolve("Succesfull"), 2000)
// );
// promise.then((data) => console.log(data));

/*******************************************************/
/*******************************************************
 * CREATING A GENERICS FUNCTION (for data coming in)
 * We pass some extra information into the function so that we can work in a better way with the result of the merge function
 */

// function merge<T, U>(objA: T, objB: U) {
//   return { ...objA, ...objB };
// }

// console.log(merge({ name: "Max" }, { age: 30 }));

// const mergedObj1 = merge({ name: "Max" }, { age: 30 });
// console.log(mergedObj1);
// mergedObj1.age;

// const mergedObj2 = merge(
//   { name: "John", hobbies: ["basketball", "cooking"] },
//   { age: 26 }
// );
// console.log(mergedObj2);

/*******************************************************/
/*******************************************************
 * WORKING WITH CONSTRAINTS
 */

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return { ...objA, ...objB };
}

// const mergedObj = merge(
//   { name: "John", hobbies: ["basketball", "cooking"] },
//   26
// ); // ERROR: Argument of type 'number' is not assignable to parameter of type 'object'

const mergedObj = merge(
  { name: "John", hobbies: ["basketball", "cooking"] },
  { age: 26 }
);
console.log(mergedObj);
