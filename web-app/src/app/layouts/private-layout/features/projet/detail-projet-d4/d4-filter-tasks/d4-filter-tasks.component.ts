import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { COMMON_METADATA } from '@shared/constantes/CommonMetadata';
import { SelectMetadata } from '@shared/models';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { isEmptyValue } from '@app/shared/tools';

@Component({
  selector: 'app-d4-filter-tasks',
  templateUrl: './d4-filter-tasks.component.html',
  styleUrls: ['./d4-filter-tasks.component.css']
})
export class D4FilterTasksComponent implements OnInit {
  @Input() date: string;
  @Input() isolateViewerTasksLoading: boolean = false;

  @Output() actualVsPlannedEventFilter = new EventEmitter<any>();
  @Output() thisMonthVsLastMonthEventFilter = new EventEmitter<any>();
  // @Output() actualVsPlannedEventFilter = new EventEmitter<any>();
  @Output() resetEvent = new EventEmitter<any>();
  @Output() viewOptionEvent = new EventEmitter<any>();

  params: any = {};
  form: UntypedFormGroup;
  isEmptyValue = isEmptyValue;


  constructor(
    private formBuilder: UntypedFormBuilder
  ) {
    this.initParams();
  }

  ngOnInit(): void {
    this.form = this.initForm();
    this.onFormValueChange();
  }


  initParams() {
    this.params['filterViewerTypes'] = {
      metadata: <SelectMetadata>COMMON_METADATA.nmSelectMetadata({
        value: 'code',
        optionLabel: 'label',
        label: `View Option`,
        filter: false,
        reset: false,
      }),
      data: [
        {
          code: '001',
          label: 'Single Model'
        },
        {
          code: '002',
          label: '2 Viewers'
        },
        {
          code: '003',
          label: '4 Viewers'
        }
      ],
    };
    this.params['sourceDate'] = {
      metadata: <SelectMetadata>COMMON_METADATA.nmSelectMetadata({
        value: 'code',
        optionLabel: 'label',
        label: `View Option`,
        filter: false,
        reset: false,
      }),
      data: [
        {
          code: '001',
          label: 'Selected From Gantt'
        },
        // {
        //   code: '002',
        //   label: 'Selected with slider'
        // }
      ],
    };
  }

  private initForm() {
    return this.formBuilder.group({
      viewOption: this.formBuilder.control('001'),
      sourceData: this.formBuilder.control('001')
    });
  }

  private onFormValueChange() {
    this.getFormControl('viewOption').valueChanges.subscribe(value=>{
      this.viewOptionEvent.emit(value);
    })
  }

  getFormControl(key) {
    return this.form.get(key) as UntypedFormControl;
  }


}
