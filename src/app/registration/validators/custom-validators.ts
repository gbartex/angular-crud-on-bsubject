import { AbstractControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';
import { startWith, delay, map, debounceTime, distinctUntilChanged, filter, tap, switchMap, take } from 'rxjs/operators';

export class CustomValidators {
  static emailIsTakenValidator(userService: UserService, emailEdit = '') {
    return (control: AbstractControl) => {
      if (!control.valueChanges || control.pristine) {
        return of(null);
      }
      else {
        return control.valueChanges
          .pipe(
          debounceTime(500),
          take(1),
          // distinctUntilChanged(),
          switchMap(x => {
            if (!!emailEdit&&(emailEdit===x)) {
              return of(false);
            } else {
              return userService.checkEmailNotTaken(x);
            }
          }),
          take(1),
          // tap(x=>console.log('after',x)),
          tap(() => control.markAsTouched()),
          map(isTaken => isTaken ? { emailTaken: true } : null)
          );
      }
    };
  };
}