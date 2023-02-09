import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-viewer-filter',
  templateUrl: './viewer-filter.component.html',
  styleUrls: ['./viewer-filter.component.css']
})
export class ViewerFilterComponent implements OnInit {
  @Input() tasksList: string[];
  @Input() isolateViewerTasksLoading: boolean = false;

  @Output() filterEvent = new EventEmitter<any>();
  @Output() resetEvent = new EventEmitter<any>();
  @Output() deleteTask = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
}
