import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from "../../shared/Draggable.directive";
import { TranslateValidationErrorsPipe } from "../../shared/TranslateValidationErrors.pipe";
import {firstValueFrom, from, fromEvent, of, Observable, map, delay, mergeMap, switchMap, exhaustMap} from "rxjs";
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
      matchingControl?.setErrors({ valuesMismatch: true });
      return { valuesMismatch: true };
    }

    // -->Clear: valuesMismatch error if values match
    matchingControl?.setErrors(null);
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

  data: number = 0

  foo$ = from([1, 2, 3, 4, 5]).pipe(map(item => item * 10));

  constructor() {
    this.foo$.subscribe(foo => console.log(foo));

    const example = (operator: any) => () => {
      from([0, 1, 2, 3, 4, 5])
          .pipe(operator((x: any) => of(x).pipe(delay(500))))
              .subscribe(
                  console.log,
                  () => {},
                  () => console.log(`${operator.name} completed`)
              );
    };

    example(exhaustMap)();
    const numbers$ = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);

    numbers$.subscribe(data =>{
        // console.log({data});
        this.data = data;
    });

    const users = [
      { id: 1, name: "John", age: 30 },
      { id: 2, name: "Jamal", age: 40 },
      { id: 3, name: "Jaquaries", age: 20 }
    ];


    const users$ = new Observable(observer => {
      // observer.next(1);
      // observer.next(2);
      // observer.next(3);
      // observer.complete();
      // observer.next(4);
      users.forEach(user => {
        observer.next(user);
      })
    });

    users$.subscribe({
      next: user => {
        console.log(user);
      },
      complete: () => {
        console.log('user complete');
      }
    })

    // const body$ = fromEvent(document, 'click');

    // users$.subscribe(data =>{
    //   console.log({data});
    // });
    //
    // firstValueFrom(users$).then(user => {
    //   console.log({user});
    // })



    // body$.subscribe(body => {
    //   console.log({body});
    // })

    // const messagePromise = new Promise((resolve, reject) =>
    //     setTimeout(() => {
    //       reject('Server error');
    //     }, 1000)
    // );
    //
    // const message$ = from(messagePromise);

    // message$.subscribe({
    //   next: (message) =>{
    //   console.log({message});
    // },
    //   error: (error) => {
    //     console.log({error});
    //   },
    //   complete: () => {
    //     console.log('on completed');
    //   }
    // })

  }
  /**
   * Init the password form group with password and confirmPassword controls.
   */
  passwordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confirmPassword: new FormControl('', [Validators.required]),
  },{ validators: MatchingValuesValidator('password', 'confirmPassword') });

  /**
   * Logs the form.
   */
  public onSubmit(): void {
    console.log(this.passwordForm.value);
  }
}
