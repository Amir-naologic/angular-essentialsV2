import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDraggableDirective]',
})
export class DraggableDirectiveDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  /**
   * keeps track of whether the drag action has started.
   */
  draggingStarted = false;

  /**
   * Stores the initial mouse X coordinates
   */
  startX = 0;

  /**
   * Stores the initial mouse Y coordinates.
   */
  startY = 0;

  /**
   * Initial X position of element.
   */
  initialElementX = 0;

  /**
   * Initial Y position of element.
   */
  initialElementY = 0;

  /**
   * Sets up initial mouse and element position for dragging.
   */
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.draggingStarted = true;

    // -->Get: store the starting mouse coordinates for X and Y
    this.startX = event.clientX;
    this.startY = event.clientY;

    // -->Get: store the initial X and Y positions of the element
    this.initialElementX = this.el.nativeElement.offsetLeft;
    this.initialElementY = this.el.nativeElement.offsetTop;

    this.el.nativeElement.style.position = 'absolute';

    this.el.nativeElement.style.zIndex = '1000';
  }

  /**
   * Updates the position of the element based on mouse movement.
   */
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // -->Check: if dragging is in progress
    if (this.draggingStarted) {
      // -->Get: calculate the difference in mouse movement (deltaX, deltaY)
      const deltaX = event.clientX - this.startX;
      const deltaY = event.clientY - this.startY;

      // -->Set: update the position of the element based on the calculated values
      this.el.nativeElement.style.left = `${this.initialElementX + deltaX}px`;
      this.el.nativeElement.style.top = `${this.initialElementY + deltaY}px`;
    }
  }

  /**
   * Ends the drag action and resets the element's zIndex.
   */
  @HostListener('document:mouseup')
  onMouseUp() {
    this.draggingStarted = false;
    this.el.nativeElement.style.zIndex = '';
  }
}
