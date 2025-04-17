import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from '../../shared/directives/draggable.directive';
import { TranslateValidationErrorsPipe } from "../../shared/pipes/translate-validation-errors.pipe";
import { MatchingValuesValidator } from "../../shared/utils/utils";
import {
  FormGroup,
  ReactiveFormsModule,
  Validators, FormControl
} from "@angular/forms";

@Component({
  selector: 'app-about',
  imports: [CommonModule, DraggableDirective, ReactiveFormsModule, TranslateValidationErrorsPipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  /**
   * Init the password form group with password and confirmPassword controls.
   */
  public passwordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: MatchingValuesValidator('password', 'confirmPassword') });

  /**
   * Logs the form.
   */
  public onSubmit(): void {
    console.log(this.passwordForm.value);
  }
}
