import { Dragabble } from "../models/drag-drop";
import { Component } from "./base-component";
import { Project } from "../models/project";
import { AutoBind } from "../decorators/autobind";

/*******************************************************
 * CLASS : PROJECT ITEM
 */

export class ProjectItem
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
