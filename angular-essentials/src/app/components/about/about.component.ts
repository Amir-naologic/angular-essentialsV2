import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from "../../shared/Draggable.directive";
import { TranslateValidationErrorsPipe } from "../../shared/TranslateValidationErrors.pipe";
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators, FormControl
} from "@angular/forms";

/**
 * Custom validator that checks if the password and confirmPassword match.
 */
export const MatchingValuesValidator = (password: string, confirmPass: string): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const pass = control.get(password);
    const confirmPassword = control.get(confirmPass);

    // -->Check: if both password and confirmPassword are provided and a match
    if (pass && confirmPassword && pass.value === confirmPassword.value) {
      return null;
    }

    // -->Return: mismatch error if the values do not match
    return { valuesMismatch: true };
  }
};

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
  passwordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, [MatchingValuesValidator('password', 'confirmPassword')]);

  /**
   * Logs the form.
   */
  public onSubmit(): void {
    console.log(this.passwordForm.value);
  }
}
