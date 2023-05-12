import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ToastService } from "@shared/services";
import { SharedService } from "@shared/services/sharedWs/shared.service";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { catchError } from "rxjs/operators";
import { Project } from "@privateLayout/shared/models";
import { RequestObject } from "@shared/models";
import { FormGroup } from "@angular/forms";
import { ConstanteWs } from "@shared/constantes/ConstanteWs";
import { ResponseObject } from "@shared/models/ResponseObject";

interface FileNode {
  name: string;
  type: string;
  children?: FileNode[];
}



@Injectable({
  providedIn: 'root'
})
export class GenerateurService {
  private createDirectoryUrl = 'http://localhost:8199/projet/api/generateur/directory/createDirectory?path='
  private getDesktopUrl ='http://localhost:8199/projet/api/generateur/directory/desktopPath'
  private cloneUrl ='http://localhost:8199/projet/api/generateur/directory/clone'
  private createProjectUrl = 'http://localhost:8199/projet/api/generateur/tProjet/'
  private testConnectionUrl = 'http://localhost:8199/projet/api/generateur/directory/test-database'
  private getDataBaseSchemasUrl= 'http://localhost:8199/projet/api/generateur/reverse/getAllTables'
  private reverseTablesUrl= 'http://localhost:8199/projet/api/generateur/reverse/reverse'
  private generatePropsUrl= 'http://localhost:8199/projet/api/generateur/prop/generateprop'
  private generateYmlUrl= 'http://localhost:8199/projet/api/generateur/prop/generateyml'
  id:number;

  node:any;

  formDataTable:FormGroup;
  listMsType: [];
  urlBD: any;
  username: any;
  password: any;


  constructor(
    private http: HttpClient,
    private toast: ToastService,
    private router: Router,
    private sharedService: SharedService

  ) { }

  createDirectory(directoryPath , projectName) : Observable<any> {


    return this.http.post<any>(this.createDirectoryUrl+directoryPath+'/'+projectName,null).pipe(
      tap(response => console.log('placeholder')),
      catchError(error => {
        this.toast.error(`Le nom du projet existe déjà, veuillez saisir un nouveau nom de projet`, { classname: 'bg-danger text-light', delay: 5000 });
        return [];
      }),
    );

  }
  createProject(project : Project){
    return this.http.post<any>(this.createProjectUrl,project)
  }

  getDesktopPath() {
    return this.http.get(this.getDesktopUrl,{responseType: 'text'})
  }





  cloneGateway(path){
    const body = {
      "remoteUrl": "https://gitlab.com/ghridki.oussema/gateway.git",
      "username": "",
      "password": "",
      "localPath": path
    };
    console.log(body)
    return this.http.post(this.cloneUrl,body,{responseType: 'text'})
  }
  cloneEureka(path){
    const body = {
      "remoteUrl": "https://gitlab.com/ghridki.oussema/eureka.git",
      "username": "",
      "password": "",
      "localPath": path
    };
    console.log(body)
    return this.http.post(this.cloneUrl,body,{responseType: 'text'})
  }
  cloneAdministration(path){
    const body = {
      "remoteUrl": "https://gitlab.com/ghridki.oussema/administration.git",
      "username": "",
      "password": "",
      "localPath": path
    };
    console.log(body)
    return this.http.post(this.cloneUrl,body,{responseType: 'text'})
  }
  cloneBlankMs(path){
    const body = {
      "remoteUrl": "https://gitlab.com/ghridki.oussema/blankms.git",
      "username": "",
      "password": "",
      "localPath": path
    };
    console.log(body)
    return this.http.post(this.cloneUrl,body,{responseType: 'text'})
  }
  cloneGed(path){
    const body = {
      "remoteUrl": "https://gitlab.com/ghridki.oussema/ged.git",
      "username": "",
      "password": "",
      "localPath": path
    };
    console.log(body)
    return this.http.post(this.cloneUrl,body,{responseType: 'text'})
  }
  cloneReporting(path){
    const body = {
      "remoteUrl": "https://gitlab.com/ghridki.oussema/reporting.git",
      "username": "",
      "password": "",
      "localPath": path
    };
    console.log(body)
    return this.http.post(this.cloneUrl,body,{responseType: 'text'})
  }


  testConnection(urlBD,password,username) {
    const params = new HttpParams()
      .set('url', urlBD)
      .set('username', username)
      .set('password', password)

    return this.http.get(this.testConnectionUrl, {params , responseType: 'text'});
  }

  getDataBaseSchemas(urlBD ,password, username) {
    const params = new HttpParams()
      .set('url', urlBD)
      .set('username', username)
      .set('password', password)
    return this.http.get<string[]>(this.getDataBaseSchemasUrl,{params});
  }

  reverseTable(selectedTables,urlBD ,password, username) {
    const params = new HttpParams()
      .set('url', urlBD)
      .set('username', username)
      .set('password', password)
    return this.http.post(this.reverseTablesUrl,selectedTables,{params});
  }

  generateProperties(propsToWriteArray) {
    return this.http.post(this.generatePropsUrl,propsToWriteArray,{ responseType: 'text'})
  }

  generateYml(propsToWriteArray , listMsSentToReverse, eurekaPort) {
    const requestData = {
      propsToWriteArray: propsToWriteArray,
      listMsSentToReverse: listMsSentToReverse,
      eurekaPort : eurekaPort
    };

    return this.http.post(this.generateYmlUrl,requestData,{ responseType: 'text'})
  }
}
