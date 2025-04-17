import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGroupComponent } from "../group-insertion/add-group.component";

@Component({
  selector: 'app-task-insertion',
  imports: [CommonModule, AddGroupComponent],
  templateUrl: './task-insertion.component.html',
  styleUrl: './task-insertion.component.scss',
})
export class TaskInsertionComponent {
  /**
   * Dummy group list used to render "Add group" buttons.
   */
  public groups = [1, 2];
  /**
   * Tracks which group form is currently active.
   */
  public activeForm: number | null = null;

  /**
   * Toggles visibility of the add group form.
   */
  public openForm(index: number): void {
    this.activeForm = this.activeForm === index ? null : index;
  }

}
