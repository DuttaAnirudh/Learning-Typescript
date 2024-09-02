class Department {
  static fiscalYear = 2020; // static property: we access them directly on the class without the 'new' keyword
  // private id: string; // LONGHAND
  // name: string; // LONGHAND

  // MODIFIER ('public, 'private')
  // properties and methods with keyword 'private' can NOT be accessed outside the current class
  // private employees: string[] = []; // You can only access 'employees' in Department and not in any of the inheritance of 'Department'

  // 'protected' allows the property to be used in all the inheritance of 'Department'
  protected employees: string[] = [];

  // LONGHAND
  // constructor( id: string,  arg: string) {
  //   this.name = name;
  //   this.id = id;
  // }

  // SHORTHAND
  // readonly: you can only write to this propertry once on initialisation and can not change it again
  constructor(private readonly id: string, public name: string) {}

  // Adding type safety by declaring that the method - 'describe' can only be called in 'INSTANCE' of 'Department' and nowhere else
  describe(this: Department) {
    console.log(`Department ${this.id}: ${this.name}`);
    console.log("Fiscal Year:", Department.fiscalYear); // You DO NOT access static properties with 'this' keyword. Its because 'static' properties and functions are detached from instances
  }

  addEmployee(employee: string) {
    // this.id = "02"; // ERROR: "Cannot assign to 'id' because it is a read-only property."
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees.join(", "));
  }

  // static funcitons: we call them directly on the class without the 'new' keyword and without instantiating the class
  static createEmployee(name: string) {
    return { name };
  }
}

const accounting = new Department("01", "Accounting");

console.log(accounting);

// const accountingCopy = { describe: accounting.describe }; //ERROR: "roperty 'name' is missing in type '{ describe: (this: Department) => void; }' but required in type 'Department'."
// const accountingCopy = { name: "HR", describe: accounting.describe }; // NO ERROR since we explicitly add a name property and the current object now matches the type of Department. But if we add another property in 'Department', We'll again get the above error

// accountingCopy.describe();

accounting.addEmployee("Max");
accounting.addEmployee("John");

accounting.describe();
accounting.printEmployeeInformation();

// accounting.employees.push("anna"); // ERROR: "Property 'employees' is private and only accessible within class 'Department'."

const employee1 = Department.createEmployee("Clark");
console.log(employee1);

console.log("--------------------INHERITANCE-------------------");

class ITDepartment extends Department {
  private lastReport: string;

  // GET: To read a value
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }

    throw new Error("No Report Found");
  }

  // SET: To set a value
  set renderAdminsAndReports(value: string[]) {
    if (value.length === 0) {
      throw new Error("Currently 0 Admins");
    }
    this.showAdmins(value);
    console.log(this.lastReport);
  }

  constructor(id: string, public admins: string[], public reports: string[]) {
    super(id, "IT");
    this.admins = admins;
    this.lastReport = reports[0];
  }

  showAdmins(array: string[]) {
    console.log(`${array.length} Admins: `, array.join(", "));
  }

  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }
}

const IT = new ITDepartment("01", ["David"], ["Q1", "Q2"]);
console.log(IT);
IT.addEmployee("David");
IT.addEmployee("Mathew");

IT.describe();
IT.printEmployeeInformation();
// IT.showAdmins();

console.log(IT.mostRecentReport);
IT.renderAdminsAndReports = IT.admins;
