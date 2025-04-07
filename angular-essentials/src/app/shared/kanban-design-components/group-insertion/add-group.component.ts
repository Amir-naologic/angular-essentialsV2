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

  public hexToRgba(hex: string, alpha: number): string {
    console.log({hex});
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
