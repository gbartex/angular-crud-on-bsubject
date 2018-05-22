import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Observable,Subscription,merge,of as observableOf } from 'rxjs';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user';

import { startWith, map, debounceTime, distinctUntilChanged, filter, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
   styleUrls:[`./user-list.component.css`]
})
export class UserListComponent implements OnInit {

   ObservableData: number;
  sub: Subscription;
  displayedColumns = ['email', 'firstName', 'lastName', 'details', 'delete'];
  dataSource = new MatTableDataSource();
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usersService: UserService, private router: Router) {
  }

  ngOnInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // console.log('addcar', this.addCar);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.usersService.Users$;
      }),
      map(data => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = data.length;
        return data;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        this.isRateLimitReached = true;
        return observableOf([]);
      })
      ).subscribe(data => {
        this.dataSource.data = data;
        console.log(data);
      }
      );
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  goToUser(user: User) {
    // console.log('goto',user);
    this.router.navigate(['/registration/users', user.id]);
  }
  deleteUser(user: User) {
    // console.log('delete',user)
    this.usersService.remove(user.id);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}