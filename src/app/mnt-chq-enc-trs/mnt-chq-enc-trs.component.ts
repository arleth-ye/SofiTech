import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mnt-chq-enc-trs',
  templateUrl: './mnt-chq-enc-trs.component.html',
  styleUrls: ['./mnt-chq-enc-trs.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class MntChqEncTrsComponent {
  //declarations
  TrsEncArray: any[] = [];
  isResultLoaded = false;
  total_ENC = 0;
  value: any[] = [];
  N_PCS = '';
  currentTrsID = '';
  Date_chq = '';
  Date_depot = '';
  DateFilter = '';
  MonthFilter = '';
  YearFilter = '';
  N_CHQ = '';
  OP = '';
  BNF = '';
  ENC = '';
  DEC = '';
  visible: boolean = false;
  bnq: any[] = [];
  nom_cmpt = '';

  showDialog_confirm = false;
  //////request
  userForm = this.fb.group({
    Date_chq: ['', Validators.required],
    N_CHQ: ['', Validators.required],
    OP: ['', Validators.required],
    BNF: ['', Validators.required],
    nom_cmpt: [null, Validators.required],
  });

  // Getter and setter to handle formatting between "yyyy-mm" and "mm/yy"
  get formattedMonthFilter(): string {
    // Convert "yyyy-mm" to "mm-yy"
    return this.MonthFilter.replace(/(\d{4})-(\d{2})/, '$2-$1'.toString());
  }

  set formattedMonthFilter(value: string) {
    // Convert "mm/yy" to "yyyy-mm"
    this.MonthFilter = value.replace(/(\d{2})\/(\d{4})/, '$2-$1'.toString());
  }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.getChqInst();
  }

  isButtonDisabled: boolean = true;
  ngOnInit(): void {
    const crudValue = localStorage.getItem('CRUD'); // Récupérer la valeur du CRUD depuis le localStorage
    if (crudValue && crudValue === '1') {
      this.isButtonDisabled = false; // Activer le bouton si le CRUD est égal à 1
    }
  }

  //read tresorerie avec date
  getMntChqTrsDate() {
    this.http
      .get(
        'http://localhost:3002/trs-enc/getMntChqTrsDate' + '/' + this.DateFilter
      )
      .subscribe((data: any) => {
        this.isResultLoaded = true;
        this.TrsEncArray = data;
        this.total_ENC = 0;
        this.totalENC(this.TrsEncArray);
      });
  }

  //read tresorerie avec mois
  getMntChqTrsMonth() {
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
        'http://localhost:3002/trs-enc/getMntChqTrsMonth' +
          '/' +
          this.formattedMonthFilter +
          '/' +
          extractedYear
      )
      .subscribe((data: any) => {
        this.isResultLoaded = true;
        this.TrsEncArray = data;
        this.total_ENC = 0;
        this.totalENC(this.TrsEncArray);
      });
  }

  //read tresorerie avec an
  getMntChqTrsYear() {
    this.http
      .get(
        'http://localhost:3002/trs-enc/getMntChqTrsYear' + '/' + this.YearFilter
      )
      .subscribe((data: any) => {
        this.isResultLoaded = true;
        this.TrsEncArray = data;
        this.total_ENC = 0;
        this.totalENC(this.TrsEncArray);
      });
  }

  //read
  getChqInst() {
    this.http
      .get('http://localhost:3002/trs-enc/read_chq_inst')
      .subscribe((data: any) => {
        this.isResultLoaded = true;
        this.TrsEncArray = data;
        this.totalENC(this.TrsEncArray);
        this.getBnq();
      });
  }
  ////
  showDialog() {
    this.visible = true;
  }
  /////
  clear() {
    window.location.reload();
  }

  /////total encaissement
  totalENC(Data: any) {
    this.value = Data;
    for (let j = 0; j < Data.length; j++) {
      this.total_ENC += this.value[j].ENC;
    }
  }

  validate(data: any): void {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir valider cette Opération?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      rejectButtonStyleClass: 'p-button-sm p-button-danger',
      acceptButtonStyleClass: 'p-button-sm p-button-success',
      accept: () => {
        let bodyData = {}; // Ajoutez les données nécessaires pour la validation si nécessaire
        this.http
          .patch(
            'http://localhost:3002/trs-enc/validate' + '/' + data.ID_TRS_F_S,
            bodyData
          )
          .subscribe((data: any) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Opération réussie',
              detail: 'Vous avez validé une Opération avec succès',
            });
            this.getChqInst();
            // Vous pouvez ajouter d'autres traitements après la validation si nécessaire

            // Utilisez setTimeout pour déclencher le rechargement après 4 secondes
            setTimeout(() => {
              this.showDialog_confirm = false; // Masquer la boîte de dialogue après la validation réussie
              location.reload();
            }, 1000);
          });
      },
      reject: (type: ConfirmEventType) => {
        if (type === ConfirmEventType.REJECT) {
          this.messageService.add({
            severity: 'error',
            summary: 'Annulation',
            detail: "La validation de l'Opération a été annulée",
          });

          // Utilisez setTimeout pour déclencher le rechargement après 4 secondes
          setTimeout(() => {
            this.showDialog_confirm = false; // Masquer la boîte de dialogue après l'annulation de la validation
            location.reload();
          }, 1000);
        }
      },
    });
  }

  //ajouter un cheque

  /////ajout operation
  register() {
    let bodyData = {
      N_PCS: this.N_PCS,
      Date_chq: this.Date_chq,
      Date_depot: this.Date_depot,
      N_CHQ: this.N_CHQ,
      OP: this.OP,
      BNF: this.BNF,
      ENC: this.ENC,
      DEC: this.DEC,
      nom_cmpt: this.nom_cmpt,
    };

    this.http
      .post('http://localhost:3002/trs-enc/createInst', bodyData)
      .subscribe((resultData: any) => {
        this.getChqInst();
      });
  }

  // Fonction save
  save() {
    if (this.currentTrsID === '') {
      this.confirmationService.confirm({
        message: "Voulez-vous vraiment confirmer l'ajout de cette Opération?",
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Oui',
        rejectLabel: 'Non',
        rejectButtonStyleClass: 'p-button-sm p-button-danger',
        acceptButtonStyleClass: 'p-button-sm p-button-success',
        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmation',
            detail: "L'Opération a été ajoutée avec succès",
          });
          this.register();
          this.getChqInst();
          setTimeout(() => {
            this.showDialog_confirm = false;
            location.reload();
          }, 1000);
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Annulation',
            detail: "L'ajout de l'Opération a été annulé",
          });
          this.showDialog_confirm = false;
          setTimeout(() => {
            this.showDialog_confirm = false;
            location.reload();
          }, 1000);
        },
      });
      this.showDialog_confirm = true;
    } else {
      this.confirmationService.confirm({
        message:
          'Voulez-vous vraiment effectuer la mise à jour de cette Opération?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Oui',
        rejectLabel: 'Non',
        rejectButtonStyleClass: 'p-button-sm p-button-danger',
        acceptButtonStyleClass: 'p-button-sm p-button-success',
        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmation',
            detail: "L'Opération a été mise à jour avec succès",
          });
          this.UpdateRecords();
          setTimeout(() => {
            this.showDialog_confirm = false;
            location.reload();
          }, 1000);
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Annulation',
            detail: "La mise à jour de l'Opération a été annulée",
          });
          this.showDialog_confirm = false;
          setTimeout(() => {
            this.showDialog_confirm = false;
            location.reload();
          }, 1000);
        },
      });
      this.showDialog_confirm = true;
    }
  }

  ///// modifier operation

  UpdateRecords() {
    let bodyData = {
      N_PCS: this.N_PCS,
      Date_chq: this.Date_chq,
      Date_depot: this.Date_depot,
      N_CHQ: this.N_CHQ,
      OP: this.OP,
      BNF: this.BNF,
      ENC: this.ENC,
      DEC: this.DEC,
      nom_cmpt: this.nom_cmpt,
    };

    this.http
      .patch(
        'http://localhost:3002/trs-enc/update' + '/' + this.currentTrsID,
        bodyData
      )
      .subscribe((data: any) => {
        this.getChqInst();
      });
  }

  Update(data: any) {
    if (data.Date_depot) {
      const date_depot = new Date(data.Date_depot);
      const year_depot = date_depot.getFullYear();
      const month_depot = date_depot.getMonth() + 1; // Les mois commencent à partir de zéro
      const day_depot = date_depot.getDate();
      this.Date_depot = `${year_depot}-${
        month_depot < 10 ? '0' : ''
      }${month_depot}-${day_depot < 10 ? '0' : ''}${day_depot}`;
    } else {
      this.Date_depot = '';
    }

    if (data.Date_chq) {
      const date_chq = new Date(data.Date_chq);
      const year_chq = date_chq.getFullYear();
      const month_chq = date_chq.getMonth() + 1; // Les mois commencent à partir de zéro
      const day_chq = date_chq.getDate();
      this.Date_chq = `${year_chq}-${month_chq < 10 ? '0' : ''}${month_chq}-${
        day_chq < 10 ? '0' : ''
      }${day_chq}`;
    } else {
      this.Date_chq = '';
    }

    // Assigner les autres valeurs normalement
    this.N_PCS = data.N_PCS;
    this.N_CHQ = data.N_CHQ;
    this.OP = data.OP;
    this.BNF = data.BNF;
    this.ENC = data.ENC;
    this.DEC = data.DEC;
    this.nom_cmpt = data.nom_cmpt;
    this.currentTrsID = data.ID_TRS_F_S;

    this.visible = true;
  }

  //read banque
  getBnq() {
    return this.http
      .get('http://localhost:3002/trs-enc/readBnq')
      .subscribe((data: any) => {
        this.bnq = data;
      });
  }

  Delete(data: any): void {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette Opération?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      rejectButtonStyleClass: 'p-button-sm p-button-danger',
      acceptButtonStyleClass: 'p-button-sm p-button-success', // Ajoutez une classe CSS pour le bouton "Non"
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Opération réussie',
          detail: 'Vous avez supprimé une Opération avec succès',
        });
        this.http
          .delete(
            'http://localhost:3002/trs-enc/delete' + '/' + data.ID_TRS_F_S
          )
          .subscribe((data: any) => {
            this.getChqInst();
            // Vous pouvez ajouter d'autres traitements après la suppression si nécessaire
            setTimeout(() => {
              this.showDialog_confirm = false;
              location.reload();
            }, 1000);
          });
      },
      reject: (type: ConfirmEventType) => {
        if (type === ConfirmEventType.REJECT) {
          this.messageService.add({
            severity: 'error',
            summary: 'Annulation',
            detail: "La suppression de l'Opération a été annulée",
          });
          setTimeout(() => {
            this.showDialog_confirm = false;
            location.reload();
          }, 1000);
        }
      },
    });
  }
}
