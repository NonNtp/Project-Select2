import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css'],
})
export class MyCourseComponent implements OnInit {
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
    this.crudService.getMyRegister(this.studentId).subscribe((res) => {
      console.log(res);
      this.Courses = res;
    });
    console.log(this.studentId);
  }
}
