import { Project, ProjectStatus } from "../models/project";

// PROJECT STATE MANAGEMENT
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
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

export const projectState = ProjectState.getInstance();
