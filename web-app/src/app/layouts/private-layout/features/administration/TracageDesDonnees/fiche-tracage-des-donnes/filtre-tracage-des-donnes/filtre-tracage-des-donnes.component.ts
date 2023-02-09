import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, FormGroupDirective} from "@angular/forms";
import {CriteriaSearch, SelectMetadata} from "@shared/models";
import {AppTranslateService} from "@shared/services";
import {
  GestionProfilsMetadata
} from "@privateLayout/shared/constantes/administration/gestion-profils/gestion-profils-metadata";

@Component({
  selector: 'app-filtre-tracage-des-donnes',
  templateUrl: './filtre-tracage-des-donnes.component.html',
  styleUrls: ['./filtre-tracage-des-donnes.component.css']
})
export class FiltreTracageDesDonnesComponent implements OnInit {

  @Output() searchoptions = new EventEmitter<Partial<any>>();
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  labels: any
  public options = {};
  form = this.formBuilder.group({
    nomUser: this.formBuilder.control(null),
    httpMethod: this.formBuilder.control(null),
    nameService: this.formBuilder.control(null),
    case_:this.formBuilder.control(null)
  });
  showMoreFilterOptions: boolean = false;

  selecMethode: any;
  listMethode: any;

  listService: any;
  selectServiceName: any;
  constructor(private formBuilder: UntypedFormBuilder,
              private appTranslateService: AppTranslateService
  ) {
  }
  ngOnInit(): void {
    this.listService=GestionProfilsMetadata.selectDataService;
    this.selectServiceName = <SelectMetadata>GestionProfilsMetadata.selectMetaDataService;

    this.listMethode=GestionProfilsMetadata.selectDataReq;
    this.selecMethode = <SelectMetadata>GestionProfilsMetadata.selectMetaDataReq;

    this.labels = GestionProfilsMetadata.labelsSearchFiltreTDD;
  }
  getFormControl(key) {
    return this.form.get(key) as UntypedFormControl;
  }

  getLabel(control: string) {
    return this.labels[control];
  }

  onSearch() {
    const searchvalue = [];
    if (this.form.get('nomUser').value) {
      searchvalue.push(new CriteriaSearch(
          'nomUser',
          this.form.value.nomUser || undefined,
          'upper_like'
      ));
    }
    if (this.form.get('nameService').value) {
      searchvalue.push(new CriteriaSearch(
          'nameService',
          this.form.value.nameService,
          'like'
      ));
    }
    if (this.form.get('httpMethod').value) {
      searchvalue.push(new CriteriaSearch(
          'httpMethod',
          this.form.value.httpMethod,
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
