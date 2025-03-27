import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from "../../shared/services/theme.service";

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  /**
   * Tracks dark mode.
   */
  isDarkMode = false;


  constructor(private themeService: ThemeService) {}


  /**
   * Toggles the theme between light and dark mode.
   */
  public toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.toggleDarkMode(this.isDarkMode);
  }
}
