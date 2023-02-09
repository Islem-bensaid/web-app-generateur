import {Component, HostListener, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, ActivationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {AppTranslateService} from '@shared/services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.css'],
})
export class AppComponent implements OnInit {

    // @HostListener('window:beforeunload', ['$event'])
    // beforeunloadHandler(event:any) {
    //     return false;
    // }

    constructor(
        public appTranslateService: AppTranslateService,
        private titleService: Title,
        private activatedRoute: ActivatedRoute,
        private translate: TranslateService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.appTranslateService.setDefaultLocale();
        this.appTranslateService.useLanguage();
        this.setupTitle();
        document.body.style.overflowX = 'hidden';
    }


    setupTitle() {
        this.router.events
            .pipe(filter((event) => event instanceof ActivationEnd))
            .pipe(
                filter((event: ActivationEnd) => event.snapshot.firstChild === null)
            )
            .pipe(map((event: ActivationEnd) => event.snapshot))
            .subscribe((activated) => {
                const title = activated.data.title;
                if (title) {
                    this.translate.get(title).subscribe((translation) => {
                        if (translation) {
                            this.titleService.setTitle(translation);
                        }
                    });
                }
            });
    }



}
