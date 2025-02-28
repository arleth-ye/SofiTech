import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sit-trs',
  templateUrl: './sit-trs.component.html',
  styleUrls: ['./sit-trs.component.css'],
})
export class SitTrsComponent {
  ///declaration
  TrsEncArray: any[] = [];
  bnq: any[] = [];
  isResultLoaded = false;
  solde = 0;
  value: any[] = [];
  total = 0;
  DateFilter = '';
  MonthFilter = '';
  YearFilter = '';
  selectedItem = '';
  compteActivated: boolean[] = []; // Tableau pour stocker l'état du bouton pour chaque utilisateur
  trsEncData: any[] = [];
  sitTrsData: any[] = [];

  constructor(private http: HttpClient) {
    this.getSitrs();
  }

  isButtonDisabled: boolean = true;

  ngOnInit(): void {
    const direction = localStorage.getItem('direction'); // Récupérer la valeur du direction depuis le localStorage

    if (direction && direction.trim() === 'Cellule de Contrôle Permanant') {
      this.isButtonDisabled = false;
    }
  }

  //extraire date format
  extraireDateSeulement(date: string): string {
    let dateObj = new Date(date);
    return `${dateObj.getFullYear()}-${('0' + (dateObj.getMonth() + 1)).slice(
      -2
    )}-${('0' + dateObj.getDate()).slice(-2)}`;
  }
  // This will hold the actual value in "yyyy-mm" format

  // Getter and setter to handle formatting between "yyyy-mm" and "mm/yy"
  get formattedMonthFilter(): string {
    // Convert "yyyy-mm" to "mm-yy"
    return this.MonthFilter.replace(/(\d{4})-(\d{2})/, '$2-$1'.toString());
  }

  set formattedMonthFilter(value: string) {
    // Convert "mm/yy" to "yyyy-mm"
    this.MonthFilter = value.replace(/(\d{2})\/(\d{4})/, '$2-$1'.toString());
  }

  ///total
  Total(Data: any) {
    this.value = Data;
    for (let j = 0; j < Data.length; j++) {
      this.total += this.value[j].montant;
    }
  }

  ///

  clear() {
    window.location.reload();
  }

  //read situation tresorerie

  getSitrs() {
    this.http
      .get('http://localhost:3002/trs-enc/read_sit_trs')
      .subscribe((data: any) => {
        console.log('Données reçues :', data); // Vérifiez la structure des données reçues

        if (data && data.sitTrsData) {
          this.sitTrsData = data.sitTrsData;
          this.trsEncData = data.trsEncData;
          console.log('Données sitTrsData :', this.sitTrsData); // Vérifiez les données sitTrsData
          this.Total(this.sitTrsData);
          this.getBnq();
        } else {
          console.error(
            'Les données reçues ne sont pas dans le format attendu.'
          );
        }
      });
  }

  //read situation tresorerie avec bnq
  getSitBnq() {
    this.http
      .get('http://localhost:3002/trs-enc/SitBnq' + '/' + this.selectedItem)
      .subscribe((data: any) => {
        this.TrsEncArray = data;
        this.solde = 0;
        this.total = 0;
        this.Total(this.TrsEncArray);
      });
  }

  //read situation tresorerie avec date
  getSitDate() {
    this.http
      .get('http://localhost:3002/trs-enc/SitDate' + '/' + this.DateFilter)
      .subscribe((data: any) => {
        this.isResultLoaded = true;
        this.TrsEncArray = data;
        this.solde = 0;
        this.total = 0;
        this.Total(this.TrsEncArray);
      });
  }

  //read situation tresorerie avec mois
  getSitMounth() {
    // Split the formattedMonthFilter string into month and year parts
    const [monthStr, yearStr] = this.formattedMonthFilter.split('-');

    // Ensure the year is represented as a four-digit number
    const year =
      parseInt(yearStr) < 100 ? 2000 + parseInt(yearStr) : parseInt(yearStr);

    // Create a new Date object using the year and month parts
    // Note: months are 0-indexed in JavaScript Date objects, so we subtract 1 from the month
    const date = new Date(year, parseInt(monthStr) - 1, 1);

    // Extract the year from the Date object
    const extractedYear = date.getFullYear();

    this.http
      .get(
        'http://localhost:3002/trs-enc/SitMonth' +
          '/' +
          this.formattedMonthFilter +
          '/' +
          extractedYear
      )
      .subscribe((data: any) => {
        this.isResultLoaded = true;
        this.TrsEncArray = data;
        this.solde = 0;
        this.total = 0;
        this.Total(this.TrsEncArray);
      });
  }

  //read situation tresorerie avec an
  getSitYear() {
    this.http
      .get('http://localhost:3002/trs-enc/SitYear' + '/' + this.YearFilter)
      .subscribe((data: any) => {
        this.isResultLoaded = true;
        this.TrsEncArray = data;
        this.solde = 0;
        this.total = 0;
        this.Total(this.TrsEncArray);
      });
  }

  //read banque
  getBnq() {
    return this.http
      .get('http://localhost:3002/trs-enc/readBnq')
      .subscribe((data: any) => {
        this.bnq = data;
      });
  }

  ///

  ////

  isCompteActivated(validation: number): boolean {
    return validation === 0;
  }
  toggleCompte(idvalidation: number, validation: number): void {
    // Trouver la ligne spécifique dans sitTrsData
    const specificRow = this.sitTrsData.find((row) => row.id === idvalidation);

    // Vérifier si la ligne spécifique existe et si elle a une propriété 'validation'
    if (specificRow && specificRow.hasOwnProperty('validation')) {
      // Récupérer la valeur actuelle de validation
      const currentValidationValue = specificRow.validation;

      // Déterminer la nouvelle valeur du compte utilisateur en fonction de la valeur actuelle
      let newCompteValue: number;
      if (validation === 0) {
        newCompteValue = 1; // Activer le compte
      } else {
        newCompteValue = 0; // Désactiver le compte
      }

      // Envoyer la nouvelle valeur à l'API pour la mise à jour
      this.http
        .put(
          'http://localhost:3002/trs-enc/validationtrs/' +
            idvalidation +
            '/' +
            newCompteValue,
          {}
        )
        .subscribe(
          (data: any) => {
            console.log('tresorerie mis à jour avec succès !');
            console.log('ID de la situation:', idvalidation);
            console.log('Ancien état de la validation:', validation);
            console.log('Nouveau état de la validation:', newCompteValue);

            // Mettre à jour la valeur dans votre application Angular
            this.compteActivated[idvalidation] = newCompteValue === 1;
          },
          (error) => {
            console.error(
              'Une erreur est survenue lors de la mise à jour du compte utilisateur : ',
              error
            );
          }
        );
    } else {
      console.error(
        "L'ID de la situation spécifiée n'a pas été trouvée ou ne possède pas de propriété 'validation'"
      );
    }

    window.location.reload();
  }

  getButtonLabel(validation: number): string {
    return validation === 1 ? 'Oui' : 'Non';
  }

  getButtonColor(validation: number): string {
    return validation === 1 ? 'toggle-success' : 'toggle-danger';
  }
}
