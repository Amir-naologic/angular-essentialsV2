import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from "../../shared/Draggable.directive";

@Component({
  selector: 'app-about',
  imports: [CommonModule, DraggableDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
