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
   * Tracks which group form is currently active.
   */
  public activeForm: number | null = null;

  /**
   * Toggles visibility of the add group form.
   */
  public openForm(formId: number): void {
    this.activeForm = this.activeForm === formId ? null : formId;
  }
}
