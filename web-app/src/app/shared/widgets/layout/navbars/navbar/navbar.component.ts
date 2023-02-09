import {Component, Input, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import { defaultAvatar } from '@shared/constantes';
import { AppTranslateService, DatenowService } from '@shared/services';
import { Menu } from '@shared/models/Menu';


@Component({
    selector: 'st2i-navbars',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    myDate = new Date();
    @Input() links: Menu[];
    @Input() shortMenus: { icon: string; label: string }[] = [];
    @Input() menuTitle = '';
    @Input() menuSubtitle = '';

    constructor(private toastr: ToastrService,
                private appTranslateService: AppTranslateService,
                private router: Router
    ) {
    }

    utcTime(): void {
        setInterval(() => {
            //replaced function() by ()=>
            this.myDate = new Date();
        }, 1000);

        // setInterval(() => {
        //     this.datenowService.getCurrentDate().subscribe(da=>{

        //         this.myDate = da;
        //     })
        // }, 1000);
    }

    ngOnInit(): void {
        this.whoami();

        this.utcTime();
    }

    Accueil = 'Accueil';

    style() {
        return {
            'background-image': `url(${defaultAvatar})`,
        };
    }

    getMargin() {
        const name =
            this.appTranslateService.currentLanguage === 'fr'
                ? 'margin-left'
                : 'margin-right';
        return {
            [name]: '30px',
        };
    }

    logout() {
    }

    hasSubMenu(link: Menu) {
        return Array.isArray(link.submenus);
    }

    whoami() {
    }

    getdir() {
        return this.appTranslateService.getDir();
    }

    login() {
        this.router.navigate(['layouts/content-layout/']);
    }
}

export interface Message {
    message: string;
    fromId: string;
    toId: string;
}
