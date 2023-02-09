import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { LiveCameraMetadata } from '@privateLayout/shared/constantes/media/media-metadata';
import { isEmptyValue } from '@shared/tools';
import { CriteriaSearch } from '@shared/models';

@Component({
  selector: 'app-filtre-live-camera',
  templateUrl: './filtre-live-camera.component.html',
  styleUrls: ['./filtre-live-camera.component.css']
})
export class FiltreLiveCameraComponent implements OnInit {

  @Output() searchoptions = new EventEmitter<any>();

  form: UntypedFormGroup;
  showMoreFilterOptions: boolean = false;
  params: any = {};

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.initParams();
  }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initParams() {
    this.params['formControls'] = LiveCameraMetadata.filterLiveCamera.form.controls;
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
