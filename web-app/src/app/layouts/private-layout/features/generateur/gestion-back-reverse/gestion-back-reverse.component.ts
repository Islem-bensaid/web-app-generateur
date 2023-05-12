import { Component, OnInit } from '@angular/core';
import { RequestObject } from "@shared/models";
import { ConstanteWs } from "@shared/constantes/ConstanteWs";
import { GenerateurService } from "@privateLayout/shared/services/generateur.service";

@Component({
  selector: 'app-gestion-back-reverse',
  templateUrl: './gestion-back-reverse.component.html',
  styleUrls: ['./gestion-back-reverse.component.css']
})
export class GestionBackReverseComponent implements OnInit {

  tables: any =[]
   listMs: any = [];
  selectedCheckboxes: string[] = [];
  selectedTables: any[] = [];
  backEndPath: string;
  url: string;
  password: string;
  username: string;

  constructor(private generateurService: GenerateurService) { }

  ngOnInit(): void {
    const listMsFromLocalStorage = localStorage.getItem('listMsSentToReverse');
    this.listMs = JSON.parse(listMsFromLocalStorage);
    const listTablesFromLocalStorage = localStorage.getItem('tables');
    this.tables = JSON.parse(listTablesFromLocalStorage);
    this.backEndPath = localStorage.getItem('backEndPath');
    this.url = localStorage.getItem('url');
    this.password = localStorage.getItem('password');
    this.username = localStorage.getItem('username');
    console.log(this.tables)
    console.log(this.listMs)
  }





  onCheckboxClick(event, item: any, ms) {
    if (event.target.checked) {
      // Add the item to the selected items list
      console.log('checked');
      this.selectedTables.push({ tableName: item, path: this.backEndPath+'/'+(ms.labelToDisplay || ms.labelType) });
    } else {
      console.log('unchecked');
      // Remove the item from the selected items list
      const index = this.selectedTables.findIndex(selectedItem => (selectedItem.path === this.backEndPath+'/'+(ms.labelToDisplay || ms.labelType) && selectedItem.tableName === item));
      if (index >= 0) {
        this.selectedTables.splice(index, 1);
      }
    }

    console.log(this.selectedTables);
  }


  reverse() {


  this.generateurService.reverseTable(this.selectedTables,this.url,this.password,this.username).subscribe()


  }




}
