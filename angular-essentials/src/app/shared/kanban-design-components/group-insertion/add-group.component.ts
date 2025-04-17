import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-group',
  imports: [CommonModule],
  templateUrl: './add-group.component.html',
  styleUrl: './add-group.component.scss',
})
export class AddGroupComponent {
  /**
   * Init colors array
   */
  public colors: string[] = [
    '#E0FFFF', '#D6EFFF', '#E7E7FB', '#ECDDFB',
    '#F5F5F5', '#DFF8E8', '#E1E7F8', '#E1FFFF'
  ];
}
