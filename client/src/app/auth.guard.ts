import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CrudService } from './services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private crudService: CrudService, private router: Router) {}

  canActivate(): boolean {
    if (this.crudService.loggedIn()) {
      return true;
    } else {
      alert('You are not loggedIn');
      this.router.navigate(['/']);
      return false;
    }
  }
}
