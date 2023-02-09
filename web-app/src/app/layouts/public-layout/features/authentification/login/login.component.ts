import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AppTranslateService, AuthentificationService, ToastService } from '@shared/services';
import { Router } from '@angular/router';
import { CONFIG } from '@shared/constantes/config';
import { valuesListByProperty } from '@shared/tools';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: UntypedFormGroup;
  // langs = ['ar', 'fr', 'en'].filter(l => (l != this.appTranslateService.getDefaultLang()));
  // langs = ['ar', 'en'].filter(l => (l != this.appTranslateService.getDefaultLang()));
  langs: string[];
  isLoginLoading = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    public appTranslateService: AppTranslateService,
    private toast: ToastService,
    private authentificationService : AuthentificationService,
    private router : Router,
  ) {
  }

  ngOnInit(): void {
    this._initLanguages();
    this.form = this.initAuthentificationForm();
  }

  private _initLanguages() {
    this.langs = valuesListByProperty(CONFIG.LANGUAGES, 'key').filter(l => (l != this.appTranslateService.getDefaultLang()))
  }

  initAuthentificationForm() {
    return this.formBuilder.group({
      login: this.formBuilder.control(null, [Validators.required]),
      password: this.formBuilder.control(null, [Validators.required])
    });
  }

  getFormControl(key): UntypedFormControl {
    return this.form.get(key) as UntypedFormControl;
  }

  useLanguage(lang) {
    location.reload();
    console.assert(valuesListByProperty(CONFIG.LANGUAGES, 'key').includes(lang), 'Language not declared in the configs')
    this.appTranslateService.setDefaultLang(lang);
    this.appTranslateService.useLanguage(lang);
  }

  authentificate() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.isLoginLoading = true;
      this.authentificationService.authenticate(this.form.value).subscribe(isLoggedIn=>{
        this.isLoginLoading = false;
        if (isLoggedIn) {
          this.router.navigate(['/app']);
        }
      });
    }
  }

}
