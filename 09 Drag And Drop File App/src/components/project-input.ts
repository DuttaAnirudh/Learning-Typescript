import { Component } from "./base-component.js";
import { AutoBind } from "../decorators/autobind.js";
import { Validatable, validateInput } from "../util/validation.js";
import { projectState } from "../state/project.js";

/*******************************************************
 * CLASS : PROJECT INPUT FORM
 */

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

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
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent(): void {}

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

      projectState.addProject(title, desc, people);

      this.clearInputFields();
    }
  }
}
