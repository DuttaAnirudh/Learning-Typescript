/*******************************************************
 * CLOMPONENT BASE CLASS
 */

export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
