import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router'; 
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{
  constructor(private router: Router,private http: HttpClient) {}

  canActivate(): boolean {
    // Vérifier si l'utilisateur est connecté ou non
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      return true; // Autoriser l'accès à la route protégée si l'utilisateur est connecté
    } else {
      this.router.navigate(['/login']); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      return false; // Interdire l'accès à la route protégée
    } 
  } 
}