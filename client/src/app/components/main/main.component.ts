import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  message = 'you are not';
  Id: any;
  studentId!: string;
  name!: string;
  years!: string;
  sec!: string;
  email!: string;
  tel!: string;
  type!: string;
  constructor(private http: HttpClient) {
    this.Id = localStorage.getItem('studentId');
  }

  ngOnInit(): void {
    this.http.get(`http://localhost:5500/api/user/${this.Id}`).subscribe(
      (response: any) => {
        (this.studentId = response.studentId),
          (this.name = response.name),
          (this.years = response.years),
          (this.sec = response.sec),
          (this.email = response.email),
          (this.tel = response.tel),
          (this.type = response.type);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
