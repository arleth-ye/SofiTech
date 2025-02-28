import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  login() {
    if (this.username && this.password) {
      console.log('Tentative de connexion avec:', this.username, this.password);
      // Implémenter la logique d'authentification ici
    } else {
      console.warn('Veuillez entrer un nom d\'utilisateur et un mot de passe.');
    }
  }
}
