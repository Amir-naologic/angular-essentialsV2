import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';
import { AddGroupComponent } from "../group-insertion/add-group.component";
import { FormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import {ConfigureSingleTaskComponent} from "../dropdown/configure-single-task.component";
import { DropdownItems } from "../../utils/utils";

@Component({
  selector: 'app-task-insertion',
  imports: [CommonModule, AddGroupComponent, FormsModule, ReactiveFormsModule, ConfigureSingleTaskComponent],
  templateUrl: './task-insertion.component.html',
  styleUrl: './task-insertion.component.scss',
})
export class TaskInsertionComponent implements AfterViewInit {
  /**
   * Dropdown menu options for task actions.
   */
  dropdownItems: DropdownItems[] = [
    {
      label: 'Add Task',
      icon: 'assets/icons/box_person.svg',
      action: () => this.addTask()
    },
    {
      label: 'Rename',
      icon: 'assets/icons/brush.svg',
      action: () => {}
    },
    {
      label: 'Collapse Group',
      icon: 'assets/icons/copy.svg',
      action: () => this.toggleMinimize()
    },
    {
      label: 'Delete',
      icon: 'assets/icons/delete.svg',
      action: () => {}
    }
  ];
  /**
   * Reference to the dropdown component used to control its visibility.
   */
  @ViewChild('dropdownCmp') public dropdownCmp: ConfigureSingleTaskComponent | null = null;
  /**
   * Group list used to render "Add group" buttons.
   */
  public groups: number[] = [1, 2];
  /**
   * Tracks which group form is currently active.
   */
  public activeForm: number | null = null;
  /**
   * Array of draggable task items.
   */
  public tasks: { id: number; data: string }[] = [];
  /**
   * Internal counter used to generate unique task IDs.
   */
  private taskId: number = 1;
  /**
   * Holds the instance of the Draggable library.
   */
  private draggable: any = null;
  /**
   * Whether the column is in a minimized state.
   */
  public isMinimized: boolean = false;
  /**
   * Reference to the DOM element that will act as the drag container.
   */
  @ViewChild('taskContainer') public taskContainer!: ElementRef;

  /**
   * Main input form.
   */
  public taskForm: FormGroup = new FormGroup({
    task: new FormControl('', [Validators.required]),
  });


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


  /**
   * Toggles the dropdown menu inside the ConfigureSingleTaskComponent.
   */
  public onToggleDropdown(): void {
    this.dropdownCmp?.toggleDropdown();
  }

  /**
   * Adds a new task using the form input and re-initializes drag behavior.
   */
  public addTask(): void {
    // -->Get: User input value
    const taskData = this.taskForm.get('task')?.value?.trim();

    // -->Return: if input is empty
    if (!taskData){
      return
    }

    // -->Push: the input data into the draggable list
    this.tasks.push({ id: this.taskId++, data: taskData });

    // -->Reset: the input field
    this.taskForm.reset();

    // -->Re-initialize: Draggable after DOM updates
    setTimeout(() => {
      void this.initializeDraggable();
    }, 0);
  }

  /**
   * Initializes drag-and-drop functionality.
   */
  public async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      await this.initializeDraggable();
    }
  }

  /**
   * Imports and initializes the Draggable instance with the current task container.
   */
  private async initializeDraggable(): Promise<void> {
    // -->Destroy: previous instance if it exists
    if (this.draggable) {
      this.draggable.destroy();
    }

    // -->Dynamically: import Draggable only on the browser
    const { Draggable } = await import('@shopify/draggable');

    // -->Create: new draggable instance
    this.draggable = new Draggable(this.taskContainer.nativeElement, {
      draggable: '.draggable',
    });

    // -->Event listener for drag start
    this.draggable.on('drag:start', () => {
      console.log('Drag started');
    });
  }

  /**
   * Toggles the minimized view.
   */
  public toggleMinimize(): void {
    // -->Check: If isMinimized is true and if we have any tasks
    if(!this.isMinimized && this.tasks.length === 0) {
      return;
    }

    // -->Toggle: Between minimized and full view
    this.isMinimized = !this.isMinimized;

    // -->Re-initialize: Draggable again now that the DOM is visible
    if(!this.isMinimized) {
      setTimeout((): void => {
        void this.initializeDraggable();
      }, 0)
    }
  }

  /**
   * Toggles visibility of the add group form.
   */
  public openForm(index: number): void {
    this.activeForm = this.activeForm === index ? null : index;
  }
}
