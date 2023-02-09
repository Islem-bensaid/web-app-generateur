import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";

import {UntypedFormBuilder, UntypedFormControl, FormGroupDirective} from "@angular/forms";

import {CriteriaSearch} from "@shared/models";
import {
    GestionProfilsMetadata
} from "@privateLayout/shared/constantes/administration/gestion-profils/gestion-profils-metadata";
import {AppTranslateService} from "@shared/services";

@Component({
    selector: 'app-filtre-gestion-profils',
    templateUrl: './filtre-gestion-profils.component.html',
    styleUrls: ['./filtre-gestion-profils.component.css']
})
export class FiltreGestionProfilsComponent implements OnInit {

    @Output() searchoptions = new EventEmitter<Partial<any>>();
    @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
    labels :any
    public options = {};
    form = this.formBuilder.group({
        code: this.formBuilder.control(null),
        libelle: this.formBuilder.control(null),
        dtAjoutBefore: this.formBuilder.control(null),
        dtAjoutAfter: this.formBuilder.control(null),
    });
    showMoreFilterOptions: boolean = false;

    constructor(private formBuilder: UntypedFormBuilder,
                private appTranslateService: AppTranslateService
    ) {
    }

    ngOnInit(): void {
        this.labels = GestionProfilsMetadata.labelsSearchFiltre;
    }

    getFormControl(key) {
        return this.form.get(key) as UntypedFormControl;
    }
    getLabel(control: string) {
        return this.labels[control];
    }

    onSearch() {
        const searchvalue = [];
        if (this.form.get('code').value){
            searchvalue.push( new CriteriaSearch(
                'code',
                this.form.value.code || undefined,
                'upper_like'
            ));
        }
        if (this.form.get('libelle').value){
            searchvalue.push( new CriteriaSearch(

                this.appTranslateService.getDefaultLang()=='fr'?'libelleFr':this.appTranslateService.getDefaultLang()=='ar'?'libelleFr':'libelleEn',
                this.form.value.libelle || undefined,
                'upper_like'
            ));
        }
        if (this.form.get('dtAjoutBefore').value){
            searchvalue.push( new CriteriaSearch(
                'dtAjout',
                this.form.value.dtAjoutBefore || undefined,
                '<='
            ));
        }
        if (this.form.get('dtAjoutAfter').value){
            searchvalue.push( new CriteriaSearch(
                'dtAjout',
                this.form.value.dtAjoutAfter || undefined,
                '>='
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
