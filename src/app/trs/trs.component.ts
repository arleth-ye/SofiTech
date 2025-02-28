import { Component, OnInit } from '@angular/core'; 
   
interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-trs',
  templateUrl: './trs.component.html',
  styleUrls: ['./trs.component.css']
})
export class TrsComponent implements OnInit{ 
  cities: City[] | undefined;
  ngOnInit() {
    
    this.cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

  }
}