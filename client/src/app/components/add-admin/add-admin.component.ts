import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css'],
})
export class AddAdminComponent implements OnInit {
  studentId: any;
  addForm: FormGroup;
  type: any;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.addForm = this.formBuilder.group({
      name: [''],
      courseId: [''],
      credit: [],
      day: [''],
      time: [''],
      sec: [''],
      teacher: [''],
      term: [''],
    });
    this.studentId = localStorage.getItem('studentId');
    this.type = localStorage.getItem('type');
  }

  ngOnInit(): void {}

  onSubmit(): any {
    Swal.fire({
      title: 'Are you sure to add this course ',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('success!', 'This course has been Added.', 'success').then(
          () => {
            this.crudService.AddCourse(this.addForm.value).subscribe(
              () => {
                console.log('Add data successfully');
                this.ngZone.run(() =>
                  this.router.navigateByUrl('/Registration')
                );
              },
              (err) => {
                console.log(err);
              }
            );
          }
        );
      }
    });
  }
}
