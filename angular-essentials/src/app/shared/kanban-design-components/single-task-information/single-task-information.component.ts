import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-task-information',
  imports: [CommonModule],
  templateUrl: './single-task-information.component.html',
  styleUrl: './single-task-information.component.scss',
})
export class SingleTaskInformationComponent {
  /**
   * Determines whether the task information panel should be visible.
   */
  @Input() public show: boolean = false;
  /**
   * List of options to display.
   */
  @Input() public options: { label: string, initials: string, color: string, initialsColor?: string }[] = [];
}
