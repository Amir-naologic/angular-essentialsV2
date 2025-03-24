import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileUploadComponent} from "../file-upload/FileUpload.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, FileUploadComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
