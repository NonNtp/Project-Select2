import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WithdrawalComponent } from './components/withdrawal/withdrawal.component';
import { HttpClientModule } from '@angular/common/http';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { CoursesComponent } from './components/courses/courses.component';
import { MyCourseComponent } from './components/my-course/my-course.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { TeacherCourseComponent } from './components/teacher-course/teacher-course.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    RegistrationComponent,
    WithdrawalComponent,
    AddAdminComponent,
    EditCourseComponent,
    CoursesComponent,
    MyCourseComponent,
    TeacherCourseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard, RoleGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
