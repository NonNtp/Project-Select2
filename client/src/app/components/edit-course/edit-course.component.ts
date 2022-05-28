import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
})
export class EditCourseComponent implements OnInit {
  studentId: any;
  type: any;
  getId: any;
  updateForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.studentId = localStorage.getItem('studentId');
    this.type = localStorage.getItem('type');
    this.getId = this.activatedRoute.snapshot.paramMap.get('courseId');
    this.crudService.getCourse(this.getId).subscribe((res) => {
      this.updateForm.setValue({
        name: res['name'],
        credit: res['credit'],
        day: res['day'],
        time: res['time'],
      });
    });
    this.updateForm = this.formBuilder.group({
      name: [''],
      credit: [''],
      day: [''],
      time: [''],
    });
  }

  ngOnInit(): void {}

  onUpdate(): any {
    this.crudService.updateCourse(this.getId, this.updateForm.value).subscribe(
      () => {
        console.log('Updated Success');
        this.ngZone.run(() => this.router.navigateByUrl('/Registration'));
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
