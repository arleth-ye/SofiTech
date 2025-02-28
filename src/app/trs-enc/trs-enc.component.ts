import {
  Component,
  ViewEncapsulation,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { FormBuilder, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-trs-enc',
  templateUrl: './trs-enc.component.html',
  styleUrls: ['./trs-enc.component.css'],
  providers: [ConfirmationService, MessageService],
  encapsulation: ViewEncapsulation.None,
})
export class TrsEncComponent {
  @ViewChild('fileInput', { static: false }) private fileInput: any;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.getAllTrs();
  }

  isButtonDisabled: boolean = true;
  isButtonDisabled_import: boolean = true;
  isButtonDisabled_export: boolean = true;

  ngOnInit(): void {
    const crudValue = localStorage.getItem('CRUD'); // Récupérer la valeur du CRUD depuis le localStorage
    const importValue = localStorage.getItem('import'); // Récupérer la valeur d import depuis le localStorage
    const exportValue = localStorage.getItem('export'); // Récupérer la valeur d export depuis le localStorage

    if (crudValue && crudValue === '1') {
      this.isButtonDisabled = false; // Activer le bouton si le CRUD est égal à 1
    }

    if (importValue && importValue === '1') {
      this.isButtonDisabled_import = false; // Activer le bouton si le CRUD est égal à 1
    }
    if (exportValue && exportValue === '1') {
      this.isButtonDisabled_export = false; // Activer le bouton si le CRUD est égal à 1
    }
  }
  ////////declarations

  N_PCS = '';
  currentTrsID = '';
  Date_chq = '';
  Date_depot = '';
  Date_reg = '';
  DateFilter = '';
  MonthFilter = '';
  YearFilter = '';
  N_CHQ = '';
  OP = '';
  BNF = '';
  ENC = '';
  DEC = '';
  nom_cmpt = '';
  bnq: any[] = [];
  visible: boolean = false;
  visible_solde: boolean = false;
  visible1: boolean = false;
  loading: boolean = true;
  TrsEncArray: any[] = [];
  value: any[] = [];
  isResultLoaded = false;
  total_ENC = 0;
  total_DEC = 0;
  solde = 0;
  data: any;
  showDialog_confirm = false;
  //////////

  //////request
  userForm = this.fb.group({
    Date_chq: ['', Validators.required],
    N_CHQ: ['', Validators.required],
    OP: ['', Validators.required],
    BNF: ['', Validators.required],
    nom_cmpt: [null, Validators.required],
  });
  /////

  //read banque
  getBnq() {
    return this.http
      .get('http://localhost:3002/trs-enc/readBnq')
      .subscribe((data: any) => {
        this.bnq = data;
      });
  }

  ////fonction

  showDialog() {
    this.visible = true;
  }
  /////
  showDialog_solde() {
    this.visible_solde = true;
  }
  ////
  showDialog1() {
    this.visible1 = true;
  }
  /////
  clear() {
    window.location.reload();
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
  /////total encaissement
  totalENC(Data: any) {
    this.value = Data;
    for (let j = 0; j < Data.length; j++) {
      this.total_ENC += this.value[j].ENC;
    }
  }

  //////// total decaissement
  totalDEC(Data: any) {
    this.value = Data;
    for (let j = 0; j < Data.length; j++) {
      this.total_DEC += this.value[j].DEC;
    }
  }

  //////// calcul solde
  Solde() {
    this.solde = this.total_ENC - this.total_DEC;
  }

  //read tresorerie
  getAllTrs() {
    this.http
      .get('http://localhost:3002/trs-enc/read')
      .subscribe((data: any) => {
        this.isResultLoaded = true;
        this.TrsEncArray = data;
        this.totalENC(this.TrsEncArray);
        this.totalDEC(this.TrsEncArray);
        this.Solde();
        this.getBnq();
      });
  }

  //read tresorerie avec date
  getTrsDate() {
    this.http
      .get('http://localhost:3002/trs-enc/Trsdate' + '/' + this.DateFilter)
      .subscribe((data: any) => {
        this.isResultLoaded = true;
        this.TrsEncArray = data;
        this.total_DEC = 0;
        this.total_ENC = 0;
        this.solde = 0;
        this.totalENC(this.TrsEncArray);
        this.totalDEC(this.TrsEncArray);
        this.Solde();
      });
    console.log(this.DateFilter);
  }

  //read tresorerie avec mois
  getTrsMounth() {
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
        'http://localhost:3002/trs-enc/TrsMonth' +
          '/' +
          this.formattedMonthFilter +
          '/' +
          extractedYear
      )
      .subscribe((data: any) => {
        this.isResultLoaded = true;
        this.TrsEncArray = data;
        this.total_DEC = 0;
        this.total_ENC = 0;
        this.solde = 0;
        this.totalENC(this.TrsEncArray);
        this.totalDEC(this.TrsEncArray);
        this.Solde();
      });
    console.log(this.formattedMonthFilter);
  }

  //read tresorerie avec an
  getTrsYear() {
    this.http
      .get('http://localhost:3002/trs-enc/TrsYear' + '/' + this.YearFilter)
      .subscribe((data: any) => {
        this.isResultLoaded = true;
        this.TrsEncArray = data;
        this.total_DEC = 0;
        this.total_ENC = 0;
        this.solde = 0;
        this.totalENC(this.TrsEncArray);
        this.totalDEC(this.TrsEncArray);
        this.Solde();
      });
    console.log(this.YearFilter);
  }

  /////ajout operation
  register() {
    let bodyData = {
      N_PCS: this.N_PCS,
      Date_chq: this.Date_chq,
      Date_reg: this.Date_reg,
      Date_depot: this.Date_depot,
      N_CHQ: this.N_CHQ,
      OP: this.OP,
      BNF: this.BNF,
      ENC: this.ENC,
      DEC: this.DEC,
      nom_cmpt: this.nom_cmpt,
    };

    this.http
      .post('http://localhost:3002/trs-enc/create', bodyData)
      .subscribe((resultData: any) => {
        this.getAllTrs();
      });
  }

  save_solde() {
    let bodyData = {
      Date_chq: this.Date_chq,
      OP: this.OP,
      ENC: this.ENC,
    };

    this.http
      .post('http://localhost:3002/trs-enc/create-solde', bodyData)
      .subscribe((resultData: any) => {
        window.location.reload();
        this.getAllTrs();
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
          this.getAllTrs();
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
      Date_reg: this.Date_reg,
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
        this.getAllTrs();
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

    if (data.Date_reg) {
      const date_reg = new Date(data.Date_reg);
      const year_reg = date_reg.getFullYear();
      const month_reg = date_reg.getMonth() + 1; // Les mois commencent à partir de zéro
      const day_reg = date_reg.getDate();
      this.Date_reg = `${year_reg}-${month_reg < 10 ? '0' : ''}${month_reg}-${
        day_reg < 10 ? '0' : ''
      }${day_reg}`;
    } else {
      this.Date_reg = '';
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

  /////////// supprimer une operation

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
            this.getAllTrs();
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

  /////import fichier excel fiche suiveuse
  import() {
    const fileBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('file', fileBlob);

    this.http
      .post('http://localhost:3002/trs-enc/import', file)
      .subscribe((response) => {
        console.log(response);
      });
    alert('trs imported Successfully');
    this.getAllTrs();
    window.location.reload();
  }

  ///exporter fiche suiveuse excel
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_Export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  exportExcel() {
    this.http
      .get('http://localhost:3002/trs-enc/read')
      .subscribe((data: any) => {
        this.TrsEncArray = data;
        import('xlsx').then((xlsx) => {
          const worksheet = xlsx.utils.json_to_sheet(this.TrsEncArray);
          const workbook = {
            Sheets: { data: worksheet },
            SheetNames: ['data'],
          };
          const excelBuffer: any = xlsx.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
          });
          this.saveAsExcelFile(excelBuffer, 'Fiche_Suiveuse_Trésorerie');
        });
      });
  }

  //////

  exportPdf() {
    this.http
      .get('http://localhost:3002/trs-enc/read')
      .subscribe((data: any) => {
        this.TrsEncArray = data;
        import('jspdf').then((jsPDF) => {
          import('jspdf-autotable').then((x) => {
            const doc = new jsPDF.default('p', 'px', 'a4');
            (doc as any).autoTable(this.TrsEncArray);
            doc.save('Fiche_Suiveuse.pdf');
          });
        });
      });
  }

  //
}
