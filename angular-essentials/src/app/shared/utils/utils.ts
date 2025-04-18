import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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
            // -->Set: valuesMismatch error
            matchingControl?.setErrors({valuesMismatch: true});
        }else{
            matchingControl?.setErrors(null);
        }

        // -->Clear: valuesMismatch error if values match
        return null;
    };
}

/**
 * Dropdown items interface.
 */
export interface DropdownItems {
    label: string;
    icon: string;
    action: () => void;
}

/**
 * Task Section interface.
 */
export interface TaskSection {
    id: string;
    title: string;
    tasks: { id: number; title: string }[];
    editing: boolean;
    activeDropdown?: string | null;
}

/**
 * Menu Items interface.
 */
export interface MenuItems {
    key: string;
    label: string;
    icon: string;
    options: {
        initials: string,
        label: string,
        color: string,
        initialsColor?: string
    }[];
}
