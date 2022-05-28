import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'project_register';

  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('studentId');
    localStorage.removeItem('type');
    localStorage.removeItem('teacher');
    this.router.navigate(['/']);
  }
}
