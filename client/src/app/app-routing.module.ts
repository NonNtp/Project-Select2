import { NgModule } from '@angular/core';

import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { WithdrawalComponent } from './components/withdrawal/withdrawal.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { CoursesComponent } from './components/courses/courses.component';
import { MyCourseComponent } from './components/my-course/my-course.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { TeacherCourseComponent } from './components/teacher-course/teacher-course.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Registration',
    component: RegistrationComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'my-course',
    component: MyCourseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Withdrawal',
    component: WithdrawalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: AddAdminComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'teacher-course',
    component: TeacherCourseComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'edit/:courseId',
    component: EditCourseComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
