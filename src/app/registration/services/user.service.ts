import { Injectable } from '@angular/core';
import { User } from './../models/user';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap, delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import users_fake from './users_fake';

@Injectable()
export class UserService {
  private _id = 2;
  private _users: User[];
  private _subject;
  public Users$;
  constructor(private httpClient: HttpClient) {
    this._users=users_fake;
    this._subject= new BehaviorSubject<User[]>(this._users);
    this.Users$ = this._subject.asObservable();
  }
  add(user: User) {
    this._users.unshift({ ...user, id: ++this._id });
    this._subject.next(this._users);
  }
  remove(id: number) {
    let idx = this._users.findIndex(e => e.id === id);
    if (idx > -1) {
      this._users.splice(idx, 1);
      this._subject.next(this._users);
    }
  }
  update(user: User) {
    let idx = this._users.findIndex(e => e.id === user.id);
    if (idx > -1) {
      this._users[idx] = { ...user };
      this._subject.next(this._users);
    }
  }
  get(id: number) {
    return of(this._users.find(e => e.id === id));
  }

  checkEmailNotTaken(email: string): Observable<boolean> {
    return this.Users$
      .pipe(
      delay(1000),
      map(users =>
        users.some(user => user.email.toLowerCase() == email.toLowerCase())
      )
      );
  }
}