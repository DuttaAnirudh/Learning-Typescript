type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Employee, Admin {}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

// type Combinable = string | number;
// type Numeric = number | boolean;

// type Universal = Combinable & Numeric;

// function add(a: Combinable, b: Combinable) {
//   // TYPE GAURD
//   if (typeof a === "string" || typeof b === "string") {
//     return a.toString() + b.toString();
//   }
//   return a + b;
// }

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log(`Name: ${emp.name}`);

  if ("privileges" in emp) {
    console.log(`Privileges: ${emp.privileges.join(", ")}`);
  }

  if ("startDate" in emp) {
    console.log(`Start Date: ${emp.startDate}`);
  }
}

printEmployeeInformation(e1);

class Car {
  drive() {
    console.log("Driving a car");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck");
  }

  loadingCargo(amount: number) {
    console.log(`Loading the truck with ${amount} items`);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();

  // if ("loadingCargo" in vehicle) {
  //   vehicle.loadingCargo(25);
  // }
  if (vehicle instanceof Truck) {
    vehicle.loadingCargo(25);
  }
}

useVehicle(v1);
useVehicle(v2);

/********************************************************/
/********************************************************
DISCRIMINATED UNIONS
*/

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;

  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;

    default:
      break;
  }

  console.log(`Moving at speed of ${speed} km/hr`);
}

moveAnimal({ type: "bird", flyingSpeed: 55 });

/********************************************************/
/********************************************************
TYPE CASTING
// helps tell typescript that some value is of specific type where TS is not able to detect on its own, but you know what will be the case
// 
*/

// const paragraph = document.querySelector("p"); // HTMLParagraphElement
const paragraph = document.getElementById("message-output"); // HTMLElement

// const userInputElement = <HTMLInputElement>(
//   document.getElementById("user-input")!
// ); // HTMLElement
const userInputElement = document.getElementById(
  "user-input"
)! as HTMLInputElement; // HTMLElement
console.log(paragraph);

userInputElement.value = "Some Value";

/********************************************************/
/********************************************************
INDEX PROPERTIES
// Objects which are more flexible with the properties that they might hold
// allow you to define objects that can hold a flexible set of properties, where the property names are not known in advance but can be determined dynamically
*/

interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "Not a valid email!",
  username: "Must start with a capital character!",
};

console.log(errorBag);

/********************************************************/
/********************************************************
FUNCTION OVERLOADS
// that lets us define a function that accepts different kinds of arguments
*/

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: Combinable, b: Combinable) {
  // TYPE GAURD
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result1 = add(2, 5);
const result2 = add("max", "smith");
