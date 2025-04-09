import {Component, Input, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownItems } from "../../utils/utils";

@Component({
  selector: 'app-configure-single-task',
  imports: [CommonModule, NgbDropdownModule],
  templateUrl: './configure-single-task.component.html',
  styleUrl: './configure-single-task.component.scss',
})
export class ConfigureSingleTaskComponent {
  /**
   * Reference to the dropdown data.
   */
  @Input() public items: DropdownItems[] = [];
  /**
   * Reference to the NgbDropdown instance used to control the dropdown.
   */
  @ViewChild('dropdown', { static: false }) public dropdown: NgbDropdown | null = null;

  /**
   * Toggles the dropdown open or closed.
   */
  public toggleDropdown(): void {
    this.dropdown?.toggle();
  }
}
