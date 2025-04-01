import {Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigureSingleTaskComponent } from "../dropdown/configure-single-task.component";

@Component({
  selector: 'app-single-task',
  imports: [CommonModule, ConfigureSingleTaskComponent],
  templateUrl: './single-task.component.html',
  styleUrl: './single-task.component.scss',
})
export class SingleTaskComponent {
  /**
   * Reference to the dropdown component used to control its visibility.
   */
  @ViewChild('dropdownCmp') public dropdownCmp: ConfigureSingleTaskComponent | null = null;

  /**
   * Toggles the dropdown menu inside the ConfigureSingleTaskComponent.
   */
  public onToggleDropdown(): void {
    this.dropdownCmp?.toggleDropdown();
  }
}
