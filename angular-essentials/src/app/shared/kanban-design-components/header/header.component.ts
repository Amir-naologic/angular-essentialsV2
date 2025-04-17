import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewToggleButtonsComponent } from "../../view-toggle-buttons/view-toggle-buttons.component";

@Component({
  selector: 'app-header',
  imports: [CommonModule, ViewToggleButtonsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  /**
   * Tracks the currently active button
   */
  public activeView: 'table' | 'activity' | 'calendar' | 'timeline' | '' = "";

  /**
   * Sets the active button
   */
  public setActiveView(view: 'table' | 'activity' | 'calendar' | 'timeline'): void {
    this.activeView = view;
  }
}
