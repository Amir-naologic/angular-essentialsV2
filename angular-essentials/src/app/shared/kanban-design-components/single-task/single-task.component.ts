import {Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigureSingleTaskComponent } from "../dropdown/configure-single-task.component";
import { SingleTaskInformationComponent } from "../single-task-information/single-task-information.component";
import { DropdownItems } from "../../utils/utils";

@Component({
  selector: 'app-single-task',
  imports: [CommonModule, ConfigureSingleTaskComponent, SingleTaskInformationComponent],
  templateUrl: './single-task.component.html',
  styleUrl: './single-task.component.scss',
})
export class SingleTaskComponent {
  /**
   * Dropdown menu options for task actions.
   */
  public dropdownItems: DropdownItems[] = [
    {
      label: 'Edit',
      icon: 'assets/icons/box_person.svg',
      action: () => {}
    },
    {
      label: 'Duplicate',
      icon: 'assets/icons/brush.svg',
      action: () => {}
    },
    {
      label: 'Copy ID',
      icon: 'assets/icons/wallet.svg',
      action: () => {}
    },
    {
      label: 'Copy link',
      icon: 'assets/icons/copy.svg',
      action: () => {}
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
   * Toggles the dropdown menu inside the ConfigureSingleTaskComponent.
   */
  public onToggleDropdown(): void {
    this.dropdownCmp?.toggleDropdown();
  }
  /**
   * Stores the currently active dropdown key.
   */
  public activeDropdown: string | null = null;
  /**
   * Config for each dropdown menu item, including label, icon, and available options.
   */
  public menuItems = [
    {
      key: 'subtasks',
      label: '1/4 subtasks',
      icon: 'assets/icons/box_check.svg',
      options: [
        { initials: 'O', label: 'Me', color: '#e7e6fd', initialsColor: '#3E40DB' },
        { initials: 'D', label: 'Darren Colborn', color: '#c7e6f8', initialsColor: '#2CB1FF' },
        { initials: 'M', label: 'Mikayla Hanson', color: '#d6f7f3', initialsColor: '#00B0BF' },
        { initials: 'J', label: 'Josephine Mason', color: '#e5cbfc', initialsColor: '#8800FF' }
      ]
    },
    {
      key: 'status',
      label: 'Unpaid',
      icon: 'assets/icons/status.svg',
      options: [
        { initials: 'O', label: 'Unpaid', color: '#e7e6fd' },
        { initials: 'D', label: 'Overdue', color: '#c7e6f8' },
        { initials: 'M', label: 'Paid in full', color: '#d6f7f3' },
        { initials: 'J', label: 'Paid partially', color: '#e5cbfc' }
      ]
    },
    {
      key: 'assigned',
      label: 'Florin Galan',
      icon: 'assets/icons/person.svg',
      options: [
        { initials: 'O', label: 'Me', color: '#e7e6fd' },
        { initials: 'D', label: 'Darren Colborn', color: '#c7e6f8' },
        { initials: 'M', label: 'Mikayla Hanson', color: '#d6f7f3' },
        { initials: 'J', label: 'Josephine Mason', color: '#e5cbfc' }
      ]
    },
    {
      key: 'date',
      label: 'September 9, 2024',
      icon: 'assets/icons/date.svg',
      options: [
        { initials: 'O', label: 'Me', color: '#e7e6fd' },
        { initials: 'D', label: 'Darren Colborn', color: '#c7e6f8' },
        { initials: 'M', label: 'Mikayla Hanson', color: '#d6f7f3' },
        { initials: 'J', label: 'Josephine Mason', color: '#e5cbfc' }
      ]
    },
    {
      key: 'priority',
      label: 'Urgent',
      icon: 'assets/icons/urgent.svg',
      options: [
        { initials: 'O', label: 'Me', color: '#e7e6fd' },
        { initials: 'D', label: 'Darren Colborn', color: '#c7e6f8' },
        { initials: 'M', label: 'Mikayla Hanson', color: '#d6f7f3' },
        { initials: 'J', label: 'Josephine Mason', color: '#e5cbfc' }
      ]
    }
  ];

  /**
   * Toggles the currently active dropdown based on the provided key
   */
  public toggleDropdown(key: string): void {
    this.activeDropdown = this.activeDropdown === key ? null : key;
  }

}
