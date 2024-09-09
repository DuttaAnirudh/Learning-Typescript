// DRAG & DROP INTERFACES
interface Dragabble {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

// PROJECT STATE MANAGEMENT
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];

  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, desciption: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      desciption,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);

    this.listeners.map((listenerFn) => listenerFn(this.projects.slice()));
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const selectedProject = this.projects.find((prj) => prj.id === projectId);
    if (selectedProject && selectedProject.status !== newStatus) {
      selectedProject.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    this.listeners.map((listenerFn) => listenerFn(this.projects.slice()));
  }
}

const projectState = ProjectState.getInstance();

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
 * CLOMPONENT BASE CLASS
 */

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAfterBegin: boolean,
    newElementId?: string
  ) {
    // 1. fetching the template element
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;

    // 2. fetching the div where we add the elements
    this.hostElement = document.getElementById(hostElementId)! as T;

    // 3. taking out the all the content out of the template element(including deeply nested elements)
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    // 4. setting the element to imported element from template
    this.element = importedNode.firstElementChild as U;

    // 5. adding an id(user-input) to the 'element'
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAfterBegin);
  }

  private attach(insertAfterBegin: boolean) {
    this.hostElement.insertAdjacentElement(
      `${insertAfterBegin ? "afterbegin" : "beforeend"}`,
      this.element
    );
  }

  abstract configure?(): void;
  abstract renderContent(): void;
}

/*******************************************************/
/*******************************************************/
/*******************************************************
 * CLASS : PROJECT INPUT FORM
 */

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

/*******************************************************/
/*******************************************************/
/*******************************************************
 * CLASS : PROJECT ITEM
 */

class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Dragabble
{
  private project: Project;

  get peopleSingularity() {
    if (this.project.people === 1) {
      return `1 person assigned`;
    }

    return `${this.project.people} people assigned`;
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.peopleSingularity;
    this.element.querySelector("p")!.textContent = this.project.description;
  }

  @AutoBind
  dragStartHandler(e: DragEvent) {
    e.dataTransfer!.setData("text/plain", this.project.id);
    e.dataTransfer!.effectAllowed = "move";
  }

  @AutoBind
  dragEndHandler(_: DragEvent) {
    // console.log("Drag END", e);
  }
}

/*******************************************************/
/*******************************************************/
/*******************************************************
 * CLASS : PROJECT LIST
 */

class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-project-list`
    )! as HTMLUListElement;

    listEl.innerHTML = "";

    this.assignedProjects.map((prjItem) => {
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    });
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);

    projectState.addListener((projects: any[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        }

        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-project-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector(
      "h2"
    )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
  }

  @AutoBind
  dragOverHandler(e: DragEvent) {
    if (e.dataTransfer && e.dataTransfer.types[0] === "text/plain") {
      e.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @AutoBind
  dropHandler(e: DragEvent) {
    const prjId = e.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      prjId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @AutoBind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }
}

const projectInput = new ProjectInput();
const activeProejectList = new ProjectList("active");
const finishedProejectList = new ProjectList("finished");
