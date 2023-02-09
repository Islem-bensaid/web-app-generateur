import {NgModule} from '@angular/core';
import {AngularEditorComponent} from './angular-editor.component';
import {AngularEditorToolbarComponent} from './angular-editor-toolbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AeSelectComponent} from './ae-select/ae-select.component';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, MatInputModule, TranslateModule
    ],
    declarations: [AngularEditorComponent, AngularEditorToolbarComponent, AeSelectComponent],
    exports: [AngularEditorComponent, AngularEditorToolbarComponent, MatInputModule]
})
// @ts-ignore
export class AngularEditorModule {
}
