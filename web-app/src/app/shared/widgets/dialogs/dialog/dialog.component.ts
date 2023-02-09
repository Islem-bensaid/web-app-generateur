import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'st2i-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
   @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
