import { Injectable } from '@angular/core';
import { ZipCode } from './../models/zip-code';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, tap, delay,take } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import codes_fake from './codes_fake';
@Injectable()
export class ZipCodeService {

  private _id = 1;
  private _codes: ZipCode[] = [
    {
      id: 1,
      zip_code: "00-007",
      address: "ul. Jasna od 5 do 7",
      province: "Mazowieckie",
      city: "Warszawa",
    },
    {
      id: 2,
      zip_code: "00-022",
      address: "ul. Krucza od 51 do ostatniego",
      province: "Mazowieckie",
      city: "Warszawa"
    },
    {
      id: 3,
      zip_code: "00-109",
      address: "Pl. Grzybowski od 2 do 8",
      province: "Mazowieckie",
      city: "Warszawa",
    }
  ];
  private _subject = new BehaviorSubject<ZipCode[]>(this._codes);
  public ZipCodes$ = this._subject.asObservable();
  constructor(private httpClient: HttpClient) {
    this._codes = codes_fake
      .map(x => {
        return { ...x, id: this._id++ }
      });
    this._subject.next(this._codes);
  }

  get(phrase: string):Observable<ZipCode[]> {
    return this.ZipCodes$
    .pipe(
      delay(1000),
      map(users =>
        users
        .filter(user => 
        user.zip_code.toLowerCase().startsWith(phrase.toLowerCase())
        ||user.city.toLowerCase().startsWith(phrase.toLowerCase())
        )
        .slice(0,5)
      ),
      take(1)
    );
  }
}