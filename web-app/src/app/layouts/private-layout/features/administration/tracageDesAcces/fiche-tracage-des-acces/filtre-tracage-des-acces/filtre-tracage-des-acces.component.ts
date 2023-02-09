import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, FormGroupDirective} from "@angular/forms";
import {CriteriaSearch, SelectMetadata} from "@shared/models";
import {AppTranslateService} from "@shared/services";
import {
  GestionProfilsMetadata
} from "@privateLayout/shared/constantes/administration/gestion-profils/gestion-profils-metadata";

@Component({
  selector: 'app-filtre-tracage-des-acces',
  templateUrl: './filtre-tracage-des-acces.component.html',
  styleUrls: ['./filtre-tracage-des-acces.component.css']
})
export class FiltreTracageDesAccesComponent implements OnInit {

  @Output() searchoptions = new EventEmitter<Partial<any>>();
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  labels: any
  public options = {};
  form = this.formBuilder.group({
    login: this.formBuilder.control(null),
    nomUser: this.formBuilder.control(null),
    codeAccess: this.formBuilder.control(null),
  });
  selectEtatProfil: SelectMetadata;
  listStatus: any;
  showMoreFilterOptions: boolean = false;
  constructor(private formBuilder: UntypedFormBuilder,
              private appTranslateService: AppTranslateService
  ) {
  }
  ngOnInit(): void {
    this.listStatus = GestionProfilsMetadata.selectStatusReq;
    this.selectEtatProfil = <SelectMetadata>GestionProfilsMetadata.selectMetaDataEtatReq;
    this.labels = GestionProfilsMetadata.labelsSearchFiltreTDA;
  }
  getFormControl(key) {
    return this.form.get(key) as UntypedFormControl;
  }

  getLabel(control: string) {
    return this.labels[control];
  }

  onSearch() {
    const searchvalue = [];
    if (this.form.get('login').value) {
      searchvalue.push(new CriteriaSearch(
          'login',
          this.form.value.login || undefined,
          'upper_like'
      ));
    }
    if (this.form.get('nomUser').value) {
      searchvalue.push(new CriteriaSearch(
          'nomUser',
          this.form.value.nomUser || undefined,
          'upper_like'
      ));
    }

    if (this.form.get('codeAccess').value) {
      searchvalue.push(new CriteriaSearch(
          'codeAccess',
          this.form.value.codeAccess,
          'like'
      ));
    }
    this.options = searchvalue;
    this.searchoptions.emit(this.options);
    this.options = {};
  }

  onReset() {
    this.form.reset();
    this.formDirective.resetForm();
    this.searchoptions.emit(null);
  }


}
