import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../shared/kanban-design-components/header/header.component";
import { SingleTaskComponent } from "../../shared/kanban-design-components/single-task/single-task.component";
import { TaskInsertionComponent } from "../../shared/kanban-design-components/task-insertion/task-insertion.component";

@Component({
  selector: 'app-kanban-design',
  imports: [CommonModule, HeaderComponent, SingleTaskComponent, TaskInsertionComponent],
  templateUrl: './kanban-design.component.html',
  styleUrl: './kanban-design.component.scss',
})
export class KanbanDesignComponent {}
