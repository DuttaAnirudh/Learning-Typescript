class Department {
  name: string;

  constructor(arg: string) {
    this.name = arg;
  }
}

const accounting = new Department("Accounting");

console.log(accounting);
