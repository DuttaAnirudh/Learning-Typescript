/********************************************************/
/********************************************************
 * A FIRST CLASS DECORATOR
 */

// FIRST CLASS DECORATOR FUNCTION
// function Logger(constructor: Function) {
//   console.log("Logging...");
//   console.log(constructor);
// }

// @Logger
// class Person {
//   name = "Max";
//   constructor() {
//     console.log("Creating person object...");
//   }
// }

// const pers = new Person();
// console.log(pers);

/********************************************************/
/********************************************************
 * WORKING WITH DECORATOR FACTORIES
 */

// DECORATOR FACTORY
// return a decorator function, but allows us to configure it when we assign it as a decorator to something

// function Logger(logString: string) {
//   return function (constructor: Function) {
//     console.log(logString);
//     console.log(constructor);
//   };
// }

// @Logger("LOGGING - PERSON")
// class Person {
//   name = "Max";
//   constructor() {
//     console.log("Creating person object...");
//   }
// }

// const pers = new Person();
// console.log(pers);

/********************************************************/
/********************************************************
 * BUILDING MORE USEFUL DECORATORS
 */

// function WithTemplate(template: string, hookId: string) {
//   return function (_: Function) {
//     const hookEl = document.getElementById(hookId);
//     if (hookEl) {
//       hookEl.innerHTML = template;
//     }
//   };
// }

// @WithTemplate("<h1>Hello World</h1>", "app")
// class Person {
//   name = "Max";
//   constructor() {
//     console.log("Creating person object...");
//   }
// }

// const pers = new Person();
// console.log(pers);

/********************************************************/
/********************************************************
 * ADDING MULTIPLE DECORATORS
 */

function WithTemplate(template: string, hookId: string) {
  console.log("Template");
  return function (constructor: any) {
    console.log("Rendering Template");

    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      console.log(p);
    }
  };
}

@WithTemplate("<h1>Hello World</h1>", "app")
class Person {
  name = "Max";
  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();
console.log(pers);
