import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpinnerConfig } from '@shared/models/SpinnerConfig';
import { LoadingService } from '@shared/services';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  spinnerConfig: SpinnerConfig;

  constructor(
    public dialogRef: MatDialogRef<SpinnerComponent, { data: any }>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.spinnerConfig = !data.determinate?  data.spinnerConfig: LoadingService.SPINNER_PROGRESS_CONFIG;
  }

  ngOnInit(): void {
  }

}
