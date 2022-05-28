import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

export class Register {
  studentId!: String;
  courseId!: String;
  sec!: String;
  term!: String;
}

export class Login {
  email!: String;
  studentId!: String;
}

export class course {
  name!: String;
  courseId!: String;
  credit!: Number;
  day!: String;
  time!: String;
}

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  REST_API: String = 'http://localhost:5500/api';

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  //login
  LoginHandler(data: Login): Observable<any> {
    let API_URL = `${this.REST_API}/login`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  GetCourses() {
    return this.httpClient.get(`${this.REST_API}/courses`);
  }

  getCourseByTerm(term: any): Observable<any> {
    let API_URL = `${this.REST_API}/courses/${term}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  getCourseByTeacher(teacher: any): Observable<any> {
    let API_URL = `${this.REST_API}/courses/teacher/${teacher}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  getCourse(courseId: any): Observable<any> {
    let API_URL = `${this.REST_API}/course/${courseId}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  getMyRegister(studentId: any): Observable<any> {
    let API_URL = `${this.REST_API}/register/${studentId}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  AddCourse(data: course): Observable<any> {
    let API_URL = `${this.REST_API}/addCourse`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }

  Registration(data: course, studentId: any): Observable<any> {
    let API_URL = `${this.REST_API}/register/${studentId}`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }

  RegistrationStudent(data: Register, studentId: any): Observable<any> {
    let API_URL = `${this.REST_API}/register/${studentId}`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }

  updateCourse(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/updateCourse/${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  deleteCourse(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/deleteCourse/${id}`;
    return this.httpClient
      .delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error code  ${error.status} Message ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
