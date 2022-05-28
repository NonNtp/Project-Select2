import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-teacher-course',
  templateUrl: './teacher-course.component.html',
  styleUrls: ['./teacher-course.component.css'],
})
export class TeacherCourseComponent implements OnInit {
  studentId: any;
  type: any;
  teacher: any;
  termList = [
    { name: 'Semester1', code: '1' },
    { name: 'Semester2', code: '2' },
  ];

  Courses: any = [];

  constructor(private crudService: CrudService) {
    this.studentId = localStorage.getItem('studentId');
    this.type = localStorage.getItem('type');
    this.teacher = localStorage.getItem('teacher');
  }

  ngOnInit(): void {
    this.crudService.getCourseByTeacher(this.teacher).subscribe((res) => {
      console.log(res);
      this.Courses = res;
    });
  }
}
