import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  studentId: any;
  type: any;
  termList = [
    { name: 'Semester1', code: 'Term1' },
    { name: 'Semester2', code: 'Term2' },
  ];

  Courses: any = [];

  constructor(private crudService: CrudService) {
    this.studentId = localStorage.getItem('studentId');
    this.type = localStorage.getItem('type');
  }

  ngOnInit(): void {
    this.crudService.GetCourses().subscribe((res) => {
      console.log(res);
      this.Courses = res;
    });
  }

  removeCourse(id: any, i: any) {
    Swal.fire({
      title: 'Are you sure to remove this form ',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'This course has been deleted.', 'success')
          .then(() => {
            this.crudService.deleteCourse(id).subscribe((res) => {
              this.Courses.splice(i, 1);
            });
          })
          .then(() => {
            window.location.replace('/Registration');
          });
      }
    });
  }
}
