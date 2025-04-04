import {Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigureSingleTaskComponent } from "../dropdown/configure-single-task.component";
import { SingleTaskInformationComponent } from "../single-task-information/single-task-information.component";

@Component({
  selector: 'app-single-task',
  imports: [CommonModule, ConfigureSingleTaskComponent, SingleTaskInformationComponent],
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

  public activeDropdown: string | null = null;

  public menuItems = [
    {
      key: 'subtasks',
      label: '1/4 subtasks',
      icon: 'assets/box_check.svg',
      options: [
        { initials: 'O', label: 'Me', color: '#e7e6fd' },
        { initials: 'D', label: 'Darren Colborn', color: '#c7e6f8' },
        { initials: 'M', label: 'Mikayla Hanson', color: '#d6f7f3' },
        { initials: 'J', label: 'Josephine Mason', color: '#e5cbfc' }
      ]
    },
    {
      key: 'status',
      label: 'Unpaid',
      icon: 'assets/person.svg',
      options: [
        { initials: 'O', label: 'Me', color: '#e7e6fd' },
        { initials: 'D', label: 'Darren Colborn', color: '#c7e6f8' },
        { initials: 'M', label: 'Mikayla Hanson', color: '#d6f7f3' },
        { initials: 'J', label: 'Josephine Mason', color: '#e5cbfc' }
      ]
    },
    {
      key: 'assigned',
      label: 'Florin Galan',
      icon: 'assets/person.svg',
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
      icon: 'assets/calendar.svg',
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
      icon: 'assets/person.svg',
      options: [
        { initials: 'O', label: 'Me', color: '#e7e6fd' },
        { initials: 'D', label: 'Darren Colborn', color: '#c7e6f8' },
        { initials: 'M', label: 'Mikayla Hanson', color: '#d6f7f3' },
        { initials: 'J', label: 'Josephine Mason', color: '#e5cbfc' }
      ]
    }
  ];

  public toggleDropdown(key: string): void {
    this.activeDropdown = this.activeDropdown === key ? null : key;
  }

}
