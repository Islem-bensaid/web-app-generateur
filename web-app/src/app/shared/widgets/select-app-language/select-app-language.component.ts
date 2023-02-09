import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { AppTranslateService } from '../../services';
import { CONFIG } from '@shared/constantes/config';

@Component({
    selector: 'st2i-select-app-language',
    templateUrl: './select-app-language.component.html',
    styleUrls: ['./select-app-language.component.css'],
})
export class SelectAppLanguageComponent implements OnInit {
    options = CONFIG.LANGUAGES;

    constructor(
        public translate: TranslateService,
        private service: AppTranslateService
    ) {
    }

    get current() {
        const lang = this.translate.currentLang;
        return this.options.find((option) => option.key === lang);
    }

    filter(itemList: any[]): any[] {
        let result: any[] = [];

        //your filter logic here

        return itemList.find(x => x != this.current);
    }

    ngOnInit(): void {
    }

    useLanguage(lang: 'fr' | 'ar' | 'en') {
        this.service.setDefaultLang(lang);
        this.service.useLanguage(lang);
        location.reload();
        // location.reload();
    }
}
