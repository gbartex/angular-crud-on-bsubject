import { AbstractControl } from "@angular/forms";
export class CsValidators {
  static power(control: AbstractControl) {
    if (!control.value) return { power: true };
    let tab = (control.value).toString().split('').map(x => +x);
    let res = tab.reduce((acc, next) => next % 2 === 0 ? acc + next : next, 0);
    if (res > 10) {
      return {
        power: {
          sumOfEven: res
        }
      }
    }
    return null;
  }
  static minLengthArray(min: number) {
    return (c: AbstractControl): {[key: string]: any} => {
        if (c.value.length >= min)
            return null;
        return { 'minLengthArray': {valid: false }};
    } 
  }
}