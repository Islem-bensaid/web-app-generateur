import { Component, Inject, OnInit } from "@angular/core";
import {
  FormArray,
  FormControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from "@angular/forms";
import { RequestObject, SelectMetadata } from "@shared/models";
import { ConstanteWs } from "@shared/constantes/ConstanteWs";
import { SharedService } from "@shared/services/sharedWs/shared.service";
import { ToastService } from "@shared/services";
import { ResponseObject } from "@shared/models/ResponseObject";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { GestionBackComponent } from "@privateLayout/features/generateur/gestion-back/gestion-back.component";

@Component({
  selector: 'app-dialog-ms',
  templateUrl: './dialog-ms.component.html',
  styleUrls: ['./dialog-ms.component.css']
})
export class DialogMSComponent implements OnInit {
  form: UntypedFormGroup;
  listMsType : []
  metaData: SelectMetadata;
  listMs = new FormControl('');

  isCheckedCustom: false;
  formArray: FormArray = new FormArray([]);
  customMsType: []

  constructor(private formBuilder: UntypedFormBuilder,private sharedService: SharedService , private toast: ToastService
  ,public dialogRef: MatDialogRef<GestionBackComponent, { data: any }>,@Inject(MAT_DIALOG_DATA) data)
  {
    this.customMsType = data.listMsType.filter(msType => msType.labelType === 'CustomMs');
    this.listMsType = data.listMsType.filter(msType => msType.labelType !== 'CustomMs');

  }

  ngOnInit(): void {


    console.log(this.listMsType, 'AAAAAAAAAAAAAAA')

    this.form = this.formBuilder.group({
      listMs: this.formBuilder.control('', Validators.required),
    });
  }


  getFormControl(key) {
    return this.form.get(key) as UntypedFormControl;
  }


  createMS() {

    let selectedMsList = this.listMs.value;
    if (this.isCheckedCustom){


      const selectedMsListArray = Array.from(selectedMsList);

      const nameMSControls = {};
      Object.keys(this.form.controls).forEach(key => {
        if (key.startsWith('nameMS')) {
          nameMSControls[key] = this.form.controls[key];

          let formControlValue =  this.form.controls[key].value
          console.log(formControlValue,'VALLLLLLLLLLLLLLLLLLLLLLLLLL')
          let newMsType = {
            // @ts-ignore
            ...this.customMsType[0],
            labelToDisplay: formControlValue
          };

          // @ts-ignore
          selectedMsListArray.push(newMsType)
        }
        console.log(nameMSControls,'PLASS')
      });



      this.dialogRef.close({ data: selectedMsListArray });

    }

else{
    console.log(selectedMsList); // This will log an array of selected values
    this.dialogRef.close({ data: selectedMsList });}


console.log('test test ? ')

    // console.log(this.form.get('nameMS').value)
    //
    //   let obj = {};
    //   // obj = this.formMs.value;
    //
    //   obj['idProjet'] = 1 //changer dynamique
    //   obj['nomMs'] = this.form.get('nameMS').value
    //   console.log(obj)
    //   // zid if(formMs valid) fel fou9 ... control.id walla na3rach
    //
    //
    //   const request: RequestObject = <RequestObject>{
    //     uri: "tMicroservice/",
    //     method: ConstanteWs._CODE_POST,
    //     params: {
    //       body:  obj
    //     }
    //   };
    //
    //   this.sharedService.commonWs(request).subscribe({
    //     next: (response: ResponseObject) => {
    //       if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
    //
    //
    //         console.log(<[]>response.payload);
    //         localStorage.setItem('microservice-custom', response.payload.idMs);
    //         localStorage.setItem('isMsCreated', 'true');
    //         this.toast.success('Micro-service prét à être configurer')
    //
    //       } else {
    //         console.error("Error in post microservice ")
    //         ;
    //         localStorage.setItem('isMsCreated', 'false');
    //         this.toast.error();
    //       }
    //     },
    //     error: (error) => {
    //       console.error("Error in post miscroservice");
    //       localStorage.setItem('isMsCreated', 'false');
    //       this.toast.error();
    //     }
    //   });

  }

  closeDiag() {
    this.dialogRef.close();
  }

  onCheckboxChange() {
    if (this.isCheckedCustom) {
      console.log('Checkbox is checked');
      console.log(this.form)
      console.log(this.formArray)
    } else {
      this.formArray = new FormArray([]);
      // Get all form control names that start with "nameMS"
      const controlNames = Object.keys(this.form.controls).filter(name => name.startsWith('nameMS'));
      // Remove each form control by name
      controlNames.forEach(name => {
        this.form.removeControl(name);
      });

      console.log('Checkbox is not checked');
    }
  }

  onaddMsClick() {
    const controlName = `nameMS${this.formArray.length}`;
    this.formArray.push(new FormControl(''));
    console.log(this.formArray)
    this.form.addControl(controlName, this.formArray.at(this.formArray.length - 1));
    console.log(this.form)
  }


}
