import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http'; // Import the necessary module

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = []; // Initialisez items à un tableau vide
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  nom: string | null = null;
  prenom: string | null = null;
  CRUD: string | null = null;
  poste: string | null = null;
  admin: string | null = null;
  photo: string | null = null;
  Add_project: string | null = null;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    // Récupérer les informations de l'utilisateur depuis le localStorage
    this.nom = localStorage.getItem('nom');
    this.prenom = localStorage.getItem('prenom');
    this.CRUD = localStorage.getItem('CRUD');
    this.poste = localStorage.getItem('poste');
    this.admin = localStorage.getItem('admin');
    this.photo = localStorage.getItem('photo');
    this.Add_project = localStorage.getItem('Add_project');

    // Initialiser le tableau d'éléments de menu
    this.initializeMenu();
  }

  initializeMenu(): void {
    // Initialiser les éléments du menu sauf "Déconnexion"
    if (this.Add_project === '1') {
      // Ajouter l'élément "Utilisateurs" seulement si l'utilisateur a le droit CRUD
      this.items.push({
        label: 'Add project',
        icon: 'pi pi-fw pi-plus',
      });
    }

    // Vérifier si l'utilisateur a le droit CRUD
    if (this.admin === '1') {
      // Ajouter l'élément "Utilisateurs" seulement si l'utilisateur a le droit CRUD
      this.items.push({
        label: 'Utilisateurs',
        icon: 'pi pi-fw pi-users',
        styleClass: 'custom-menu-label', // Ajoutez cette ligne pour appliquer le style personnalisé

        items: [
          {
            label: 'Liste des Utilisateurs  ',
            routerLink: '/liste-utilisateurs',
          },
        ],
      });
      this.items.push({
        label: 'Backup BDD',
        icon: 'pi pi-database',
        command: () => this.backupDatabase(),
      });
    }

    // Ajouter l'élément "Déconnexion" en dernier
    this.items.push({
      label: 'Déconnexion',
      icon: 'pi pi-fw pi-power-off',
      command: () => this.logout(),
    });
  }

  logout(): void {
    // Supprimer les informations d'authentification
    localStorage.removeItem('isLoggedIn');

    // Rediriger vers la page de connexion
    this.router.navigate(['/login']);
  }

  backupDatabase(): void {
    // Obtenir la date et l'heure actuelles
    const currentDate = new Date();
    const dateString = currentDate
      .toISOString()
      .slice(0, 19)
      .replace(/:/g, '-'); // Formater la date

    // Nom du fichier de sauvegarde avec la date actuelle
    const filename = `backup_${dateString}.sql`;

    // Effectuer une requête HTTP pour déclencher la sauvegarde de la base de données
    this.http
      .get('http://localhost:3002/trs-enc/backup', { responseType: 'text' })
      .subscribe(
        (response: string) => {
          // Explicitly define the type of 'response' parameter as string
          // Traiter la réponse (par exemple, télécharger le fichier)
          this.downloadFile(response, filename);
        },
        (error: any) => {
          // Explicitly define the type of 'error' parameter
          console.error(
            'Erreur lors de la sauvegarde de la base de données:',
            error
          );
          // Gérer les erreurs
        }
      );
  }

  downloadFile(data: any, filename: string): void {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
