import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  @ViewChild('imageElement') imageElement!: ElementRef;

  //declaration
  imageUrl: string =
    'https://www.pngitem.com/pimgs/m/2-24109_computer-icons-login-person-black-black-and-white.png';

  uploadedFiles: any[] = [];
  users: any[] = [];
  visible: boolean = false;
  compteActivated: boolean[] = []; // Tableau pour stocker l'état du bouton pour chaque utilisateur
  dir: any[] = [];
  nom = '';
  prenom = '';
  username = '';
  password = '';
  direction = '';
  poste = '';
  photo: File | null = null;
  CRUD: boolean = false;
  import: boolean = false;
  export: boolean = false;
  admin: boolean = false;
  Add_project: boolean = false;
  currentTrsID = '';
  originalPhoto: string = ''; // Stocker l'URL de l'image actuelle
  photoChanged: boolean = false;

  ////

  //////request
  userForm = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    direction: ['', Validators.required],
    poste: ['', Validators.required],
  });
  /////
  ///
  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.getAllUsers();
  }

  isButtonDisabled: boolean = true;

  ngOnInit(): void {
    this.getAllUsers();
    const crudValue = localStorage.getItem('CRUD'); // Récupérer la valeur du CRUD depuis le localStorage

    if (crudValue && crudValue === '1') {
      this.isButtonDisabled = false; // Activer le bouton si le CRUD est égal à 1
    }
  }

  showDialog() {
    this.visible = true;
  }
  ///
  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const file: File = files[0];
      this.photo = file;
      this.updateImagePreview();
      this.photoChanged = true;
    }
  }

  updateImagePreview() {
    if (this.photo) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.photo);
    }
  }

  /////
  clear() {
    window.location.reload();
  }
  ///
  getAllUsers() {
    this.http
      .get('http://localhost:3002/trs-enc/login')
      .subscribe((data: any) => {
        this.users = data;
        // Mettre à jour le tableau d'états pour chaque utilisateur
        this.compteActivated = this.users.map((user) =>
          this.isCompteActivated(user.compte)
        );
        console.log('Ancien état du compte:', this.compteActivated);
        this.getDir();
      });
  }

  //crud

  save() {
    if (this.currentTrsID == '') {
      this.register();
      window.location.reload();
      this.getAllUsers();
    } else {
      this.UpdateRecords();
      window.location.reload();
      this.getAllUsers();
    }
  }

  /////ajout operation.

  register() {
    // Check if a file is selected
    if (!this.photo) {
      alert('Please select a file.');
      return;
    }

    // Create FormData object and append the file
    const formData = new FormData();
    formData.append('file', this.photo);

    // Append other properties to formData
    formData.append('nom', this.nom);
    formData.append('prenom', this.prenom);
    formData.append('direction', this.direction);
    formData.append('poste', this.poste);
    formData.append('username', this.username);
    formData.append('password', this.password);
    formData.append('CRUD', this.CRUD ? '1' : '0');
    formData.append('import', this.import ? '1' : '0');
    formData.append('export', this.export ? '1' : '0');
    formData.append('admin', this.admin ? '1' : '0');
    formData.append('Add_project', this.Add_project ? '1' : '0');

    // Send the form data to the backend
    this.http
      .post('http://localhost:3002/trs-enc/createUser', formData)
      .subscribe(
        (resultData: any) => {
          alert('User ajouté avec succès');
          this.getAllUsers(); // You may need to define this method to fetch updated user list
        },
        (error) => {
          console.error('Error:', error);
          alert("Une erreur s'est produite lors de l'ajout de l'utilisateur.");
        }
      );
  }

  /////////// supprimer un placement

  Delete(data: any) {
    this.http
      .delete('http://localhost:3002/trs-enc/deleteUser' + '/' + data.id)
      .subscribe((data: any) => {
        alert('placement deleted'), this.getAllUsers();
        window.location.reload();
      });
  }

  ///update user

  UpdateRecords() {
    const formData = new FormData();

    // Vérifier si une nouvelle image a été sélectionnée et si elle est différente de l'image actuelle
    if (this.photo && this.photoChanged) {
      formData.append('file', this.photo);
    } else {
      // Aucune nouvelle image sélectionnée, utiliser l'image existante
      formData.append('photo', this.originalPhoto);
    }

    // Ajouter les autres propriétés au FormData
    formData.append('nom', this.nom);
    formData.append('prenom', this.prenom);
    formData.append('direction', this.direction);
    formData.append('poste', this.poste);
    formData.append('username', this.username);
    formData.append('password', this.password);
    formData.append('CRUD', this.CRUD ? '1' : '0');
    formData.append('import', this.import ? '1' : '0');
    formData.append('export', this.export ? '1' : '0');
    formData.append('admin', this.admin ? '1' : '0');
    formData.append('Add_project', this.Add_project ? '1' : '0');

    // Envoyer la requête au backend
    this.http
      .patch(
        'http://localhost:3002/trs-enc/updateUser/' + this.currentTrsID,
        formData
      )
      .subscribe(
        (data: any) => {
          alert('User updated successfully');
          this.getAllUsers();
          window.location.reload(); // Vous pourriez considérer utiliser le routing Angular pour naviguer à la place
        },
        (error) => {
          console.error('Error:', error);
          alert('An error occurred while updating the user.');
        }
      );
  }

  Update(data: any) {
    this.currentTrsID = data.id;
    this.nom = data.nom;
    this.prenom = data.prenom;
    this.direction = data.direction;
    this.poste = data.poste;
    this.username = data.username;
    this.password = data.password;
    this.CRUD = data.CRUD === 1 ? true : false;
    this.photo = data.photo; // Assurez-vous que this.photo contient toujours la valeur de data.photo
    this.import = data.import === 1 ? true : false;
    this.export = data.export === 1 ? true : false;
    this.admin = data.admin === 1 ? true : false;
    this.Add_project = data.Add_project === 1 ? true : false;
    this.visible = true;

    // Vérifier si l'utilisateur a une image associée, sinon utiliser l'URL par défaut
    if (data.photo) {
      // Si l'utilisateur a une image, mettre à jour l'URL de l'image
      this.originalPhoto = data.photo; // Stocker l'URL de l'image actuelle
      this.imageUrl = `../../assets/${data.photo}`; // Mettez l'URL de votre serveur et le nom de fichier ici
    } else {
      // Sinon, utiliser l'URL par défaut
      this.originalPhoto = ''; // L'image actuelle est vide
      this.imageUrl =
        'https://www.pngitem.com/pimgs/m/2-24109_computer-icons-login-person-black-black-and-white.png';
    }
  }

  /////

  /*save img */
  saveimg() {
    const imageBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('file', imageBlob);

    this.http
      .post('http://localhost:3001/student/createimage', file)
      .subscribe((response) => {
        console.log(response);
        alert('image created Successfully');
        this.getAllUsers();
      });
  }

  ////
  isCompteActivated(compte: number): boolean {
    return compte === 0;
  }

  toggleCompte(userId: number, compte: number): void {
    // Déterminer la nouvelle valeur du compte utilisateur en fonction de la valeur actuelle
    let newCompteValue: number;
    if (compte === 0) {
      newCompteValue = 1; // Activer le compte
    } else {
      newCompteValue = 0; // Désactiver le compte
    }

    // Envoyer la nouvelle valeur à l'API pour la mise à jour
    this.http
      .put(
        'http://localhost:3002/trs-enc/users/' + userId + '/' + newCompteValue,
        {}
      )
      .subscribe(
        (data: any) => {
          console.log('Compte utilisateur mis à jour avec succès !');
          console.log('ID du compte:', userId);
          console.log('Ancien état du compte:', compte);
          console.log('Nouveau état du compte:', newCompteValue);

          // Mettre à jour la valeur dans votre application Angular
          this.compteActivated[userId] = this.isCompteActivated(newCompteValue);
        },
        (error) => {
          console.error(
            'Une erreur est survenue lors de la mise à jour du compte utilisateur : ',
            error
          );
        }
      );

    window.location.reload();
  }

  getButtonLabel(compte: number): string {
    return compte === 1 ? 'Oui' : 'Non';
  }

  getButtonColor(compte: number): string {
    return compte === 1 ? 'toggle-success' : 'toggle-danger';
  }

  //////////

  //read banque
  getDir() {
    return this.http
      .get('http://localhost:3002/trs-enc/readDir')
      .subscribe((data: any) => {
        this.dir = data;
      });
  }
}
