import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmDialogLogoutComponent} from './confirm-dialog-logout.component';

describe('ConfirmDialogLogoutComponent', () => {
    let component: ConfirmDialogLogoutComponent;
    let fixture: ComponentFixture<ConfirmDialogLogoutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConfirmDialogLogoutComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmDialogLogoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
