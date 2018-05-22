import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { DashboardComponent } from './components/dashboard.component';
import { CanLeaveGuard } from './../core/services/can-leave.guard';
import { UserListComponent } from './components/user-list/user-list.component';


const usersRoutes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {
        path: '', component: UserListComponent, canDeactivate: [CanLeaveGuard]
      },
      {
        path: 'users/add', component: AddUserComponent,canDeactivate: [CanLeaveGuard]
      },
      {
        path: 'users/:id', component: AddUserComponent,canDeactivate: [CanLeaveGuard]
      },
       {
        path: 'users', component: UserListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }