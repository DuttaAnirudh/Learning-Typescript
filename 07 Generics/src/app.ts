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
 * We pass some extra information into the function so that we can work in a better way with the result of the function
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

// function merge<T extends object, U extends object>(objA: T, objB: U) {
//   return { ...objA, ...objB };
// }

// const mergedObj = merge(
//   { name: "John", hobbies: ["basketball", "cooking"] },
//   26
// ); // ERROR: Argument of type 'number' is not assignable to parameter of type 'object'

// const mergedObj = merge(
//   { name: "John", hobbies: ["basketball", "cooking"] },
//   { age: 26 }
// );
// console.log(mergedObj);

/*******************************************************/
/*******************************************************
 * MORE GENERIC FUCNTIONS
 */

// interface Lengthy {
//   length: number;
// }

// function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
//   let descriptionText = "No Elements";

//   if (element.length === 1) descriptionText = `Got ${element.length} element.`;

//   if (element.length > 1) descriptionText = `Got ${element.length} elements.`;
//   return [element, descriptionText];
// }

// console.log(countAndDescribe("hi there"));

// // KEYOF
// function extractAndConvert<T extends object, U extends keyof T>(
//   obj: T,
//   key: U
// ) {
//   return `Value: ${obj[key]}`;
// }

// console.log(extractAndConvert({ name: "Max" }, "name"));

/*******************************************************/
/*******************************************************
 * GENERIC CLASSES
 */

// type AcceptedTypes = string | number | boolean | any[];

// class DataStorage<T extends AcceptedTypes> {
//   private data: T[] = [];

//   addItem(item: T) {
//     this.data.push(item);
//   }

//   removeItem(item: T) {
//     if (this.data.indexOf(item) === -1) {
//       return;
//     }
//     this.data.splice(this.data.indexOf(item), 1);
//   }

//   getItem() {
//     return [...this.data];
//   }
// }

// const textStorage = new DataStorage<string>();

// textStorage.addItem("John");
// textStorage.addItem("David");

// console.log(textStorage.getItem());

// const arrayStorage = new DataStorage<string[]>();
// arrayStorage.addItem(["John", "favid"]);

/*******************************************************/
/*******************************************************
 * GENERIC UTILITY TYPES
 */

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

// function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
//   return { title, description, completeUntil: date };
// }

// PARTIAL<CourseGoal>
// Tells TS that current empty object will become a CourseGoal at the end but for now keep all the properties need in CourseGoal as 'optional'

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;

  return courseGoal as CourseGoal;
}

// READONLY<>
// TS won't allow you to mutate any type of value

const names: Readonly<string[]> = ["max", "john"];
// names.push("Manu"); // ERROR: Property 'push' does not exist on type 'readonly string[]
