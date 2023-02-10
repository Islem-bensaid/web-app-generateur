import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild, ViewEncapsulation,
} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { Pagination } from '../../models';
import {pagination,paginationOptions} from '@shared/tools/utils'



@Component({
    selector: 'st2i-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.css'],
    encapsulation : ViewEncapsulation.None,
})
export class PaginatorComponent implements  OnChanges {
    @Output() paginate: EventEmitter<Pagination> = new EventEmitter<Pagination>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    @Input() pageIndex = 0;
    @Input() total: number;

    @Input() pageSize = pagination().itemsPerPage;
    pageSizeOptions =  paginationOptions(this.pageSize);

    constructor(
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        const {total, pageSize} = changes;
        if (
            total.currentValue !== total.previousValue && !total.isFirstChange() && this.paginator
        ) {
            this.paginator.length = this.total;
        }
        if ( pageSize?.currentValue !== pageSize?.previousValue) {
            this.pageSizeOptions =  paginationOptions(pageSize.currentValue);
        }
    }

    ngAfterViewInit(): void {
        this.paginator.length = this.total;
    }


    onPageChange(event: PageEvent) {
        const offSet = event.pageIndex;
        this.paginate.emit({limit: event.pageSize, offSet});
    }
}
