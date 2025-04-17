import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { isEmpty } from 'lodash'

@Pipe({
  name: 'translateValidationErrorsPipe',
})
export class TranslateValidationErrorsPipe implements PipeTransform {
  /**
   * Transforms validation errors into dynamic error messages.
   */
  public transform(errors: ValidationErrors | null | undefined, errorMessages?: { [key: string]: string }): string {
    // -->Default: Error messages object
    let errorMapping: { [key: string]: string | ((errors: ValidationErrors) => string) } = {
      required: 'Field is required',
      minlength: (errors: ValidationErrors) => `Minimum length is ${errors['minlength'].requiredLength}`,
      valuesMismatch: 'Passwords do not match',
    };

    // -->Check: if errors exist and if errors object is not empty
    if (!errors || isEmpty(errors)) {
      return '';
    }

    // -->Merge: errors
    errorMapping = {...errorMapping, ...errorMessages}

    // -->Check: if the error exists in the predefined error mapping
    for (const key in errors) {
      if (errors.hasOwnProperty(key) && errorMapping[key]) {
        const errorMessage = errorMapping[key];
        if (typeof errorMessage === 'function') {
          return errorMessage(errors);
        }
        return errorMessage;
      }
    }

    return 'Unknown error';
  }
}
