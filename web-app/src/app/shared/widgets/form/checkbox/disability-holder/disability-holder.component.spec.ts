import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DisabilityHolderComponent} from './disability-holder.component';

describe('DisabilityHolderComponent', () => {
    let component: DisabilityHolderComponent;
    let fixture: ComponentFixture<DisabilityHolderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DisabilityHolderComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DisabilityHolderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
