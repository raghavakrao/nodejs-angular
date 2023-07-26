// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from './_services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService, private router: Router) {}

  canActivate(): boolean {
    if (this.tokenStorageService.getToken()) {
      return true; // Allow navigation to the route
    } else {
      this.router.navigate(['/login']); // Redirect to the login page if not authenticated
      return false; // Block navigation to the route
    }
  }
}
