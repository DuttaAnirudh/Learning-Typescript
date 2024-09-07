// INPUT VALIDATION
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validateInput(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}

// Decorator: to bind 'this' to current class/obj
function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const orignalMethod = descriptor.value;
  const newMethod: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = orignalMethod.bind(this);
      return boundFn;
    },
  };
  return newMethod;
}

/*******************************************************/
/*******************************************************/
/*******************************************************
 * CLASS : PROJECT INPUT FORM
 */

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    // 1. fetching the template element
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;

    // 2. fetching the div where we add the elements
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    // 3. taking out the all the content out of the template element(including deeply nested elements)
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    // 4. setting the element to imported element from template
    this.element = importedNode.firstElementChild as HTMLFormElement;

    // 5. adding an id(user-input) to the 'element'
    this.element.id = "user-input";

    // 6. fetchig all the input elements of the form
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    // 7. extracting values of input elements
    this.configure();

    // 8. adding the 'element' to div(hostElement)
    this.attach();
  }

  private clearInputFields() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  private storeUserInput(): [string, string, number] | void {
    const title = this.titleInputElement.value;
    const description = this.descriptionInputElement.value;
    const people = this.peopleInputElement.value;

    const titleValidate: Validatable = {
      value: title,
      required: true,
    };
    const descValidate: Validatable = {
      value: description,
      required: true,
    };
    const peopleValidate: Validatable = {
      value: +people,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validateInput(titleValidate) ||
      !validateInput(descValidate) ||
      !validateInput(peopleValidate)
    ) {
      alert("Invalid input, please try again!");
      return;
    } else {
      return [title, description, +people];
    }
  }

  @AutoBind
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInputData = this.storeUserInput();

    if (Array.isArray(userInputData)) {
      const [title, desc, people] = userInputData;
      console.log(title, desc, people);

      this.clearInputFields();
    }
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

/*******************************************************/
/*******************************************************/
/*******************************************************
 * CLASS : PROJECT LIST
 */

class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor(private type: "active" | "finished") {
    // 1. fetching the template element
    this.templateElement = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;

    // 2. fetching the div where we add the elements
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    // 3. taking out the all the content out of the template element(including deeply nested elements)
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    // 4. setting the element to imported element from template
    this.element = importedNode.firstElementChild as HTMLFormElement;

    // 5. adding an id(user-input) to the 'element'
    this.element.id = `${this.type}-projects`;

    this.attach();
    this.renderContent();
  }

  private renderContent() {
    const listId = `${this.type}-project-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector(
      "h2"
    )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
  }

  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
}

const projectInput = new ProjectInput();
const activeProejectList = new ProjectList("active");
const finishedProejectList = new ProjectList("finished");
