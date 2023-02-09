import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'st2i-datatable-export',
  templateUrl: './datatable-export.component.html',
  styleUrls: ['./datatable-export.component.css']
})
export class DatatableExportComponent implements OnInit {
  @Output() onGenerateFile = new EventEmitter<string>();
  options = [
    {title: 'pdf', code: 'pdf'},
    {title: 'excel', code: 'excel'},
  ];
  constructor() { }

  ngOnInit(): void {
  }
}
