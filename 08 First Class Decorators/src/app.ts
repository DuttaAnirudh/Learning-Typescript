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

// function WithTemplate(template: string, hookId: string) {
//   console.log("Template");
//   return function (constructor: any) {
//     console.log("Rendering Template");

//     const hookEl = document.getElementById(hookId);
//     const p = new constructor();
//     if (hookEl) {
//       hookEl.innerHTML = template;
//       console.log(p);
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
 * TYPES OF DECORATORS
 */

// // PROPERTY DECORATORS
// function Log(target: any, propertyName: string | Symbol) {
//   console.log("******PROPERTY DECORATOR*****");
//   console.log("Target: ", target, "| Property:", propertyName);
// }

// // ACCESSOR DECORATOR
// function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
//   console.log("******ACCESSOR DECORATORS*****");
//   console.log("Target: ", target);
//   console.log("Name: ", name);
//   console.log("Descriptor : ", descriptor);
// }

// // METHOD DECORATOR
// function Log3(
//   target: any,
//   name: string | Symbol,
//   descriptor: PropertyDescriptor
// ) {
//   console.log("******METHOD DECORATOR*****");
//   console.log("Target: ", target);
//   console.log("Name: ", name);
//   console.log("Descriptor : ", descriptor);
// }

// // PARAMETER DECORATOR
// function Log4(target: any, name: string | Symbol, position: number) {
//   console.log("******PARAMETER DECORATOR*****");
//   console.log("Target: ", target);
//   console.log("Name: ", name);
//   console.log("Position : ", position);
// }

// class Product {
//   @Log
//   title: string;
//   private _price: number;

//   @Log2
//   set price(val: number) {
//     if (val > 0) {
//       this.price = val;
//     }
//   }

//   constructor(t: string, p: number) {
//     this.title = t;
//     this._price = p;
//   }

//   @Log3
//   getPriceWithTax(@Log4 tax: number) {
//     return this._price + this._price * (tax / 100);
//   }
// }

/********************************************************/
/********************************************************
 * CREATING AN AUTOBIND DECORATOR
 */

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "This Works!";

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;

button.addEventListener("click", p.showMessage);

/********************************************************/
/********************************************************
 * VALIDATION IN DECORATORS
 */

interface ValidatorConfig {
  [property: string]: {
    [validatorProp: string]: string[];
  };
}

const registeredValidators: ValidatorConfig = {};

function Requiered(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    [propName]: ["required"],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    [propName]: ["positive"],
  };
}

function Validate(obj: any) {
  const objectValidatorConfig = registeredValidators[obj.constructor.name];

  if (!objectValidatorConfig) {
    return true;
  }

  let isValid = true;
  for (const prop in objectValidatorConfig) {
    for (const validator of objectValidatorConfig[prop]) {
      switch (validator) {
        case " required":
          isValid = isValid && !!obj[prop];
          break;

        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Requiered
  title: string;

  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;

courseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);
  console.log(createdCourse);
});
