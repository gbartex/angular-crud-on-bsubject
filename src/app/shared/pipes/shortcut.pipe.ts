import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortcut'
})
export class ShortcutPipe implements PipeTransform {

  transform(value: string, length: number = 1): any {
    if (!value) {
      return "";
    }
    if (length > 1) {
      if (value.length < length) return value;
      return value.substring(0, length) + "...";
    }
    return value.charAt(0).toLocaleUpperCase() + '.';
  }

}