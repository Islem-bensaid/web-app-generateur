import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { GestionBackComponent } from "@privateLayout/features/generateur/gestion-back/gestion-back.component";

@Component({
  selector: 'app-dialog-edit-ms',
  templateUrl: './dialog-edit-ms.component.html',
  styleUrls: ['./dialog-edit-ms.component.css']
})
export class DialogEditMsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GestionBackComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {
    console.log(this.data)
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }



}
