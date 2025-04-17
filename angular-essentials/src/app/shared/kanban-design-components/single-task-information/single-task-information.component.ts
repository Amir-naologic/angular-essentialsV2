import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-task-information',
  imports: [CommonModule],
  templateUrl: './single-task-information.component.html',
  styleUrl: './single-task-information.component.scss',
})
export class SingleTaskInformationComponent {
  @Input() show = false;
  @Input() options: { label: string, initials: string, color: string }[] = [];
}
