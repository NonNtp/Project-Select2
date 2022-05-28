import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    let Role = localStorage.getItem('type');
    if (Role == 'teacher') {
      return true;
    }
    alert('You not a teacher');
    this.router.navigate(['/main']);
    return false;
  }
}
