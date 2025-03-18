import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirectiveDirective } from "../shared/DraggableDirective.directive";

@Component({
  selector: 'app-about',
  imports: [CommonModule, DraggableDirectiveDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  color = '';
}
