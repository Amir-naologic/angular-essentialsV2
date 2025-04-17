import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-toggle-buttons',
  imports: [CommonModule],
  templateUrl: './view-toggle-buttons.component.html',
  styleUrl: './view-toggle-buttons.component.scss',
})
export class ViewToggleButtonsComponent {
  /**
   * Emits Click Event
   */
  @Output() public clicked:EventEmitter<void> = new EventEmitter<void>();
  /**
   * Label text to be displayed on the button.
   */
  @Input() public label: string = '';
  /**
   * The icon path for the button.
   */
  @Input() public icon: string = '';
  /**
   * The active icon path for the button.
   */
  @Input() public iconActive: string = '';
  /**
   * Flag to determine whether the toggle is currently active.
   */
  @Input() public isActive: boolean = false;
  /**
   * Optional callback to be executed on click.
   */
  @Input() public onClick: () => void = (): void => {};

  /**
   * Emits the button clicked event.
   */
  public handleClick(): void {
    this.clicked.emit();
  }
}
