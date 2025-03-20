import { Pipe, PipeTransform } from '@angular/core';
import {ValidationErrors} from "@angular/forms";

@Pipe({
  name: 'translateValidationErrorsPipe',
})
export class TranslateValidationErrorsPipe implements PipeTransform {
  /**
   * Transforms validation errors into dynamic error messages.
   */
  transform(errors: ValidationErrors | null | undefined): string {
    // -->Check: if errors exist
    if (!errors){
      return ''
    }

    // -->Check: if field is required
    if (errors['required']) {
      return 'Field is required';
    }

    // -->Check: if minlength validation
    if (errors['minlength']) {
      return `Minimum length is ${errors['minlength'].requiredLength}`;
    }

    // -->Check: if passwords match
    if(errors['valuesMismatch']) {
      return 'Passwords do not match';
    }

    return 'Unknown error';
  }
}
