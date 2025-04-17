import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewToggleButtonsComponent } from "../view-toggle-buttons/view-toggle-buttons.component";

@Component({
  selector: 'app-task-detail-sidebar',
  imports: [CommonModule, ViewToggleButtonsComponent],
  templateUrl: './task-detail-sidebar.component.html',
  styleUrl: './task-detail-sidebar.component.scss',
})
export class TaskDetailSidebarComponent {
  /**
   * Emits Close event for closing the sidebar
   */
  @Output() public close:EventEmitter<void> = new EventEmitter<void>();
  /**
   * Indicates whether the sidebar content should be shown visually.
   */
  @Input() public isVisible: boolean = true;
  /**
   * Controls the animation lifecycle state of the sidebar.
   */
  @Input() public animationState: 'enter' | 'leave' | null = null;
  /**
   * Flag to indicate whether the entrance animation has already completed.
   */
  public hasAnimatedIn: boolean = false;
  /**
   * Tracks the currently active button
   */
  public activeView: 'details' | 'activity' | 'comments' | 'attachments' | '' = '';


  /**
   * Emits the close event to signal the sidebar should be closed
   */
  public closeSidebar(): void {
    this.close.emit();
  }

  /**
   * Sets the active button
   */
  public setActiveView(view: 'details' | 'activity' | 'comments' | 'attachments'): void {
    this.activeView = view;
  }

  /**
   * Sets the active button
   */
  public onAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'slideInRight') {
      this.hasAnimatedIn = true;
    }
  }
}

