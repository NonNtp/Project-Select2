import { Component, OnInit, NgZone } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  stdId: any;
  type: any;
  registerForm: FormGroup;
  termList = [
    { name: 'Semester1', code: '1' },
    { name: 'Semester2', code: '2' },
  ];

  Courses: any = [];

  constructor(
    private crudService: CrudService,
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.registerForm = this.formBuilder.group({
      studentId: [this.stdId],
      courseId: [''],
      sec: [''],
      term: [''],
    });
    this.stdId = localStorage.getItem('studentId');
    this.type = localStorage.getItem('type');
  }

  ngOnInit(): void {
    this.crudService.getCourseByTerm(this.termList[0].code).subscribe((res) => {
      console.log(res);
      this.Courses = res;
    });
  }

  onSubmit(): any {
    Swal.fire({
      title: 'Are you sure to registration this course ',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('success!', 'Registration successfully.', 'success').then(
          () => {
            this.crudService
              .RegistrationStudent(this.stdId, this.registerForm.value)
              .subscribe(
                () => {
                  console.log('Registration successfully');
                  this.ngZone.run(() =>
                    this.router.navigateByUrl('/my-course')
                  );
                },
                (err) => {
                  this.ngZone.run(() =>
                    this.router.navigateByUrl('/my-course')
                  );
                  console.log(err);
                }
              );
          }
        );
      }
    });
  }
}
