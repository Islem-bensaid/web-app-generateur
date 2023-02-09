import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'st2i-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
    @Input() isContentLayout = false;

    constructor(public route: Router) {
    }

    ngOnInit(): void {
    }

    includeDefaultChildRoute(route: any) {
        if (route.route.children) {
            for (const r of route.route.children) {
                if (r.path === '') {
                    return true;
                }
            }
        }
        return false;
    }

    print(parent: BreadcrumbComponent) {
        return;
    }
}
