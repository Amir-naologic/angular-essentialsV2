import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, CurrencyPipe, DatePipe, TitleCasePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  name = 'amir hoxha';
  contact = 123.45;
  purchasedOn = '2025-12-12'
}
