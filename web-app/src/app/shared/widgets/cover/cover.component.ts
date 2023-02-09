import {Component, Input, OnInit} from '@angular/core';

const defaultAvatar = 'https://images.unsplash.com/photo-1559718062-361155fad299?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';
const defaultCover = `https://images.unsplash.com/photo-1510531704581-5b2870972060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80`;

@Component({
    selector: 'st2i-cover',
    templateUrl: './cover.component.html',
    styleUrls: ['./cover.component.css'],
})
export class CoverComponent implements OnInit {
  @Input() avatar = defaultAvatar;
    @Input() cover = defaultCover;
    @Input() lastName?: string;
    @Input() firstName?: string;

    constructor() {
    }

    ngOnInit(): void {
    }
}
