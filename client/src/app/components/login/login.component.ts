import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,

    private router: Router,
    private crudService: CrudService
  ) {
    this.form = this.formBuilder.group({
      email: '',
      studentId: '',
    });
  }

  ngOnInit(): void {}

  submit(): void {
    this.crudService
      .LoginHandler(this.form.getRawValue())
      .subscribe((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('email', response.email);
        localStorage.setItem('studentId', response.studentId);
        localStorage.setItem('type', response.type);
        localStorage.setItem('teacher', response.name);
        this.router.navigate(['/main']);
      });
  }
}
