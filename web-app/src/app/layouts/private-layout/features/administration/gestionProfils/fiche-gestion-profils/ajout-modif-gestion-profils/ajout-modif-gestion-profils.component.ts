import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { ConfirmDialogService, ToastService } from '@shared/services';
import { RequestObject, SelectMetadata } from '@shared/models';
import { ADMINISTRATION_URI } from '@privateLayout/shared/constantes/administration/administration-uri-index';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { ResponseObject } from '@shared/models/ResponseObject';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import {
  GestionProfilsMetadata
} from '@privateLayout/shared/constantes/administration/gestion-profils/gestion-profils-metadata';
import {
  TreeViewMenuComponent
} from '@privateLayout/features/administration/gestionProfils/fiche-gestion-profils/tree-view-menu/tree-view-menu.component';


@Component({
  selector: 'app-ajout-modif-gestion-profils',
  templateUrl: './ajout-modif-gestion-profils.component.html',
  styleUrls: ['./ajout-modif-gestion-profils.component.css']
})
export class AjoutModifGestionProfilsComponent implements OnInit {
  id: any;
  editMod: boolean = false;
  responsePayload: any;
  form: UntypedFormGroup;
  labels: any;
  title: any;
  selectEtatProfil: SelectMetadata;
  listStatus: any;
  isLoginLoading = false;
  dataMenu: any;
  listAdmFonc = [];
  @ViewChild('treeViewComponent') treeViewComponent: TreeViewMenuComponent;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService,
              private toast: ToastService,
              private formBuilder: UntypedFormBuilder,
              private confirmDialogService: ConfirmDialogService
  ) {
  }


  ngOnInit(): void {
    this._getType();
    this.initMetadata();
  }

  _getType() {
    this.activatedRoute.data.subscribe({
      next: (data) => {
        this.editMod = data.type === 'e';
      }
    });
  }

  initMetadata() {
    this.labels = GestionProfilsMetadata.AddEditGestionProfil;
    this.selectEtatProfil = <SelectMetadata>GestionProfilsMetadata.selectMetaDataEtatProfil;
    this.listStatus = GestionProfilsMetadata.selectDataEtatProdil;
    this.id = this.activatedRoute.snapshot.params.id;
    this.editMod = this.activatedRoute.snapshot.data.type == 'e';

    if (this.editMod) {
      this.initData();
      this.title = 'adm.gp.edit';
    } else {
      this.initForm();
      this.title = 'adm.gp.add';
    }
  }

  initData() {
    const request: RequestObject = <RequestObject>{
      uri: ADMINISTRATION_URI.GESTION_PROFILS.ADM_STATIC,
      params: {
        path: [this.id]
      },
      microservice: ConstanteWs._CODE_ADMINISTRATION,
      method: ConstanteWs._CODE_GET
    };
    this.sharedService.commonWs(request).subscribe({
      next: (response: ResponseObject) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
          this.responsePayload = response.payload;
          this.initForm(response.payload.admProfil);
          this.dataMenu = response.payload.listParent;
          if (this.responsePayload['flgActif'])
            this.responsePayload['flgActif'] = 'Actif';
          else
            this.responsePayload['flgActif'] = 'Inactif';
        } else {
          console.error(`Error in AjoutModifGestionProfilsComponent/initData, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in AjoutModifGestionProfilsComponent/initData, error :: ${error}`);
        this.toast.error();
      }
    });

  }

  getFormControl(key) {
    return this.form.get(key) as UntypedFormControl;
  }

  getLabel(control: string) {
    return this.labels[control];
  }


  onSave() {
    this.isLoginLoading = false;
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.isLoginLoading = true;
      this.confirmDialogService.confirm().subscribe((flag) => {
        if (flag) {
          let reqData = this.form.value;
          if (this.editMod) {
            reqData['id'] = this.id;
          }
          reqData['listAdmFonc'] = this.treeViewComponent.checkSelLeafAndAllDependances();
          const request: RequestObject = <RequestObject>{
            uri: ADMINISTRATION_URI.GESTION_PROFILS.ADM_STATIC,
            params: {
              body: reqData
            },
            microservice: ConstanteWs._CODE_ADMINISTRATION,
            method: this.editMod ? ConstanteWs._CODE_PUT : ConstanteWs._CODE_POST
          };
          console.log(request);
          this.sharedService.commonWs(request).subscribe({
            next: (response: ResponseObject) => {
              if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
                if (this.editMod) {
                  this.toast.success('general.success_save');
                } else {
                  this.toast.success('general.success_save');
                }
                this.router.navigate(['/app/adm/gp']);
                this.isLoginLoading = false;
              } else {
                if (response.code == ConstanteWs._CODE_WS_ERROR_SAVE_OR_UPDATE) {
                  this.toast.error('general.errors.code_already_exist');
                  this.form.get('code').setValidators(Validators.required);
                  this.isLoginLoading = false;
                } else {
                  console.error(`Error in AjoutModifGestionProfilsComponent/onSave, error code :: ${response.code}`);
                  this.toast.error();
                  this.isLoginLoading = false;
                }

              }
            },
            error: (error) => {
              console.error(`Error in AjoutModifGestionProfilsComponent/onSave, error :: ${error}`);
              this.toast.error();
              this.isLoginLoading = false;
            }
          });
        } else {
          this.isLoginLoading = false;
        }
      });

    }
    console.log('responsePayload', this.responsePayload);

  }

  private initForm(data?) {
    this.form = this.formBuilder.group({
      // id:this.formBuilder.control(data.id),
      code: this.formBuilder.control(data.code, Validators.required),
      role: this.formBuilder.control(data.role, Validators.required),
      libelleEn: this.formBuilder.control(data.libelleEn, Validators.required)
      // flgActif: this.formBuilder.control(true),
      // idAdmApplication: this.formBuilder.control(1),
    });

    // this.form.value['id'] = data.id;


  }

  backToList() {
    this.router.navigate(['/app/adm/gp']);
  }


  // onValueSelected(event) {
  //     this.form.get('flgActif').setValue(event);
  // }

  setList(data) {
    console.log(data);
    if (data) {
      this.listAdmFonc = data;
    } else {
      this.listAdmFonc = [];
    }

  }
}
