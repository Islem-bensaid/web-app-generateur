import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ProjetMetadata } from '@privateLayout/shared/constantes/projet/projet-metadata';
import { isEmptyValue } from '@shared/tools';
import { CriteriaSearch } from '@shared/models';

@Component({
  selector: 'app-filtre-list-tasks',
  templateUrl: './filtre-list-tasks.component.html',
  styleUrls: ['./filtre-list-tasks.component.css']
})
export class FiltreListTasksComponent implements OnInit {

  @Output() searchoptions = new EventEmitter<Partial<any>>();

  form: UntypedFormGroup;
  showMoreFilterOptions: boolean = false;
  params: any = {};

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initParams();
    // this.initListNm();
    this.form = this.initForm();
  }

  initParams() {
    this.params['form'] = ProjetMetadata.ficheDetailsProjet5D.filtreListDetailProjetTasks.form.controls;
  }

  initForm() {
    const tempForm: UntypedFormGroup = this.formBuilder.group({});
    for (const control of this.params['form']) {
      tempForm.addControl(control.key, new FormControl(null, (control.required ? [Validators.required] : [])));
    }
    return tempForm;
  }

  getFormControl(index: number) {
    return this.form.get(this.params['form'][index].key) as UntypedFormControl;
  }

  getLabel(index: number) {
    return this.params['form'][index].label;
  }

  onSearch() {
    const searchvalue = {};
    for (let i = 0; i < this.params['form'].length; i++) {
      if (!isEmptyValue(this.getFormControl(i).value)) {
        searchvalue[this.params['form'][i].key] = this.getFormControl(i).value || null
      }
    }
    this.searchoptions.emit(searchvalue);
  }

  onReset() {
    this.form.reset();
    this.searchoptions.emit(null);
  }

}
