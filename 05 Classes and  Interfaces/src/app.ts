/*
#WHAT IS AN INTERFACE
An interface describes structure for an object. We can use it to describe how an object should look like.
We create an interface with an 'interface' keyword which only exists in typescript
An interface can NOT have an initiialiser. Eg - name: string = "Max"; // ERROR
We can use an interface to type check an object.
We can NOT add 'private' keyword in an interface property or method.
We can use 'readonly'
We can also extend interfaces
You can also define optional properties and methods in interfaces
 */

interface Named {
  readonly name?: string; // Optional Property
  outputName?: string; // Optional Property

  printName?(name: string): void; // Optional Method
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;
  age = 25;

  constructor(name?: string) {
    if (name) {
      this.name = name;
    }
  }

  greet(phrase: string) {
    console.log(this.name ? `${phrase} ${this.name}` : phrase);
  }
}

let user1: Greetable;

user1 = new Person();
console.log(user1);

user1.greet("Hi There!");

// INTERFACES AS FUNCTION TYPES
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;
add = (n1: number, n2: number) => n1 + n2;
