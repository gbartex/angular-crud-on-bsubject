import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'default'
})
export class DefaultPipe implements PipeTransform {

  transform(value: any, url: any): any {
    let imgUrl = "";
    if (value) {
      imgUrl = value;
    } else {
      imgUrl = url;
    }
    return imgUrl;
  }

}