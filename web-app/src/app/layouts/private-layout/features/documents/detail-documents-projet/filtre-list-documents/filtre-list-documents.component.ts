import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { isEmptyValue } from '@shared/tools';
import { CriteriaSearch } from '@shared/models';
import { COMMON_TYPES_CODES } from '@privateLayout/shared/constantes/common/Constantes';
import { PhotoReportsMetadata } from '@privateLayout/shared/constantes/media/media-metadata';

@Component({
  selector: 'app-filtre-list-medias',
  templateUrl: './filtre-list-documents.component.html',
  styleUrls: ['./filtre-list-documents.component.css']
})
export class FiltreListDocumentsComponent implements OnInit {

  @Output() searchoptions = new EventEmitter<Partial<any>>();

  form: UntypedFormGroup;
  showMoreFilterOptions: boolean = false;
  params: any = {};

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initParams();
    this.form = this.initForm();
  }

  initParams() {
    this.params['formControls'] = PhotoReportsMetadata.filtreFicheListMedia.form.controls;
  }

  initForm() {
    const tempForm: UntypedFormGroup = this.formBuilder.group({});
    for (const control of this.params['formControls']) {
      tempForm.addControl(control.key, new FormControl(null, (control.required ? [Validators.required] : [])));
    }
    return tempForm;
  }

  getFormControl(index: number) {
    return this.form.get(this.params['formControls'][index].key) as UntypedFormControl;
  }

  getLabel(index: number) {
    return this.params['formControls'][index].label;
  }

  onSearch() {
    const searchvalue = [];
    // debugger;
    // const textControls = this.params['formControls'].filter(c => (isEmptyValue(c.type) || c.type == COMMON_TYPES_CODES.TEXT));
    this.params['formControls'].forEach((c: any) => {
      const keySearch = isEmptyValue(c.criteriaSearch) || isEmptyValue(c.criteriaSearch?.key) ? c.key : c.criteriaSearch.key;
      const specificSearch = isEmptyValue(c.criteriaSearch) || isEmptyValue(c.criteriaSearch?.specificSearch) ? 'upper_like' : c.criteriaSearch.specificSearch;
      if (!isEmptyValue(this.form.get(c.key).value)) {
        searchvalue.push(new CriteriaSearch(
          keySearch,
          this.form.get(c.key).value,
          specificSearch
        ));
      }
    });
    this.searchoptions.emit(searchvalue);
  }

  onReset() {
    this.form.reset();
    this.searchoptions.emit(null);
  }

}
