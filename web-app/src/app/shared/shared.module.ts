import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatListModule} from '@angular/material/list';
import {MatSelectFilterModule} from 'mat-select-filter';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatLineModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BreadcrumbModule} from 'angular-crumbs';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {
  AlertComponent,
  BreadcrumbComponent,
  CardComponent,
  ConfirmDialogComponent,
  ConfirmDialogLogoutComponent,
  CoverComponent, DialogComponent,
  DialogErrorComponent,
  EmptyListContainerComponent,
  FicheDetailsComponent,
  FileBlobDownloadComponent,
  FileInputComponent,
  FilterActionsComponent,
  FooterComponent,
  HeadingComponent,
  InnerhtmlComponent,
  ItemComponent,
  LabelComponent,
  MinisterLogoComponent,
  NavbarComponent,
  OutletComponent,
  PageNotFoundComponent,
  PaginatorComponent,
  RecaptchaComponent,
  RichTextEditorComponent,
  SelectAppLanguageComponent,
  SelectBooleanComponent,
  SelectCommonComponent,
  SelectDateComponent, SelectDateTimeComponent,
  SpinnerContainerComponent,
  TextAreaComponent,
  TextFieldComponent
} from './widgets';
import {AngularEditorModule} from './widgets/angular-rich-text-editor/lib/angular-editor/src/lib/angular-editor.module';
import {
    BlockDirective,
    CardDirective,
    ContainerDirective,
    DebounceClickDirective,
    EditableInputDirective,
    EnableOnlyArabicDirective,
    JpDraggableDialogDirective,
    MatCheckBoxDirective,
    NumberDirective,
    NumbersOnlyInputDirective,
    OnlyNumber,
    ScreenDirective,
    YearFormatDirective
} from './directives';
import {
    DateFormatheurePipe,
    DateFormatPipe,
    MontantPipe,
    OrderTranslatePipe,
    SafehtmlPipe,
    TypedValuePipe
} from './pipes';
import {ControlErrorDirective} from './directives/control-error.directive';
import {DisabilityHolderComponent} from './widgets/form/checkbox/disability-holder/disability-holder.component';
import {CardTitleComponent} from './widgets/card/card-title/card-title.component';
import {WsFactory} from '@shared/tools/utils/ws-factory';
import {
    PrivateLayoutNavbarComponent
} from './widgets/layout/navbars/private-layout-navbar/private-layout-navbar.component';
import {UserMenuComponent} from '@shared/widgets/layout/navbars/user-menu/user-menu.component';
import {PrivateLayoutSidebarComponent} from './widgets/layout/private-layout-sidebar/private-layout-sidebar.component';
import {
    PrivateLayoutFooterComponent
} from './widgets/layout/footers/private-layout-footer/private-layout-footer.component';
import {DatatableExportComponent} from '@shared/widgets';
import {ButtonLoadingComponent} from "@shared/widgets/buttons/button-loading/button-loading.component";
import { DatatableComponent } from '@shared/widgets';
import {MatSortModule} from "@angular/material/sort";
import { AjoutDocDialogComponent } from '@shared/widgets';
import { DeailsDocDialogComponent } from '@shared/widgets';
import { DialogGalleryMediaComponent } from '@shared/widgets';
import { InnerGalleryMediaComponent } from '@shared/widgets';
import { ChartsComponent } from '@shared/widgets';
import {
  AreaChartModule,
  BarChartModule, BoxChartModule,
  BubbleChartModule, ChartCommonModule, GaugeModule,
  HeatMapModule,
  LineChartModule, NumberCardModule,
  PieChartModule,
  PolarChartModule, TreeMapModule
} from '@swimlane/ngx-charts';
import { ComboChartComponent, ComboSeriesVerticalComponent } from '@shared/widgets/charts/custom-charts/combo-chart';
import { SliderModule } from '@swimlane/ngx-ui';
import {
  TimelineFilterBarChartComponent
} from '@shared/widgets/charts/custom-charts/timeline-filter-bar-chart/timeline-filter-bar-chart.component';
import { SparklineComponent } from '@shared/widgets/charts/custom-charts/sparkline/sparkline.component';
import { SpinnerComponent } from './widgets/spinner/spinner.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { FilterComponent } from './widgets/filter/filter.component';

const pipes = [
    DateFormatheurePipe,
    DateFormatPipe,
    MontantPipe,
    OrderTranslatePipe,
    SafehtmlPipe,
    TypedValuePipe
]

