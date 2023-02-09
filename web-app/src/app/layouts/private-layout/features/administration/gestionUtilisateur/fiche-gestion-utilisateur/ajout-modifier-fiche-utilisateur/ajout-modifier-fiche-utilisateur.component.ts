import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { AppTranslateService, ConfirmDialogService, ToastService } from '@shared/services';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import {
  GestionProfilsMetadata
} from '@privateLayout/shared/constantes/administration/gestion-profils/gestion-profils-metadata';
import { Pagination, RequestObject, SearchObject, SelectMetadata, Sort } from '@shared/models';
import { ADMINISTRATION_URI } from '@privateLayout/shared/constantes';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { ResponseObject } from '@shared/models/ResponseObject';
import { CustomValidators } from '@shared/tools';

@Component({
  selector: 'app-ajout-modifier-fiche-utilisateur',
  templateUrl: './ajout-modifier-fiche-utilisateur.component.html',
  styleUrls: ['./ajout-modifier-fiche-utilisateur.component.css']
})
export class AjoutModifierFicheUtilisateurComponent implements OnInit {
  idRcOrganisme: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private toast: ToastService,
    private formBuilder: UntypedFormBuilder,
    private confirmDialogService: ConfirmDialogService,
    public appTranslateService: AppTranslateService
  ) {
  }

  params: any = {};
  listChecked: any = [];
  id: string;
  editMod: boolean;
  title: string;
  form: UntypedFormGroup;
  formPersonnel: UntypedFormGroup;
  labels: any;
  isLoading: boolean = false;
  selectSexeList: SelectMetadata;
  listSexe: any;
  selectEtatProfil: SelectMetadata;
  listStatus: any;
  searchObject: SearchObject;
  responsePayload: any = [];
  listProfilUser: any = [];
  idUser: any;
  maxDate: any;

  ngOnInit(): void {
    this.getDateNow();
    this.searchObject = this.initSearchObject();
    this.initMetadata();
    this.initParams();
  }

  initParams() {

  }

  async getDateNow() {
    this.maxDate = await this.sharedService.dateNow();
  }

  async initMetadata() {
    this.selectEtatProfil = <SelectMetadata>(
      GestionProfilsMetadata.selectMetaDataEtatProfil
    );
    this.listStatus = GestionProfilsMetadata.selectDataEtatProdil;
    this.listSexe = GestionProfilsMetadata.nmSexeList;
    this.labels = GestionProfilsMetadata.AddEditGestionUtilisateurs;
    this.selectSexeList = <SelectMetadata>(GestionProfilsMetadata.selectMetaDataSexeList);
    this.id = this.activatedRoute.snapshot.params.id;
    this.editMod = this.activatedRoute.snapshot.data.type == 'e';
    if (this.editMod) {
      this.initData();
      this.title = 'adm.gu.edit';
    } else {
      this.initDataList();
      this.initForm();
      this.title = 'adm.gu.add';
    }
  }

  getFormControl(key, form) {
    if (form == 'form') {
      return this.form.get(key) as UntypedFormControl;
    } else {
      return this.formPersonnel.get(key) as UntypedFormControl;
    }
  }

  getLabel(control: string) {
    return this.labels[control];
  }


  backToList() {
    this.router.navigate(['/app/adm/gu']);
  }


  initForm(data?) {
    this.form = this.formBuilder.group({
      // id: this.formBuilder.control(data?.idAdmUser),
      login: this.formBuilder.control(data?.login, Validators.required),
      password: this.formBuilder.control(null),
      confirmPassword: this.formBuilder.control(null),
      actif: this.formBuilder.control(data?.isActif, Validators.required)
    });
    this.formPersonnel = this.formBuilder.group({
      prenom: this.formBuilder.control(data?.prenom, Validators.required),
      nom: this.formBuilder.control(data?.nom, Validators.required),
      dtNaissance: this.formBuilder.control(
        data?.dtNaissance,
        Validators.required
      ),
      sexe: this.formBuilder.control(data?.sexe, Validators.required),
      mail: this.formBuilder.control(data?.mail, [
        Validators.required,
        CustomValidators.emailValidator()
      ]),
      numTel: this.formBuilder.control(data?.num_tel, [
        Validators.required,
        CustomValidators.havenumber()
      ])
    });
  }


  initSearchObject() {
    const searchObject = new SearchObject();
    searchObject.pagination = new Pagination(0, 10);
    searchObject.sort = new Sort('id', 'desc nulls last');
    searchObject.listCol = [
      'id',
      'code',
      'libelleAr',
      'libelleFr',
      'libelleEn',
      'role',
      'dtAjout'
    ];

    return searchObject;
  }

  initData() {
    if (this.editMod) {
      const request: RequestObject = <RequestObject>{
        uri: ADMINISTRATION_URI.GESTION_USER.ADM_USER_DETAILS,
        params: {
          path: [this.id]
        },

        microservice: ConstanteWs._CODE_ADMINISTRATION,
        method: ConstanteWs._CODE_GET
      };
      this.sharedService.commonWs(request).subscribe({
        next: (response: ResponseObject) => {
          if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
            this.initForm(response.payload.admUser);
            this.idUser = response.payload.admUser.idAdmUser;
            this.listChecked = [];
            this.listProfilUser = [];

            for (let i = 0; i < response.payload.listProfile.length; i++) {
              if (response.payload.listProfile[i].isChecked == true) {
                this.listChecked.push(response.payload.listProfile[i]);
                let dataTest = {
                  idAdmProfil: response.payload.listProfile[i].id,
                  idAdmUtilisateur: this.idUser,
                  dtMaj: response.payload.listProfile[i].dtMaj.substr(0, 10)
                };
                this.listProfilUser.push(dataTest);
              }

            }
            this.initDataP(this.searchObject);

          } else {
            console.error(
              `Error in FicheGestionProfilsComponent/initData, error code :: ${response.code}`
            );
            this.responsePayload['isLoading'] = false;
            this.toast.error();
          }
        },
        error: (error) => {
          console.error(
            `Error in FicheGestionProfilsComponent/initData, error :: ${error}`
          );
          this.responsePayload['isLoading'] = false;
          this.toast.error();
        }
      });
    }
  }

  initDataP(searchObject: SearchObject) {
    if (this.editMod) {
      const request: RequestObject = <RequestObject>{
        uri: ADMINISTRATION_URI.GESTION_PROFILS.ADM_USER_EDIT,
        params: {
          query: {
            lim: searchObject.pagination.limit,
            page: searchObject.pagination.offSet
          }
        },

        microservice: ConstanteWs._CODE_ADMINISTRATION,
        method: ConstanteWs._CODE_GET
      };
      // this.responsePayload['isLoading'] = true;
      this.sharedService.commonWs(request).subscribe({
        next: (response: ResponseObject) => {
          if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
            this.responsePayload = {
              data: response.payload,
              count: response.payload.length
            };
            console.log(' this.responsePayload', this.responsePayload.data);


            for (let i = 0; i < this.responsePayload.data.length; i++) {
              for (let j = 0; j < this.listChecked.length; j++) {
                if (this.listChecked[j].id == this.responsePayload.data[i].id) {
                  this.responsePayload.data[i]['isChecked'] = true;
                }
              }
            }

          } else {
            console.error(`Error in AjoutModifGestionProfilsComponent/initDataP, error code :: ${response.code}`);
            this.toast.error();
          }
        },
        error: (error) => {
          console.error(
            `Error in FicheGestionProfilsComponent/initData, error :: ${error}`
          );
          this.toast.error();
          // this.responsePayload['isLoading'] = false
        }
      });
    }
  }

  initDataList() {
    if (!this.editMod) {
      const request: RequestObject = <RequestObject>{
        uri: ADMINISTRATION_URI.GESTION_PROFILS.DATA,
        params: {
          body: this.searchObject
        },
        microservice: ConstanteWs._CODE_ADMINISTRATION,
        method: ConstanteWs._CODE_POST
      };
      this.sharedService.commonWs(request).subscribe({
        next: (response: ResponseObject) => {
          if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
            this.responsePayload = response.payload;
          } else {
            console.error(`Error in FicheGestionProfilsComponent/initData, error code :: ${response.code}`);
            this.toast.error();
          }
        },
        error: (error) => {
          console.error(`Error in FicheGestionProfilsComponent/initData, error :: ${error}`);
          this.toast.error();
        }
      });
    }
  }

  onSortListProfil(sort: any) {
    this.searchObject.sort = sort;
    this.initDataList();
  }


  onPaginateListProfil(pagination: Pagination) {
    this.searchObject.pagination = pagination;
    this.initDataList();
    this.initDataP(this.searchObject);
  }

  generateListProfil(listProfile) {
    let list1 = [];
    let list2 = [];
    for (let i = 0; i < listProfile.length; i++) {
      if (listProfile[i]['isChecked']) {
        list1.push(listProfile[i]);
      } else {
        list2.push(listProfile[i]);
      }
    }
    list1 = list1.concat(list2);
    this.responsePayload['data'] = list1;
  }

  setDataProfil(event) {
    let data;
    if (this.editMod) {
      data = {
        idAdmProfil: event.data.id,
        idAdmUtilisateur: this.idUser,
        dtMaj: event.data.dtMaj.substr(0, 10)
      };
    } else {
      data = {
        idAdmProfil: event.data.id
      };
    }

    if (event.event.checked == true) {
      this.listProfilUser.push(data);
    }
    if (event.event.checked == false) {
      let index = 0;
      for (let i = 0; i < this.listProfilUser.length; i++) {
        if (this.listProfilUser[i].idAdmProfil == data.idAdmProfil) {
          index = i;
          break;
        }
      }
      this.listProfilUser.splice(index, 1);
    }
  }


  onSave() {
    this.formPersonnel.markAllAsTouched();
    this.form.markAllAsTouched();
    if (this.form.valid && this.formPersonnel.valid) {
      this.isLoading = true;
      if (
        this.form.get('password').value !=
        this.form.get('confirmPassword').value
      ) {
        this.toast.error('adm.gu.mdpError');
        this.form.get('password').setValue(null);
        this.form.get('confirmPassword').setValue(null);
        this.isLoading = false;
      } else {
        this.confirmDialogService.confirm().subscribe((flag) => {
          if (flag) {
            let obj = {};
            obj = this.form.value;
            obj['admPersonnel'] = this.formPersonnel.value;
            obj['listProfiles'] = this.listProfilUser;
            if (this.editMod) {
              obj['admPersonnel']['dtNaissance'] = obj['admPersonnel'][
                'dtNaissance'
                ].substr(0, 10);
              obj['id'] = this.id;
            }
            const request: RequestObject = <RequestObject>{
              uri: ADMINISTRATION_URI.GESTION_USER.ADM_USER_ADD,
              params: {
                body: obj
              },
              microservice: ConstanteWs._CODE_ADMINISTRATION,
              method: this.editMod ? ConstanteWs._CODE_PUT : ConstanteWs._CODE_POST
            };
            this.sharedService.commonWs(request).subscribe({
              next: (response: ResponseObject) => {
                if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
                  if (this.editMod) {
                    this.toast.success('general.success_edit');
                  } else {
                    this.toast.success('general.success_save');
                  }
                  this.router.navigate(['/app/adm/gu']);
                  this.isLoading = false;
                } else {
                  if (response.code == ConstanteWs._CODE_WS_LOGIN_EXISTS) {
                    this.toast.error('general.errors.code_already_exist');
                    this.form.get('login').setValue(null);
                    this.isLoading = false;
                  } else {
                    console.error(`Error in AjoutModifierFicheUtilisateurComponent/onSave, error code :: ${response.code}`);
                    this.toast.error();
                    this.isLoading = false;
                  }
                }
              },
              error: (error) => {
                console.error(`Error in AjoutModifierFicheUtilisateurComponent/onSave, error :: ${error}`);
                this.toast.error();
                this.isLoading = false;
              }
            });
          } else {
            this.isLoading = false;
          }
        });
      }
    } else {
      this.toast.error('general.errors.form_invalid');
    }
  }
}
