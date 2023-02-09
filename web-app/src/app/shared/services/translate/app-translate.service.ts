import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';
import {DateAdapter} from '@angular/material/core';
import { CONFIG } from '@shared/constantes/config';
import assert from 'assert';
import { valuesListByProperty } from '@shared/tools';

@Injectable({
    providedIn: 'root',
})
export class AppTranslateService {
    private key = 'LANG';
    private language?: string;

    constructor(
        private translate: TranslateService,
        private dateAdapter: DateAdapter<any>,
    ) {
        this.getDefaultLang();
    }

    get currentLanguage() {
        return this.translate.currentLang;
    }

    setDefaultLocale() {
        this.translate.use(CONFIG.DEFAULT_LOCALE);
        moment.locale(CONFIG.DEFAULT_LOCALE);
        this.dateAdapter.setLocale(CONFIG.DEFAULT_LOCALE);
    }
    setDefaultLang(lang: string) {
        window.localStorage.setItem(this.key, lang);
    }

    getDefaultLang() {
        return window.localStorage.getItem(this.key) || CONFIG.DEFAULT_LANG;
    }

    useLanguage(language?) {
        const lang = language || this.getDefaultLang();
        console.assert(valuesListByProperty(CONFIG.LANGUAGES, 'key').includes(lang), 'Language not declared in the configs')
        this.language = lang;
        moment.locale(lang === 'ar' ? 'ar-tn' : lang);
        this.dateAdapter.setLocale(lang === 'ar' ? 'ar-tn' : lang);
        this.translate.use(lang);
        this.setDirection();
        this.setDefaultLang(lang);
    }

    getDir(): 'rtl' | 'ltr' {
        return this.language === 'ar' ? 'rtl' : 'ltr';
    }

    private setDirection() {
        document.querySelector('html').setAttribute('dir', this.getDir());
    }
}
