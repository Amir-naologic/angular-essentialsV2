import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveSearchComponent } from "../reactive-search/reactive-search.component";

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveSearchComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {}
