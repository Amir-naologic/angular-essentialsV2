import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from '../../shared/directives/draggable.directive';
import { TranslateValidationErrorsPipe } from "../../shared/pipes/translate-validation-errors.pipe";
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
export function MatchingValuesValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    // -->Get: Form controls (fields)
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    // -->Skip: valuesMismatch validation if other validations exist
    if (matchingControl?.errors && !matchingControl.errors['valuesMismatch']) {
      return null;
    }

    // -->Check: if both fields are not a match
    if (control?.value !== matchingControl?.value) {
      // -->Set: valuesMismatch error if values do not match
      matchingControl?.setErrors({valuesMismatch: true});
    }else{
      matchingControl?.setErrors(null);
    }

    // -->Clear: valuesMismatch error if values match
    return null;
  };
}
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
