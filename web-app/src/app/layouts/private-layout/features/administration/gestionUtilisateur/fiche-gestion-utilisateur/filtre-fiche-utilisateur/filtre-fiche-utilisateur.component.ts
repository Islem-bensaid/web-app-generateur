import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, FormGroupDirective } from '@angular/forms';
import { AppTranslateService } from '@shared/services';
import {
  GestionProfilsMetadata
} from '@privateLayout/shared/constantes/administration/gestion-profils/gestion-profils-metadata';
import { CriteriaSearch, SelectMetadata } from '@shared/models';

@Component({
  selector: 'app-filtre-fiche-utilisateur',
  templateUrl: './filtre-fiche-utilisateur.component.html',
  styleUrls: ['./filtre-fiche-utilisateur.component.css']
})
export class FiltreFicheUtilisateurComponent implements OnInit {

  @Output() searchoptions = new EventEmitter<Partial<any>>();
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  labels: any;
  public options = {};
  form = this.formBuilder.group({
    login: this.formBuilder.control(null),
    matricule: this.formBuilder.control(null),
    orgFr: this.formBuilder.control(null),
    isActif: this.formBuilder.control(null)
  });
  selectEtatProfil: SelectMetadata;
  listStatus: any;
  showMoreFilterOptions: boolean = false;

  constructor(private formBuilder: UntypedFormBuilder,
              private appTranslateService: AppTranslateService
  ) {
  }

  ngOnInit(): void {
    this.listStatus = GestionProfilsMetadata.selectDataEtatProdil;
    this.selectEtatProfil = <SelectMetadata>GestionProfilsMetadata.selectMetaDataEtatlUser;
    this.labels = GestionProfilsMetadata.labelsSearchFiltreGestionUtilisateur;
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
    if (this.form.get('matricule').value) {
      searchvalue.push(new CriteriaSearch(
        'matricule',
        this.form.value.matricule || undefined,
        'upper_like'
      ));
    }
    if (this.form.get('orgFr').value) {
      searchvalue.push(new CriteriaSearch(
        'orgFr',
        this.form.value.orgFr || undefined,
        'upper_like'
      ));
    }
    console.log(this.form.get('isActif').value);

    if (this.form.get('isActif').value!=null) {
      let searchSelect :string = 'Non actif';
      if (this.form.value.isActif == true) {
        searchSelect = 'Actif';
      }
      console.log(searchSelect)
      searchvalue.push(new CriteriaSearch(
        'isActifFr',
        searchSelect,
        'equals'
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
