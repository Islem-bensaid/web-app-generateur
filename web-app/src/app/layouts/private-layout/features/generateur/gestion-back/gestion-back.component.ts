import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";

import {
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from "@angular/forms";
import { SharedService } from "@shared/services/sharedWs/shared.service";
import { CriteriaSearch, Pagination, RequestObject, SearchObject, Sort } from "@shared/models";
import { ConstanteWs } from "@shared/constantes/ConstanteWs";
import { ResponseObject } from "@shared/models/ResponseObject";
import { ToastService } from "@shared/services";
import { isEmptyValue } from "@shared/tools";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "@shared/widgets";
import { DialogMSComponent } from "@privateLayout/features/generateur/gestion-back/dialog-ms/dialog-ms.component";
import { CommonModule } from '@angular/common';
import {
  DialogEditMsComponent
} from "@privateLayout/features/generateur/gestion-back/dialog-edit-ms/dialog-edit-ms.component";
import { Router } from "@angular/router";
import { GenerateurService } from "@privateLayout/shared/services/generateur.service";

@Component({
  selector: 'app-gestion-back',
  templateUrl: './gestion-back.component.html',
  styleUrls: ['./gestion-back.component.css'],

})
export class GestionBackComponent implements OnInit {
  springImg = "assets/images/gallery/spring-cloud.png";
  reportingImg = "assets/images/gallery/reporting.png";
  adminImg = "assets/images/gallery/administration.png";
  notifImg = "assets/images/gallery/notification.png";
  backEndPath: string
  form: UntypedFormGroup;
  formMs: UntypedFormGroup;
  formMsEureka: UntypedFormGroup;
  listMsType: [];
  connexion = false;
  params: any = [];
  listMsConfig: any = [];
  listProfils: any = [];
  openedMsList: any = [];
  idProfileSelected: any;
  selectedMs: any;
  msCustomIsClicked = false
  listMsTypeToShow: any[] = [];
  customMsOnly: any[];
  msCustomIsClickedArray: any[] = [];
  @ViewChild('checkboxList', { static: true }) checkboxList: ElementRef<HTMLDivElement>;
  msToCreateArray: any[] = [];
  propsToWriteArray: any[] = [];
  dataBasetables: string[];
   eurekaPortToSend: any;



  constructor(private generateurService: GenerateurService , private formBuilder: UntypedFormBuilder,private router: Router,
              private sharedService: SharedService , private toast: ToastService,public dialog: MatDialog) { }

  ngOnInit(): void {

    this.initForm();
    this.initFormMs()
    this.initFormEureka()
    this.initMsType()

    this.initPofils()


  }
  private initPofils() {
    const request: RequestObject = <RequestObject>{
      uri: "tProfile/",
      method: ConstanteWs._CODE_GET
    };
    this.sharedService.commonWs(request).subscribe({
      next: (response: ResponseObject) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {

          this.listProfils = <[]>response.payload;
          if (this.listProfils.length > 0) {
            this.idProfileSelected = this.listProfils[0].idProfile;
          }
          console.log(this.idProfileSelected)


          console.log(this.listProfils , ' liste des profils ');

        } else {
          console.error("Error in listMsType")
          ;
          this.toast.error();
        }
      },
      error: (error) => {
        console.error("Error in listMsType");
        this.toast.error();
      }
    });

  }
  initMsType() {
    const request: RequestObject = <RequestObject>{
      uri: "tNmTypeMs/",
      method: ConstanteWs._CODE_GET
    };
    this.sharedService.commonWs(request).subscribe({
      next: (response: ResponseObject) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {

          this.listMsType = <[]>response.payload;

          this.listMsTypeToShow = this.listMsType.filter(msType => msType["labelType"] === 'Eureka' || msType["labelType"] === 'Gateway');
          this.generateUniqueIdCheckbox();
          console.log(this.listMsType);
          console.log(this.listMsTypeToShow);

        } else {
          console.error("Error in listMsType")
          ;
          this.toast.error();
        }
      },
      error: (error) => {
        console.error("Error in listMsType");
        this.toast.error();
      }
    });
  }


  initSearchObject(data) {
    const searchObject = new SearchObject();
    searchObject.dataSearch = [new CriteriaSearch('idType', data, '=')];
    return searchObject;
  }
  getMsConfig(msType){

    const searchObject = new SearchObject();
    searchObject.dataSearch = [new CriteriaSearch('idType', msType.idType, '=') ,
      new CriteriaSearch('idProfil' , this.idProfileSelected ,'=')];
    console.log(searchObject)
    const request: RequestObject = <RequestObject>{
      uri: "tMsConf/data",
      method: ConstanteWs._CODE_POST,
      params: {
        body:  {"dataSearch":searchObject.dataSearch}
      }
    };

    this.sharedService.commonWs(request).subscribe({
      next: (response: ResponseObject) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {

          this.listMsConfig = <[]>response.payload.data
          console.log(<[]>response.payload);
          this.initFormCustomMs(msType)

        } else {
          console.error("Error in post ms conf ")
          ;
          this.toast.error();
        }
      },
      error: (error) => {
        console.error("Error in post ms conf ");
        this.toast.error();
      }
    });

  }


  getClickedMsId(e,msType) {


    if (e.target.checked) {

        this.msCustomIsClickedArray.push(msType.uniqueId)
        console.log(this.msCustomIsClickedArray, 'this.msCustomIsClickedArray CHECKED')

      // this.selectedMs =msType.idType
      console.log(msType.idType, 'console.log(e.target.id)')
      // this.getMsConfig(msType.idType)

    }


    else {
      console.log(e.target.id)
      console.log('notif is unchecked');

      this.listMsConfig = null
      this.openedMsList = null

        let index = this.msCustomIsClickedArray.indexOf(msType.uniqueId);
        if (index !== -1) {
          this.msCustomIsClickedArray.splice(index, 1);
        }
        console.log(this.msCustomIsClickedArray , 'msCustomIsClickedArray NOT CHEKDD')


    }

  }

  getFormControl(key) {
    return this.form.get(key) as UntypedFormControl;
  }
  getFormMsControl(key) {
    return this.formMs.controls[key] as UntypedFormControl;
  }
  getFormMsEurekaControl(key) {
    return this.formMsEureka.controls[key] as UntypedFormControl;
  }
   initForm() {

    this.form = this.formBuilder.group({
      nameDB: this.formBuilder.control('', Validators.required),
      hostDB: this.formBuilder.control('', Validators.required),
      portDB: this.formBuilder.control('', Validators.required),
      userName: this.formBuilder.control('', Validators.required),
      password: this.formBuilder.control('', Validators.required),
      portGateWay: this.formBuilder.control('', Validators.required),
      portMs: this.formBuilder.control('', Validators.required),

    });

  }

  initFormEureka() {
    this.formMsEureka = this.formBuilder.group({
      eurekaPort: this.formBuilder.control('', Validators.required),

    });
  }
   initFormMs() {
    this.formMs = this.formBuilder.group({});
  }
  initFormCustomMs(msType) {
    console.log(this.listMsConfig)

    for (const control of this.listMsConfig) {
      console.log(control)
      this.formMs.addControl(control.idConf, this.formBuilder.control('', Validators.required));

    }

    const newItems = this.listMsConfig.filter(item => !this.openedMsList.some(openedItem => openedItem.idConf === item.idConf));
    this.openedMsList = [...this.openedMsList, ...newItems];


    console.log(this.openedMsList, ' this.openedMsList');
    console.log(this.formMs, ' this.formMs ');
    console.log(this.formMs.value, ' this.formMs.value, ');
    console.log(this.formMs.controls, ' this.formMs.controls');
  }

  generateMs() {
    this.backEndPath=localStorage.getItem('backEndPath')
    console.log(this.backEndPath)
    const listMsSentToReverse= []
    const cloningPromises = []; // create an array to store promises for each clone operation

    this.listMsTypeToShow.forEach((item: any) => {
      if (item.labelType === "Gateway"){
        cloningPromises.push(this.generateurService.createDirectory(this.backEndPath, item.labelType)
          .toPromise()
          .then(() => {
            return this.generateurService.cloneGateway(this.backEndPath+'/'+item.labelType).toPromise();
          }));
        item.msPath = this.backEndPath+'/'+item.labelType;
        listMsSentToReverse.push(item)
      }
      else if (item.labelType === "Eureka"){
        cloningPromises.push(this.generateurService.createDirectory(this.backEndPath, item.labelType)
          .toPromise()
          .then(() => {
            return this.generateurService.cloneEureka(this.backEndPath+'/'+item.labelType).toPromise();
          }));
        item.msPath = this.backEndPath+'/'+item.labelType;
        listMsSentToReverse.push(item)
      }
      else if (item.labelType === "CustomMs" && this.isMsCustomClickedInList(item)) {
        cloningPromises.push(this.generateurService.createDirectory(this.backEndPath, item.labelToDisplay)
          .toPromise()
          .then(() => {
            return this.generateurService.cloneBlankMs(this.backEndPath+'/'+item.labelToDisplay).toPromise();
          }));
        item.msPath = this.backEndPath+'/'+item.labelToDisplay;
        listMsSentToReverse.push(item)
      }
      else if (item.labelType != "CustomMs" && this.isMsCustomClickedInList(item)){
        if (item.labelType === "GED"){
          cloningPromises.push(this.generateurService.createDirectory(this.backEndPath, item.labelType)
            .toPromise()
            .then(() => {
              return this.generateurService.cloneGed(this.backEndPath+'/'+item.labelType).toPromise();
            }));
          item.msPath = this.backEndPath+'/'+item.labelType;
          listMsSentToReverse.push(item)
        }
        else if (item.labelType === "Reporting"){
          cloningPromises.push(this.generateurService.createDirectory(this.backEndPath, item.labelType)
            .toPromise()
            .then(() => {
              return this.generateurService.cloneReporting(this.backEndPath+'/'+item.labelType).toPromise();
            }));
          item.msPath = this.backEndPath+'/'+item.labelType;
          listMsSentToReverse.push(item)
        }
        else if (item.labelType === "Administration"){
          cloningPromises.push(this.generateurService.createDirectory(this.backEndPath, item.labelType)
            .toPromise()
            .then(() => {
              return this.generateurService.cloneAdministration(this.backEndPath+'/'+item.labelType).toPromise();
            }));
          item.msPath = this.backEndPath+'/'+item.labelType;
          listMsSentToReverse.push(item)
        }
      }
    });

    // Wait for all cloning promises to resolve before navigating to the next page
    Promise.all(cloningPromises).then(() => {

      const eurekaPort = this.getFormMsEurekaControl('eurekaPort').value.trim();
      this.eurekaPortToSend = null
      if (eurekaPort  != null && eurekaPort  !== '') {
        this.eurekaPortToSend = eurekaPort
      }



      localStorage.setItem('listMsSentToReverse', JSON.stringify(listMsSentToReverse));
      console.log(this.propsToWriteArray, 'this.propsToWriteArray')
      this.generateurService.generateProperties(this.propsToWriteArray).subscribe(response => (
        this.generateurService.generateYml(this.propsToWriteArray ,listMsSentToReverse ,this.eurekaPortToSend  ).subscribe(res => console.log(res)),
      console.log(response)))
      this.router.navigate(['/app/gen/back-reverse']).then(r => {
        console.log('directories created ');
      });
    }).catch((error) => {
      console.error(error);
    });
  }



  closeMsCustom(){

  }

  openMsCustom(msType){
    this.getMsConfig(msType)
    console.log(msType,'AAAAAAAAAAAAAAAAAAAAAAAAAAAA')

  }

  testConnection() {
    const urlBD =  'jdbc:postgresql://'+this.getFormControl('hostDB').value.trim()+':'
      +this.getFormControl('portDB').value.trim()+'/'
      +this.getFormControl('nameDB').value.trim()
    console.log(urlBD)

    const password = this.getFormControl('password').value.trim()
    const username = this.getFormControl('userName').value.trim()
    this.generateurService.testConnection(urlBD, password, username).subscribe((response) => {
      if (response === 'Connexion avec la base de données OK') {
        this.connexion = true
        localStorage.setItem('url', urlBD);
        localStorage.setItem('password',password );
        localStorage.setItem('username', username);
        this.getDataBaseSchemas(urlBD ,password, username)

        this.toast.success('Connexion OK' )
      } else if (response === "Base de données n'existe pas") {
        this.connexion= false
        this.toast.error('Vérifiez vos coordonnées de la base de donnée')
      }
    });
  }
  getDataBaseSchemas(urlBD ,password, username) {
    this.generateurService.getDataBaseSchemas(urlBD ,password, username).subscribe(tables =>
      localStorage.setItem('tables', JSON.stringify(tables)));
  }


  createMS() : Promise<void> {
    return new Promise((resolve, reject) => {
    const checkboxInputs = this.checkboxList.nativeElement.querySelectorAll('input');
    const checkedMsTypes = [];

    checkboxInputs.forEach(input => {
      if (input.checked) {
        const msType = this.listMsTypeToShow.find(msType => msType.uniqueId === input.id);
        if (msType) {
          checkedMsTypes.push(msType);
        }
      }
    });
    console.log(checkedMsTypes, ' TEKHDEM 3LA HEDHI')

    this.msToCreateArray =  [];
    checkedMsTypes.forEach(msType => {
      let obj = {};
      obj['idProjet'] = 1;
      obj['nomMs'] = msType.labelToDisplay ? msType.labelToDisplay : msType.labelType;

      console.log(obj);
      // add any additional code you want to execute for each element in this.listMsTypeToShow here
      this.msToCreateArray.push(obj);
    });
    console.log(this.msToCreateArray,'msToCreatejArray');



    const request: RequestObject = <RequestObject>{
        uri: "tMicroservice/saveAll",
        method: ConstanteWs._CODE_POST,
        params: {
          body:  this.msToCreateArray
        }
      };

      this.sharedService.commonWs(request).subscribe({
        next: (response: ResponseObject) => {
          if (response.code == ConstanteWs._CODE_WS_SUCCESS) {


            console.log(<[]>response.payload ,' <[]>response.payload tMicroservice/saveAll');
            //this code to add a idCreatedMs attribute to the list of the microservices after post
            checkedMsTypes.forEach((checkedMsType) => {
              const matchingResponse = <[]>response.payload.find(
                (res) =>
                  res.nomMs === (checkedMsType.labelToDisplay || checkedMsType.labelType)
              );
              if (matchingResponse) {
                checkedMsType.idCreatedMs = matchingResponse['idMs'];
                checkedMsType.nomMsCreated = matchingResponse['nomMs'];
              }
            });
            this.listMsTypeToShow = checkedMsTypes
            console.log(this.listMsTypeToShow);
            resolve();




          } else {
            console.error("Error in post microservice ")
            ;
            // localStorage.setItem('isMsCreated', 'false');
            this.toast.error();
          }
        },
        error: (error) => {
          console.error("Error in post miscroservice");
          // localStorage.setItem('isMsCreated', 'false');
          this.toast.error();
          reject(error);
        }
      });
    });
  }
  async generateFromProfile() {

    try {
      await this.createMS(); // wait for createMS() to finish before proceeding

      // rest of the code here
    } catch (error) {
      console.error("Error in createMS()", error);
      // handle error here
    }


    ///////////////////////////////////////////////////////////////////////////
    let msValuesArray = [];

    console.log(this.openedMsList, ' this.openedMsList ')
    console.log(this.listMsTypeToShow, ' this.listMsTypeToShow ')
    for (const control of this.openedMsList) {
      // console.log(this.formMs.controls[control.cle].value.trim())
      // console.log(this.formMs.controls[control.cle])
      let obj = {};


      obj['valeur'] = this.formMs.controls[control.idConf].value.trim()
      obj['idMsConfig'] = control.idConf
      const msType = this.listMsTypeToShow.find(type => type.idType === control.idType);
      if (msType) {
        console.log(msType, 'created ms found')
        obj['idMs'] = msType.idCreatedMs;
      }

      msValuesArray.push(obj)
      // zid if(formMs valid) fel fou9 ... control.id walla na3rach
    }




    console.log(msValuesArray)

      const request: RequestObject = <RequestObject>{
        uri: "tMsConfValue/saveAll",
        method: ConstanteWs._CODE_POST,
        params: {
          body:  msValuesArray
        }
      };

      this.sharedService.commonWs(request).subscribe({
        next: (response: ResponseObject) => {
          if (response.code == ConstanteWs._CODE_WS_SUCCESS) {


            console.log(<[]>response.payload);

            const result = [];

            <[]>response.payload.forEach((payloadObj) => {
              const matchingOpenedMsObj = this.openedMsList.filter((openedMsObj) => {
                return payloadObj.idMsConfig === openedMsObj.idConf;
              })[0];

              if (matchingOpenedMsObj) {
                result.push({
                  valeur: payloadObj.valeur,
                  idMs: payloadObj.idMs,
                  cle: matchingOpenedMsObj.cle,
                  idProfil: matchingOpenedMsObj.idProfil,
                });
              }
            });
            result.forEach((obj) => {
              const profile = this.listProfils.find((p) => p.idProfile === obj.idProfil);
              obj.labelProfile = profile.labelProfile;
            });
            result.forEach(resultElem => {
              const listMsTypeToShowElem = this.listMsTypeToShow.find(ms => ms.idCreatedMs === resultElem.idMs);
              if (listMsTypeToShowElem) {
                this.backEndPath=localStorage.getItem('backEndPath')
                resultElem['msPath'] = this.backEndPath+'/'+listMsTypeToShowElem.nomMsCreated;
              }
            });

            this.propsToWriteArray = result
            console.log(result ,'result')
            console.log(this.listMsTypeToShow ,'this.listMsTypeToShow')





          } else {
            console.error("Error in post ms conf value ")
            ;
            this.toast.error();
          }
        },
        error: (error) => {
          console.error("Error in post ms conf value");
          this.toast.error();
        }
      });


  }


  onProfileLabelClick(idProfile) {
    this.idProfileSelected = idProfile

    //this.formMs.reset();
    // if (this.selectedMs != null) {
    //   this.getMsConfig(this.selectedMs)
    // }

    console.log(this.idProfileSelected)
  }

  changeClickMsState(msType) {
    if(msType.labelType === 'CustomMs'){
      this.msCustomIsClickedArray.push(msType.uniqueId)
      console.log(this.msCustomIsClickedArray, 'this.msCustomIsClickedArray')
    }
  }


  openDialog() {
     const dialogRef = this.dialog.open(DialogMSComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    dialogRef.backdropClick().subscribe(() => {
      console.log('Clicked outside the dialog');
    });
  }


  openEureka() {

  }

  closeEureka() {

  }

  openGateway() {

  }

  closeGateway() {

  }

  addToListMsType() {

    const listMsTypeToSend = this.listMsType
      .filter(msType => msType["labelType"] != 'Eureka' && msType["labelType"] != 'Gateway');
      this.sharedService.openDialog(DialogMSComponent
        , { listMsType : listMsTypeToSend }).subscribe((response) => {
        if (response) {
          console.log(response, 'hedhi reponse')
          response.forEach((item) => {
            const foundItem = this.listMsTypeToShow.find((x) => x.idType === item.idType && x.labelToDisplay === item.labelToDisplay);
            if (!foundItem) {
              this.listMsTypeToShow.push(item);
              this.generateUniqueIdCheckbox();
              this.customMsOnly = this.listMsTypeToShow
              console.log(this.listMsTypeToShow, 'list to show')
              console.log(this.customMsOnly, 'customMsOnly')
            }
          });

        }
      });

    }


   generateUniqueIdCheckbox() {
    for (let i = 0; i < this.listMsTypeToShow.length; i++) {
      this.listMsTypeToShow[i].uniqueId = `checkbox_${i}`;
    }
  }

  isMsCustomClickedInList(msType): boolean {
    return this.msCustomIsClickedArray.includes(msType.uniqueId);
  }

  openPreDefinedMS() {

  }

  closePreDefinedMS() {

  }


  test() {
    const eurekaPort = this.getFormMsEurekaControl('eurekaPort').value.trim();
    this.eurekaPortToSend = ''
    if (eurekaPort  != null && eurekaPort  !== '') {
      this.eurekaPortToSend = eurekaPort
    }
    console.log(this.eurekaPortToSend)
  }


  removeFromListToShow(msType) {
    console.log(msType)
    const index = this.listMsTypeToShow.findIndex(obj => obj.uniqueId === msType.uniqueId);
    if (index >= 0) {
      this.listMsTypeToShow.splice(index, 1);
    }
    let indexCheck = this.msCustomIsClickedArray.indexOf(msType.uniqueId);
    if (indexCheck !== -1) {
      this.msCustomIsClickedArray.splice(indexCheck, 1);
    }
    ////delete mel checkbox checked list
      console.log(this.listMsTypeToShow)
      console.log(this.msCustomIsClickedArray)
    }


  onClickEditLabel(msType) {
    const dialogRef = this.dialog.open(DialogEditMsComponent, {

      data: { label: msType.labelToDisplay , uniqueid : msType.uniqueId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedList = this.listMsTypeToShow.map(item => {
          if (item.uniqueId === result.uniqueid) {
            return {
              ...item,
              labelToDisplay: result.label
            };
          }
          let indexCheck = this.msCustomIsClickedArray.indexOf(msType.uniqueId);
          if (indexCheck !== -1) {
            this.msCustomIsClickedArray.splice(indexCheck, 1);
          }
          return item;
        });
        this.listMsTypeToShow = updatedList
        console.log(updatedList);
      }
    });
  }

}
