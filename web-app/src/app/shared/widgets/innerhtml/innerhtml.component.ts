import {Component, Input, OnInit} from '@angular/core';
import {AppTranslateService} from '../../services/translate/app-translate.service';

@Component({
  selector: 'st2i-innerhtml',
  templateUrl: './innerhtml.component.html',
  styleUrls: ['./innerhtml.component.css'],
})
export class InnerhtmlComponent implements OnInit {
  constructor(
    // private codeUtuli: ConditionUtilisationService,
    private apptransalte: AppTranslateService
  ) {
  }

  @Input() ishtml = true;
  somehtml: any;
  accept: 'true' | 'false' = 'false';
  @Input()
  code: any;
  @Input() contenu: any;

  ngOnInit(): void {
    this.fetch();
  }

  getlang() {
    return this.apptransalte.getDefaultLang() === 'ar';
  }

  fetch() {
    // this.codeUtuli.getHtml(this.code).subscribe((res) => {
    //   this.somehtml = res;
    // });
  }
}
