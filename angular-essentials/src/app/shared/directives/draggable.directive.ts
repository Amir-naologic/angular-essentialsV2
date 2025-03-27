import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appDraggableDirective]',
})
export class DraggableDirective {
  /**
   * Keeps track of whether the drag action has started.
   */
  public draggingStarted = false;

  /**
   * Stores the initial mouse X and Y coordinates.
   */
  public start = {
    posX: 0,
    posY: 0
  };

  /**
   * Initial X and Y position of the element.
   */
  public initialElement = {
    x: 0,
    y: 0
  };

  /**
   * Reference to the container element
   */
  @Input() public appDraggableDirective!: HTMLElement;


  constructor(private el: ElementRef) {}


  /**
   * Sets up initial mouse and element position for dragging.
   */
  @HostListener('mousedown', ['$event'])
  public onMouseDown(event: MouseEvent): void {
    const element = this.el.nativeElement;

    // -->Check: if element is available
    if (!element) {
      return;
    }

    this.draggingStarted = true;

    // -->Get: starting mouse coordinates for X and Y
    this.start.posX = event.clientX;
    this.start.posY = event.clientY;

    // -->Get: initial X and Y positions of the element
    this.initialElement.x = element.offsetLeft;
    this.initialElement.y = element.offsetTop;


    element.style.position = 'absolute';
    element.style.zIndex = '1000';
  }

  /**
   * Updates the position of the element based on mouse movement.
   */
  @HostListener('mousemove', ['$event'])
  public onMouseMove(event: MouseEvent): void {
    // -->Check: if dragging is not in progress
    if (!this.draggingStarted){
      return
    }

    const element = this.el.nativeElement;

    // -->Check: if element and container are available
    if (!element || !this.appDraggableDirective){
      return
    }

    // -->Get: calculate the difference in mouse movement
    const deltaX = event.clientX - this.start.posX;
    const deltaY = event.clientY - this.start.posY;

    // -->Get: container & elements position and size
    const containerRect = this.appDraggableDirective.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    // -->Calculate: maximum boundaries to keep the element within the container
    const maxLeft = containerRect.width - elementRect.width - 20;
    const maxTop = containerRect.height - elementRect.height - 20;

    // -->Bound: ensure the element stays within the container's left and top boundaries
    const boundedLeft = Math.max(0, Math.min(this.initialElement.x + deltaX, maxLeft));
    const boundedTop = Math.max(0, Math.min(this.initialElement.y + deltaY, maxTop));

    // -->Set: update the position of the element based on the calculated bounded values
    element.style.left = `${boundedLeft}px`;
    element.style.top = `${boundedTop}px`;
  }

  /**
   * Ends the drag action and resets the element's zIndex.
   */
  @HostListener('mouseup')
  public onMouseUp(): void {
    // -->Check: if dragging was in progress
    if (!this.draggingStarted){
      return
    }

    // -->Reset: stop dragging
    this.draggingStarted = false;

    // -->Restore: original zIndex if element is available
    const element = this.el.nativeElement;
    if (element) {
      element.style.zIndex = '';
    }
  }
}
