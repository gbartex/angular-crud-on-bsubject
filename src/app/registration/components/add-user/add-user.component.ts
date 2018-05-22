import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, HostBinding, AfterViewInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm, FormGroupDirective, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription, Observable, iif, of, merge as Merge } from 'rxjs';
import { startWith, map, debounceTime, distinctUntilChanged, filter, tap, switchMap, take, merge } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../../services/user.service';
import { ZipCodeService } from '../../services/zip-code.service';
import { User } from '../../models/user';
import { ZipCode } from '../../models/zip-code';
import * as _ from 'underscore';
import { CanBeDeactivate } from './../../../core/services/can-leave.guard';
import { CustomValidators } from '../../validators/custom-validators';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessageApiComponent } from './../../../core/components/message-api/message-api.component';
import { DialogConfirmComponent } from "./../../../material-components/components/dialog-confirm/dialog-confirm.component";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styles: [`
    mat-icon:hover{cursor: pointer;}
  `]
})
export class AddUserComponent implements OnInit, OnDestroy, CanBeDeactivate, AfterViewInit {
  options = [];
  filteredOptions: ZipCode[] = [];
  myControl: FormControl = new FormControl('');
  debug = false;
  hide = true;
  // @Input('edit') userEdit: User;
  userEdit: User;
  @Output('updatedUser') userUpdated = new EventEmitter<User>();
  matcher = new MyErrorStateMatcher();
  sub: Subscription;
  subRoute: Subscription;
  form: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  phone: FormControl;
  home_no: FormControl;
  zip_code: FormControl;
  city: FormControl;
  address: FormControl;
  initialValues: User;
  shouldBeDisabled = true;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, public userService: UserService, public zipCodeService: ZipCodeService, private formBuilder: FormBuilder, public snackBar: MatSnackBar, public dialog: MatDialog) { }
  ngOnInit() {
    this.createControls();
    this.form = this.createForm();
    console.log(this.userEdit);

    this.subRoute = this.activatedRoute.params.
      pipe(
      tap(x => console.log('id', x)),
      switchMap(p => {
        return this.userService.get(+p.id);
      }),
      filter(x => !!x),
      tap(user => this.updateUser(user))
      ).subscribe(x => { this.userEdit = x; this.toggleEmailValidation(); });

    Merge(this.zip_code.valueChanges, this.city.valueChanges)
      .pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      // tap(x => console.log('tap', x)),
      switchMap(val => {
        if (this.isObjectSelected()) {
          this.onSelected(val);
          return of(null)
        } else {
          return of(val)
        }
      }
      ),
      filter(x => !!x),
      filter((val: string) => val.length > 1),
      switchMap((val: string) => this.zipCodeService.get(val))
      ).subscribe(x =>
      { this.filteredOptions = x; });


  }
  toggleEmailValidation() {
    if (this.userEdit) {
      this.email.clearAsyncValidators();
      this.email.setAsyncValidators(CustomValidators.emailIsTakenValidator(this.userService, this.userEdit.email));
      this.email.updateValueAndValidity();
    }

  }
  updateUser(userToEdit) {
    this.form.patchValue({
      ...userToEdit
    });
    this.initialValues = this.form.value;
    if (!this.sub)
      this.sub = this.form.valueChanges.pipe(
        filter(values => this.form.valid)
      )
        .subscribe(values => {
          this.shouldBeDisabled = _.isEqual(this.initialValues, values);
        });
  }
  isObjectSelected() {
    return this.myControl.value instanceof Object;
  }
  onSelected(evt: ZipCode) {
    this.form.patchValue({ zip_code: evt.zip_code, city: evt.city, address: evt.address });
  }
  filter2(val: string): ZipCode[] {
    return this.options.filter(option =>
      option.zip_code.toLowerCase().startsWith(val.toLowerCase()));
  }

  ngAfterViewInit() {
  }

  createControls() {
    this.email = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.email], CustomValidators.emailIsTakenValidator(this.userService));
    this.firstName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^[a-ząćęóśżźł\s]+$/i)]);
    this.lastName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^[a-ząćęóśżźł\s]+$/i)]);
    this.phone = new FormControl('', [Validators.required, Validators.pattern(/^(?:\(\+?48\))?([\s\)\(-]*\d){9}$/)]);
    this.home_no = new FormControl('', [Validators.pattern(/^\d{1,3}[a-zA-Z]?$/)]);
    this.zip_code = new FormControl('', [Validators.pattern(/^\d{2}-\d{3}$/)]);
    this.city = new FormControl('', [Validators.minLength(3), Validators.maxLength(100)]);
    this.address = new FormControl('', [Validators.minLength(3), Validators.maxLength(100)]);
  }
  createForm() {
    return this.formBuilder.group({
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      home_no: this.home_no,
      zip_code: this.zip_code,
      city: this.city,
      address: this.address
    });
  }
  ngOnDestroy() {
    if (this.sub)
      this.sub.unsubscribe();
    if (this.subRoute)
      this.subRoute.unsubscribe();
  }
  addUser() {
    let prepData = Object.assign({}, this.form.value);
    console.log('prepData: ', prepData);
    if (this.form.valid) {
      console.log(this.form.value);
      this.userService.add(prepData);
      this.openSnackBar("success", "Data was added");
      // this.carsService.addCar(prepData).subscribe(x => this.carUpdated.emit(x), err => console.log(err));
      this.form.reset();
    }
  }
  editUser() {
    if (this.form.valid) {
      console.log('updating service call', this.userEdit.id, this.form.value);
      this.userService.update({ ...this.form.value, id: this.userEdit.id });
      this.router.navigate(['/registration/users']);
      // this.openSnackBar("success", "Data was saved");
      // this.dataService.updateCar({ ...this.form.value, id: this.carEdit.id, cost: this.getPartsCost(this.Parts.value) }).subscribe(x => this.carUpdated.emit(x));
      this.form.reset();
    }
  }
  canDeactivate() {
    if (!this.form.dirty) return true;
    let dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: { question: 'Do you want discard changes?', title: 'Waring' },
      disableClose: true
    });
    return dialogRef.afterClosed();
  }
  openSnackBar(type: string, message: string) {
    this.snackBar.openFromComponent(MessageApiComponent, {
      duration: 1000,
      data: { type, message }
    });
  }
}