@NgModule({
  declarations: [
    FicheDetailsComponent,
    CoverComponent,
    SpinnerContainerComponent,
    PaginatorComponent,
    FilterActionsComponent,
    RecaptchaComponent,
    EmptyListContainerComponent,
    OutletComponent,
    LabelComponent,
    CardComponent,
    CardTitleComponent,
    BreadcrumbComponent,
    DisabilityHolderComponent,
    MinisterLogoComponent,
    NavbarComponent,
    ItemComponent,
    ButtonLoadingComponent,
    SelectDateComponent,
    TextFieldComponent,
    FooterComponent,
    SelectAppLanguageComponent,
    UserMenuComponent,
    SelectBooleanComponent,
    FileInputComponent,
    FileBlobDownloadComponent,
    HeadingComponent,
    AlertComponent,
    SelectCommonComponent,
    SelectCommonComponent,
    InnerhtmlComponent,
    FicheDetailsComponent,
    TextAreaComponent,
    RichTextEditorComponent,
    PageNotFoundComponent,
    ConfirmDialogComponent,
    DialogErrorComponent,
    ConfirmDialogLogoutComponent,
    BlockDirective,
    CardDirective,
    ContainerDirective,
    ControlErrorDirective,
    EditableInputDirective,
    YearFormatDirective,
    DebounceClickDirective,
    ScreenDirective,
    MatCheckBoxDirective,
    OnlyNumber,
    EnableOnlyArabicDirective,
    NumbersOnlyInputDirective,
    JpDraggableDialogDirective,
    NumberDirective,
    PrivateLayoutNavbarComponent,
    PrivateLayoutSidebarComponent,
    PrivateLayoutFooterComponent,
    DatatableExportComponent,
    ...pipes,
    DatatableComponent,
    SelectDateTimeComponent,
    AjoutDocDialogComponent,
    DialogComponent,
    DeailsDocDialogComponent,
    DialogGalleryMediaComponent,
    InnerGalleryMediaComponent,
    ChartsComponent,
    ComboChartComponent,
    ComboSeriesVerticalComponent,
    TimelineFilterBarChartComponent,
    SparklineComponent,
    SpinnerComponent,
    FilterComponent
  ],
  exports: [
    FicheDetailsComponent,
    CoverComponent,
    SpinnerContainerComponent,
    PaginatorComponent,
    FilterActionsComponent,
    RecaptchaComponent,
    EmptyListContainerComponent,
    OutletComponent,
    LabelComponent,
    CardComponent,
    CardTitleComponent,
    BreadcrumbComponent,
    DisabilityHolderComponent,
    MinisterLogoComponent,
    NavbarComponent,
    ItemComponent,
    ButtonLoadingComponent,
    SelectDateComponent,
    TextFieldComponent,
    FooterComponent,
    SelectAppLanguageComponent,
    UserMenuComponent,
    SelectBooleanComponent,
    FileInputComponent,
    FileBlobDownloadComponent,
    HeadingComponent,
    AlertComponent,
    SelectCommonComponent,
    SelectCommonComponent,
    InnerhtmlComponent,
    FicheDetailsComponent,
    TextAreaComponent,
    RichTextEditorComponent,
    PageNotFoundComponent,
    ConfirmDialogComponent,
    DialogErrorComponent,
    ConfirmDialogLogoutComponent,
    BlockDirective,
    CardDirective,
    ContainerDirective,
    ControlErrorDirective,
    EditableInputDirective,
    YearFormatDirective,
    DebounceClickDirective,
    ScreenDirective,
    MatCheckBoxDirective,
    OnlyNumber,
    EnableOnlyArabicDirective,
    NumbersOnlyInputDirective,
    JpDraggableDialogDirective,
    NumberDirective,
    MatSidenavModule,
    MatMenuModule,
    MatAutocompleteModule,
    AngularEditorModule,
    AngularEditorModule,
    MatSelectModule,
    MatSelectModule,
    AngularEditorModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatListModule,
    MatSelectModule,
    MatSelectFilterModule,
    AngularEditorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatListModule,
    MatLineModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatTooltipModule,
    MatButtonModule,
    MatTableModule,
    FlexLayoutModule,
    FlexModule,
    MatCheckboxModule,
    MatSnackBarModule,
    TranslateModule,
    MatToolbarModule,
    BreadcrumbModule,
    MatIconModule,
    RouterModule,
    MatFormFieldModule,
    MatCardModule,
    CommonModule,
    PrivateLayoutNavbarComponent,
    PrivateLayoutSidebarComponent,
    PrivateLayoutFooterComponent,
    ...pipes,
    DatatableComponent,
    SelectDateTimeComponent,
    DialogComponent,
    InnerGalleryMediaComponent,
    ChartsComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatMenuModule,
    MatAutocompleteModule,
    AngularEditorModule,
    AngularEditorModule,
    MatSelectModule,
    MatSelectModule,
    AngularEditorModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatListModule,
    MatSelectModule,
    MatSelectFilterModule,
    AngularEditorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatListModule,
    MatLineModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatTooltipModule,
    MatButtonModule,
    MatTableModule,
    FlexLayoutModule,
    FlexModule,
    MatCheckboxModule,
    MatSnackBarModule,
    TranslateModule,
    MatToolbarModule,
    BreadcrumbModule,
    MatIconModule,
    RouterModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSortModule,
    BarChartModule,
    PieChartModule,
    PolarChartModule,
    LineChartModule,
    HeatMapModule,
    BubbleChartModule,
    GaugeModule,
    NumberCardModule,
    TreeMapModule,
    AreaChartModule,
    BoxChartModule,
    SliderModule,
    ChartCommonModule,
    NgxGaugeModule
    // NgxMatDatetimePickerModule
  ],
    providers: [WsFactory, ...pipes]
})
export class SharedModule {
}
